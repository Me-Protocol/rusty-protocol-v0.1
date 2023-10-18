use crate::providers::common::constants::PRECISION;
pub use crate::{
    providers::{
        data::{ a_pool::*, a_position::* },
        common::{context::*},
        deployables::a_pool,
        common::{ roles::*, errors::ProtocolError, eunice::*, validator::* },
    },
    controllers::deployables::a_pool::*,
};

use ink::{ prelude::vec::Vec, primitives::AccountId };
use openbrush::{
    modifier_definition,
    contracts::{
        access_control::*,
        psp34::extensions::enumerable::*,
        traits::psp22::PSP22Ref,
        reentrancy_guard::*,
    },
    modifiers,
    traits::{ Balance, Storage },
};

// impl<
//     T:  Storage<PoolState> +
//         Storage<PoolConfig> +
//         Storage<access_control::Data> +
//         Storage<psp34::Data<>> +
//         Storage<Position> +
//         Storage<reentrancy_guard::Data> +
//         Internal +
//         psp34::Internal +
//         PSP34EnumerableImpl +
//         BalancesManagerImpl +
//         MembersManager +
//         AccessControlImpl
// > PoolController  for T {

    pub trait PoolImpl:  Storage<PoolState> +
    Storage<PoolConfig> +
    Storage<Position> +
    Storage<reentrancy_guard::Data> +
    Storage<psp34::Data<>> +
    Internal +
    PSP34Impl +
    psp34::Internal +
    PSP34EnumerableImpl +
    BalancesManagerImpl +
    MembersManager +
    AccessControlImpl {

    #[modifiers(when_not_active)]
    #[modifiers(only_role(OPEN_REWARDS_MANAGER))]
     fn start_open_rewards(
        &mut self
    ) -> Result<u128, ProtocolError> {

        if self.data::<PoolState>().started {
            return Err(ProtocolError::ConversationsAlreadyStarted);
        }
        
        let pool = Self::env().account_id();
        let state = *self.data::<PoolState>();
        let config = *self.data::<PoolConfig>();
        if  config.r_optimal == 0 {
            return Err(ProtocolError::OptimalRewardRatioCanNotBeZero);
        }
        if config.maximum_r_limit < config.r_optimal {
            return Err(ProtocolError::MaximumRewardRatioCanNotBeLessThanTheOptimalRatio);
        }
        let (current_reward_amount, current_me_amount) = objectively_obtain_pool_balances(
            pool,
            state.reward,
            state.me_token
        );
        if
            _calculate_pool_ratio(current_reward_amount, current_me_amount).unwrap() >
            config.r_optimal
        {
            return Err(ProtocolError::ConversationsShouldBeStartedAtOptimalRatioOrLess);
        }
       
        self.data::<PoolState>().started = true;
        self.data::<PoolState>().active = true;

        Ok(config.r_optimal)
    }

    #[modifiers(when_active)]
    #[modifiers(only_role(OPEN_REWARDS_MANAGER))]
      fn pause_open_rewards( &mut self) -> Result<bool, ProtocolError> {
        self.data::<PoolState>().active = false;
        Ok(true)
    }

    #[modifiers(when_not_active)]
    #[modifiers(only_role(OPEN_REWARDS_MANAGER))]
      fn resume_open_rewards( &mut self) -> Result<bool, ProtocolError> {
        if !self.data::<PoolState>().started  {
            return Err(ProtocolError::OpenRewardsNotStarted);
        }
        
        self.data::<PoolState>().active = true;
        Ok(true)
    }

      fn check_open_rewards_state(&self) -> bool{
        self.data::<PoolState>().active
    }

  
          fn get_balance(&self, token:AccountId, account: AccountId) -> Balance {
            let token_balance:Balance = PSP22Ref::balance_of(&token, account);
            token_balance
        }

    #[modifiers(only_role(PROTOCOL))]
    #[modifiers(non_reentrant)]
      fn add_protocol_me_offset(
        &mut self,
        expected_me_offset: Balance
    ) -> Result<Balance, ProtocolError> {
        let pool = Self::env().account_id();
        let state = *self.data::<PoolState>();
        let current_me_amount = objectively_obtain_single_balance(pool, state.me_token);
        let actual_me_offset = current_me_amount - state.last_me_amount;
        if actual_me_offset < expected_me_offset {
            if
                !check_if_within_acceptable_percent_range(
                    expected_me_offset,
                    actual_me_offset
                ).unwrap()
            {
                return Err(ProtocolError::ExpectedProtocolMeOffsetExceedsActualMeOffset);
            }
        }
        let (current_reward_amount, current_me_amount) = objectively_obtain_pool_balances(
            pool,
            state.reward,
            state.me_token
        );
        update_pool_state(
            self,
            current_reward_amount,
            current_me_amount,
            Self::env().block_timestamp()
        )?;
        self.data::<PoolState>().protocol_me_offset = actual_me_offset + state.protocol_me_offset;
        Ok(actual_me_offset)
    }

    #[modifiers(only_role(PROTOCOL))]
    #[modifiers(non_reentrant)]
      fn withdraw_protocol_me_offset_only_me_tokens(
        &mut self,
        me_amount_to_withdraw: Balance
    ) -> Result<Balance, ProtocolError> {
        let pool = Self::env().account_id();
        let protocol = Self::env().caller();
        let state = *self.data::<PoolState>();
        let config = *self.data::<PoolConfig>();
        let current_me_offset = state.protocol_me_offset;
        if me_amount_to_withdraw > current_me_offset {
            return Err(ProtocolError::ExpectedProtocolMeOffsetExceedsActualMeOffset);
        }
        let current_me_amount = objectively_obtain_single_balance(pool, state.me_token);
        if current_me_amount < config.minimum_me_amount_for_conversation {
            return Err(ProtocolError::PoolIsCurrentlyBelowConversationLimit);
        }
        if
            current_me_amount < me_amount_to_withdraw ||
            current_me_amount - me_amount_to_withdraw < config.minimum_me_amount_for_conversation
        {
            return Err(ProtocolError::ActionWillTakePoolMeTokensBelowConversationLimit);
        }
        self.data::<PoolState>().protocol_me_offset =
            state.protocol_me_offset - me_amount_to_withdraw;
        PSP22Ref::transfer(&state.me_token, protocol, me_amount_to_withdraw, Vec::<u8>::new())?;
        let (current_reward_amount, current_me_amount) = objectively_obtain_pool_balances(
            pool,
            state.reward,
            state.me_token
        );
        update_pool_state(
            self,
            current_reward_amount,
            current_me_amount,
            Self::env().block_timestamp()
        )?;
        Ok(me_amount_to_withdraw)
    }

    #[modifiers(only_role(PROTOCOL))]
    #[modifiers(non_reentrant)]
      fn withdraw_protocol_me_offset_withdrawable(
        &mut self,
        me_amount_to_withdraw: Balance
    ) -> Result<bool, ProtocolError> {
        let pool = Self::env().account_id();
        let protocol = Self::env().caller();
        let state = *self.data::<PoolState>();
        let config = *self.data::<PoolConfig>();
        let withdrawable_amount: Balance;
        let current_me_offset = state.protocol_me_offset;
        if me_amount_to_withdraw > current_me_offset {
            return Err(ProtocolError::ExpectedProtocolMeOffsetExceedsActualMeOffset);
        }
        let current_me_amount = objectively_obtain_single_balance(pool, state.me_token);
        if current_me_amount < config.minimum_me_amount_for_conversation {
            return Err(ProtocolError::PoolIsCurrentlyBelowConversationLimit);
        }
        if
            current_me_amount <= me_amount_to_withdraw ||
            current_me_amount - me_amount_to_withdraw < config.minimum_me_amount_for_conversation
        {
            withdrawable_amount = current_me_amount - config.minimum_me_amount_for_conversation;
        } else {
            withdrawable_amount = me_amount_to_withdraw;
        }
        self.data::<PoolState>().protocol_me_offset =
            state.protocol_me_offset - withdrawable_amount;
        PSP22Ref::transfer(&state.me_token, protocol, withdrawable_amount, Vec::<u8>::new())?;
        let (current_reward_amount, current_me_amount) = objectively_obtain_pool_balances(
            pool,
            state.reward,
            state.me_token
        );
        update_pool_state(
            self,
            current_reward_amount,
            current_me_amount,
            Self::env().block_timestamp()
        )?;
        Ok(true)
    }

    #[modifiers(only_role(PROTOCOL))]
    #[modifiers(non_reentrant)]
      fn withdraw_protocol_me_offset_with_rewards_if_need_be(
        &mut self,
        me_amount_to_withdraw: Balance
    ) -> Result<(Balance, Balance), ProtocolError> {
        let pool = Self::env().account_id();
        let protocol = Self::env().caller();
        let state = *self.data::<PoolState>();
        let config = *self.data::<PoolConfig>();
        let mut withdrawable_me_amount: Balance = 0;
        let mut withdrawable_reward_amount: Balance = 0;
        let current_me_offset = state.protocol_me_offset;
        if me_amount_to_withdraw > current_me_offset {
            return Err(ProtocolError::ExpectedProtocolMeOffsetExceedsActualMeOffset);
        }
        let (current_reward_amount, current_me_amount) = objectively_obtain_pool_balances(
            pool,
            state.reward,
            state.me_token
        );
        if current_me_amount < config.minimum_me_amount_for_conversation {
            return Err(ProtocolError::PoolIsCurrentlyBelowConversationLimit);
        }
        if
            current_me_amount <= me_amount_to_withdraw ||
            current_me_amount - me_amount_to_withdraw < config.minimum_me_amount_for_conversation
        {
            withdrawable_me_amount = current_me_amount - config.minimum_me_amount_for_conversation;
            let reward_amount = determine_optimal_reward_amount_for_swap_given_me_amount(
                config.r_optimal,
                me_amount_to_withdraw - withdrawable_me_amount
            );
            if current_reward_amount > config.minimum_reward_amount_for_conversation {
                if current_reward_amount <= reward_amount {
                    withdrawable_reward_amount =
                        current_reward_amount - config.minimum_reward_amount_for_conversation;
                } else {
                    withdrawable_reward_amount = reward_amount;
                }
            }
        } else {
            withdrawable_me_amount = me_amount_to_withdraw;
            withdrawable_reward_amount = 0;
        }
        self.data::<PoolState>().protocol_me_offset =
            state.protocol_me_offset - withdrawable_me_amount;
        if withdrawable_me_amount != 0 {
            PSP22Ref::transfer(
                &state.me_token,
                protocol,
                withdrawable_me_amount,
                Vec::<u8>::new()
            )?;
        }
        if withdrawable_reward_amount != 0 {
            PSP22Ref::transfer(
                &state.reward,
                protocol,
                withdrawable_reward_amount,
                Vec::<u8>::new()
            )?;
        }
        let (current_reward_amount, current_me_amount) = objectively_obtain_pool_balances(
            pool,
            state.reward,
            state.me_token
        );
        update_pool_state(
            self,
            current_reward_amount,
            current_me_amount,
            Self::env().block_timestamp()
        )?;
        Ok((withdrawable_reward_amount, withdrawable_me_amount))
    }

    #[modifiers(only_role(PROTOCOL))]
    #[modifiers(non_reentrant)]
      fn forcefully_withdraw_protocol_offset_me_tokens(
        &mut self,
        me_amount_to_withdraw: Balance
    ) -> Result<Balance, ProtocolError> {
        let pool = Self::env().account_id();
        let protocol = Self::env().caller();
        let state = *self.data::<PoolState>();
        let withdrawable_me_amount: Balance;
        let current_me_offset = state.protocol_me_offset;
        if me_amount_to_withdraw > current_me_offset {
            return Err(ProtocolError::ExpectedProtocolMeOffsetExceedsActualMeOffset);
        }
        let current_me_amount = objectively_obtain_single_balance(pool, state.me_token);
        if me_amount_to_withdraw > current_me_amount {
            withdrawable_me_amount = current_me_amount;
        } else {
            withdrawable_me_amount = me_amount_to_withdraw;
        }
        if withdrawable_me_amount != 0 {
            PSP22Ref::transfer(
                &state.me_token,
                protocol,
                withdrawable_me_amount,
                Vec::<u8>::new()
            )?;
        }
        let (current_reward_amount, current_me_amount) = objectively_obtain_pool_balances(
            pool,
            state.reward,
            state.me_token
        );
        update_pool_state(
            self,
            current_reward_amount,
            current_me_amount,
            Self::env().block_timestamp()
        )?;
        Ok(withdrawable_me_amount)
    }


    #[modifiers(only_role(OPEN_REWARDS_MANAGER))]
    #[modifiers(non_reentrant)]
      fn record_liquidity_provided(
        &mut self,
        pool_numerator_amount: Balance,
        pool_divisor_amount: Balance,
        requestor: AccountId,
        to: AccountId
    ) -> Result<(), ProtocolError> {
    
        ensure_address_is_not_zero_address(to)?;
        ensure_address_is_not_zero_address(requestor)?;

        let pool = Self::env().account_id();
        let state = *self.data::<PoolState>();
    
        let (current_reward_amount, current_me_amount, added_reward_amount, added_me_amount) =
            validate_give_pool_tokens_request(
                state.reward,
                state.me_token,
                pool,
                pool_numerator_amount,
                pool_divisor_amount,
                state.last_reward_amount,
                state.last_me_amount
            ).unwrap();

        update_pool_state(
            self,
            current_reward_amount,
            current_me_amount,
            Self::env().block_timestamp()
        )?;

        let positions: Vec<Id> =  self.get_all_positions(requestor). unwrap_or_default();
       
        let position:Id;

    
        if positions.len() == 0{
            self.data::<Position>().next_position_id += 1;
            let id = self.data::<Position>().next_position_id;
            if added_me_amount != 0 || added_reward_amount != 0 {
                self.data::<Position>().position_metadata.insert(
                    &Id::U128(id),
                    &(PositionMetadata {
                        reward_position: added_reward_amount,
                        me_token_position: added_me_amount,
                    })
                );
            }
            //Todo self.data::<psp34::Data>()._mint_to(to, Id::U128(id))?;
            psp34::Internal::_mint_to(self, to, Id::U128(id))?;
        }
        else{
            position = positions[0].clone();
            psp34::Internal::_check_token_exists(self, &position)?;
            // Todo self
            // .data::<psp34::Data>()
            // ._check_token_exists(&position)?;
        if
        requestor != 
            psp34::Internal
            ::_owner_of(self, &position).unwrap()
            //Todo requestor !=
            // self
            //     .data::<psp34::Data>()
            //     ._owner_of(&position)
            //     .unwrap()
        {
            return Err(ProtocolError::RequestorIsNotOwnerOfThePosition);
        }
        if added_me_amount != 0 || added_reward_amount != 0 {
            let current_position_data = self
                .data::<Position>()
                .position_metadata.get(&position)
                . unwrap_or_default();
            self.data::<Position>().position_metadata.insert(
                &position,
                &(PositionMetadata {
                    reward_position: added_reward_amount + current_position_data.reward_position,
                    me_token_position: added_me_amount + current_position_data.me_token_position,
                })
            );
        }
        }
        
        Ok(())
    }
   

    #[modifiers(only_role(OPEN_REWARDS_MANAGER))]
    #[modifiers(non_reentrant)]
      fn withdraw_liquidity(
        &mut self,
        position_id: Id,
        reward_pool_token_amount: Balance,
        me_pool_token_amount: Balance,
        requestor: AccountId,
        to: AccountId
    ) -> Result<(), ProtocolError> {
        ink::env::debug_println!("in");
        ensure_address_is_not_zero_address(to)?;
        ensure_address_is_not_zero_address(requestor)?;
     
        if reward_pool_token_amount == 0 && me_pool_token_amount == 0 {
            return Err(ProtocolError::CanNotWithdrawZeroAssetsFromThePool);
        }
     
        
        let position:Id;
        if position_id == Id::U128(0) {

            ink::env::debug_println!("found position {}",0);

            let positions: Vec<Id> =  self.get_all_positions(requestor). unwrap_or_default();
       
            if positions.len() == 0{
                return Err(ProtocolError::RequestorHasNotLiquidityInPool);
            }
            else{
                position = positions[0].clone();
            }
        }
        else{
            position = position_id
        }

        ink::env::debug_println!("finished dealing with position");


        ink::env::debug_println!("checking token");
        psp34::Internal::_check_token_exists(self, &Id::U128(1))?;
        // self
        //     .data::<psp34::Data>()
        //     ._check_token_exists(&Id::U128(1))?;

            ink::env::debug_println!("token exists");
        if
            requestor != 
                psp34::Internal
                ::_owner_of(self, &position)
                .unwrap()
            // requestor !=
            // self
            //     .data::<psp34::Data>()
            //     ._owner_of(&position)
            //     .unwrap()
        {
            return Err(ProtocolError::RequestorIsNotOwnerOfThePosition);
        }

        ink::env::debug_println!("owner correct");
        let current_position_data = self
            .data::<Position>()
            .position_metadata.get(&position)
            . unwrap_or_default ();
        if
            reward_pool_token_amount > current_position_data.reward_position ||
            me_pool_token_amount > current_position_data.me_token_position
        {
            return Err(ProtocolError::InsufficientPositionBalance);
        }
        ink::env::debug_println!("sufficient balance");
        let pool = Self::env().account_id();
        let state = *self.data::<PoolState>();
        let config = *self.data::<PoolConfig>();

        ink::env::debug_println!("making update");
        self.data::<Position>().position_metadata.insert(
            &position,
            &(PositionMetadata {
                reward_position: current_position_data.reward_position - reward_pool_token_amount,
                me_token_position: current_position_data.me_token_position - me_pool_token_amount,
            })
        );

        ink::env::debug_println!("obtaining amount to withdraw");
        let (reward_amount_to_withdraw, me_amount_to_withdraw) =
            obtain_amount_of_pool_reward_to_withdraw(
                reward_pool_token_amount,
                me_pool_token_amount,
                state.last_reward_amount,
                state.last_me_amount,
                config.minimum_reward_amount_for_conversation,
                config.minimum_me_amount_for_conversation,
                state.protocol_me_offset,
                config.r_optimal
            ).unwrap();

        ink::env::debug_println!("transferring tokens");
        if reward_amount_to_withdraw != 0 {
            PSP22Ref::transfer(&state.reward, to, reward_amount_to_withdraw, Vec::<u8>::new())?;
        }
        if me_amount_to_withdraw != 0 {
            PSP22Ref::transfer(&state.me_token, to, me_amount_to_withdraw, Vec::<u8>::new())?;
        }
        let (current_reward_amount, current_me_amount) = objectively_obtain_pool_balances(
            pool,
            state.reward,
            state.me_token
        );
        update_pool_state(
            self,
            current_reward_amount,
            current_me_amount,
            Self::env().block_timestamp()
        )?;
        Ok(())
    }

    #[modifiers(only_role(OPEN_REWARDS_ADMIN))]
      fn add_open_rewards_manager(&mut self, new_pool_manager: AccountId) -> Result<(), ProtocolError> {
        ensure_address_is_not_zero_address(new_pool_manager)?;

        if MembersManager::_has_role(self, OPEN_REWARDS_MANAGER, &Some(new_pool_manager)) {
        // Todo if self.data::<access_control::Data>().has_role(OPEN_REWARDS_MANAGER, new_pool_manager) {
            return Err(ProtocolError::AccountAlreadyPoolManager);
        }
        AccessControlImpl::grant_role(self, OPEN_REWARDS_MANAGER, Some(new_pool_manager))?;
        //Todo self.data::<access_control::Data>().grant_role(OPEN_REWARDS_MANAGER, new_pool_manager)?;
        Ok(())
    }

    #[modifiers(only_role(OPEN_REWARDS_ADMIN))]
       fn remove_open_rewards_manager(&mut self, pool_manager: AccountId) -> Result<(), ProtocolError> {
        ensure_address_is_not_zero_address(pool_manager)?;
        if AccessControlImpl::has_role(self,OPEN_REWARDS_MANAGER, Some(pool_manager)){
        //Todo if !self.data::<access_control::Data>().has_role(OPEN_REWARDS_MANAGER, pool_manager) {
            return Err(ProtocolError::AccountIsNotAPoolManager);
        }
        AccessControlImpl::revoke_role(self,OPEN_REWARDS_MANAGER, Some(pool_manager))?;
        //Todo self.data::<access_control::Data>().revoke_role(OPEN_REWARDS_MANAGER, pool_manager)?;
        Ok(())
    }

       fn check_if_is_open_rewards_manager(&self, pool_manager: AccountId) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(pool_manager)?;
        let is_manager = MembersManager::_has_role(self, OPEN_REWARDS_MANAGER,&Some(pool_manager));
        //Todo let is_manager = self.data::<access_control::Data>().has_role(OPEN_REWARDS_MANAGER,pool_manager);
        Ok(is_manager)
    }

        fn get_liquidity_ratios(&self) -> (u128, u128) {
        let state = *self.data::<PoolState>();
        let config = *self.data::<PoolConfig>();
        (
            config.r_optimal,
            _calculate_pool_ratio(state.last_reward_amount, state.last_me_amount).unwrap(),
        )
    }

    fn get_liquidity_ids(&self) -> (AccountId, AccountId, AccountId) {
        let state = *self.data::<PoolState>();
        (state.initiator, state.reward, state.me_token)
    }

     fn get_open_rewards_state(
        &self
    ) -> (bool, bool, bool, AccountId, AccountId, AccountId, Balance,Balance, Balance, u64) {
        let state = *self.data::<PoolState>();

        (
            state.started,
            state.active,
            state.busy,
            state.initiator,
            state.reward,
            state.me_token,
            state.last_reward_amount,
            state.last_me_amount,
            state.protocol_me_offset,
            state.last_transaction_time,
        )
    }


     fn get_open_rewards_configurations(&self) -> (u128, u128, Balance, Balance, Balance, Balance, u128, bool) {
        let config = *self.data::<PoolConfig>();

        (
            config.r_optimal,
            config.maximum_r_limit,
            config.minimum_reward_amount_for_conversation,
            config.minimum_me_amount_for_conversation,
            config.notify_reward_amount,
            config.notify_me_amount,
            config. default_slippage_in_precision,
            config.allow_internal_swap,
        )
    }

    #[modifiers(when_active)]
     fn initiate_outgoing_conversation(
        &mut self,
        reward_amount_in: Balance,
        expected_output_reward_amount: Balance,
        listener: AccountId,
        listener_r_optimal: u128,
        requestor: AccountId,
        output_reward_receiver: AccountId,
        slippage_in_precision: u128
    ) -> Result<Balance, ProtocolError> {
        let pool = Self::env().account_id();
        let config = *self.data::<PoolConfig>();
        let state = *self.data::<PoolState>();
        let working_slippage_in_precision: u128;
        if slippage_in_precision == 0 {
            working_slippage_in_precision = config.default_slippage_in_precision;
        } else {
            working_slippage_in_precision = slippage_in_precision;
        }
        let current_reward_amount = objectively_obtain_single_balance(pool, state.reward);

        let actually_deposited_reward_amount = current_reward_amount - state.last_reward_amount;
        if
            !check_if_within_acceptable_percent_range(
                reward_amount_in,
                actually_deposited_reward_amount
            ).unwrap()
        {
            return Err(ProtocolError::DepositedRewardAmountIsNotTheSameAsStatedAmount);
        }

        let needed_me_token_amount = determine_optimal_me_amount_for_swap_given_reward_amount(
            listener_r_optimal,
            expected_output_reward_amount
        ).unwrap();
        if
            needed_me_token_amount >
            state.last_me_amount - config.minimum_me_amount_for_conversation
        {
            return Err(ProtocolError::ActionWillTakePoolMeTokensBelowConversationLimit);
        }
        let r_last = _calculate_pool_ratio(current_reward_amount, state.last_me_amount).unwrap();
        let needed_reward_amount = determine_reward_amount_for_swap_given_me_amount(
            r_last,
            config.r_optimal,
            needed_me_token_amount,
            state.last_me_amount,
            working_slippage_in_precision
        );

        if actually_deposited_reward_amount < needed_reward_amount {
            return Err(ProtocolError::InsufficientRewardAmountDepositedForConversation);
        }

        PSP22Ref::transfer(&state.me_token, listener, needed_me_token_amount, Vec::<u8>::new())?;

        let excess_deposited_reward_amount =
            actually_deposited_reward_amount - needed_me_token_amount;

        PSP22Ref::transfer(
            &state.reward,
            requestor,
            excess_deposited_reward_amount,
            Vec::<u8>::new()
        )?;

        let output_reward = APoolRef::engage_incoming_conversation(
            &listener,
            expected_output_reward_amount,
            output_reward_receiver,
            working_slippage_in_precision
        ).unwrap();

        let (current_reward_amount, current_me_amount) = objectively_obtain_pool_balances(
            pool,
            state.reward,
            state.me_token
        );
        update_pool_state(
            self,
            current_reward_amount,
            current_me_amount,
            Self::env().block_timestamp()
        )?;

        Ok(output_reward)
    }

    #[modifiers(when_active)]
     fn engage_incoming_conversation(
        &mut self,
        expected_reward_amount: Balance,
        output_reward_receiver: AccountId,
        slippage_in_precision: u128
    ) -> Result<Balance, ProtocolError> {
        let pool = Self::env().account_id();
        let config = *self.data::<PoolConfig>();
        let state = *self.data::<PoolState>();

        let working_slippage_in_precision: u128;
        if slippage_in_precision == 0 {
            working_slippage_in_precision = config.default_slippage_in_precision;
        } else {
            working_slippage_in_precision = slippage_in_precision;
        }
        let current_me_amount = objectively_obtain_single_balance(pool, state.me_token);
        let me_amount_from_conversation = current_me_amount - state.last_me_amount;
        let output_reward = determine_optimal_reward_amount_for_swap_given_me_amount(
            config.r_optimal,
            me_amount_from_conversation
        );
        if expected_reward_amount > output_reward {
            if
                !check_if_within_acceptable_slippage_range(
                    expected_reward_amount,
                    output_reward,
                    working_slippage_in_precision
                ).unwrap()
            {
                return Err(
                    ProtocolError::ExpectedRewardAmountExceedsActuallyObtainableRewardsAmount
                );
            }
        }
        PSP22Ref::transfer(&state.reward, output_reward_receiver, output_reward, Vec::<u8>::new())?;

        let (current_reward_amount, current_me_amount) = objectively_obtain_pool_balances(
            pool,
            state.reward,
            state.me_token
        );
        update_pool_state(
            self,
            current_reward_amount,
            current_me_amount,
            Self::env().block_timestamp()
        )?;
        Ok(output_reward)
    }

    #[modifiers(when_not_active)]
    #[modifiers(only_role(POOL_ADMIN))]
     fn change_r_optimal(&mut self, new_r_optimal: u128) -> Result<bool, ProtocolError> {
        let pool = Self::env().account_id();
        let config = *self.data::<PoolConfig>();
        let state = *self.data::<PoolState>();
        if new_r_optimal == 0 {
            return Err(ProtocolError::OptimalRewardRatioCanNotBeZero);
        }
        let actual_r_optimal_in_precision = new_r_optimal * PRECISION;
        let (current_reward_amount, current_me_amount) = objectively_obtain_pool_balances(
            pool,
            state.reward,
            state.me_token
        );
        if config.maximum_r_limit < actual_r_optimal_in_precision {
            return Err(ProtocolError::MaximumRewardRatioCanNotBeLessThanTheOptimalRatio);
        }
        if
            _calculate_pool_ratio(current_reward_amount, current_me_amount).unwrap() >
            actual_r_optimal_in_precision
        {
            return Err(
                ProtocolError::PoolRatioDuringResetOfOptimalRatioCanNotBeGreaterThanTheOptimalRatio
            );
        }
        self.data::<PoolConfig>().r_optimal = actual_r_optimal_in_precision;
       
        Ok(true)
    }

    #[modifiers(only_role(POOL_ADMIN))]
      fn change_pool_config_except_r_optimal(
        &mut self,
        editable_config: EditablePoolConfig,
        ignore_ : bool
    ) -> Result<bool, ProtocolError> {
        let config = *self.data::<PoolConfig>();
        if !ignore_  {
            if editable_config.maximum_r_limit <= config.r_optimal {
                return Err(ProtocolError::MaximumRewardRatioCanNotBeLessThanTheOptimalRatio);
            }
            self.data::<PoolConfig>().maximum_r_limit = editable_config.maximum_r_limit;
            self.data::<PoolConfig>().minimum_reward_amount_for_conversation =
                editable_config.minimum_reward_amount_for_conversation;
            self.data::<PoolConfig>().minimum_me_amount_for_conversation =
                editable_config.minimum_me_amount_for_conversation;
            self.data::<PoolConfig>().notify_reward_amount = editable_config.notify_reward_amount;
            self.data::<PoolConfig>().notify_me_amount = editable_config.notify_me_amount;
            self.data::<PoolConfig>().default_slippage_in_precision =
                editable_config.default_slippage_in_precision;
            self.data::<PoolConfig>().allow_internal_swap = editable_config.allow_internal_swap;
        } else {
            if editable_config.maximum_r_limit != 0 {
                if editable_config.maximum_r_limit <= config.r_optimal {
                    return Err(ProtocolError::MaximumRewardRatioCanNotBeLessThanTheOptimalRatio);
                }
                self.data::<PoolConfig>().maximum_r_limit = editable_config.maximum_r_limit;
            }
            if editable_config.minimum_reward_amount_for_conversation != 0 {
                self.data::<PoolConfig>().minimum_reward_amount_for_conversation =
                    editable_config.minimum_reward_amount_for_conversation;
            }

            if editable_config.minimum_me_amount_for_conversation != 0 {
                self.data::<PoolConfig>().minimum_me_amount_for_conversation =
                    editable_config.minimum_me_amount_for_conversation;
            }

            if editable_config.notify_reward_amount != 0 {
                self.data::<PoolConfig>().notify_reward_amount =
                    editable_config.notify_reward_amount;
            }

            if editable_config.notify_me_amount != 0 {
                self.data::<PoolConfig>().notify_me_amount = editable_config.notify_me_amount;
            }

            if editable_config.default_slippage_in_precision != 0 {
                self.data::<PoolConfig>().default_slippage_in_precision =
                    editable_config.default_slippage_in_precision;
            }

            if editable_config.allow_internal_swap != false {
                self.data::<PoolConfig>().allow_internal_swap = editable_config.allow_internal_swap;
            }
        }
        Ok(true)
    }



      fn get_position_data(
        &self,
        position: u128
    ) -> Result<(Balance, Balance), ProtocolError> {
        psp34::Internal::_check_token_exists(self, &Id::U128(position))?;
        // todo  self
        //     .data::<psp34::Data<>>()
        //     ._check_token_exists(&Id::U128(position))?;

        let current_position_data = self
            .data::<Position>()
            .position_metadata.get(&Id::U128(position))
            . unwrap_or_default ();
        Ok((current_position_data.reward_position, current_position_data.me_token_position))
    }

      fn get_position_by_index(
        &self,
        requestor: AccountId,
        index: u128
    ) -> Result<Id, ProtocolError> {
        let total_number_of_positions = BalancesManagerImpl::_balance_of(self, &requestor);
        //todo let total_number_of_positions = self
        //     .data::<psp34::Data>()
        //     .balance_of(requestor);
        if index > total_number_of_positions.into() {
            return Err(ProtocolError::InvalidPositionIndex);
        }

        let position = PSP34EnumerableImpl
            ::owners_token_by_index(self, requestor, index)
            .unwrap();
        // let position = self
        //     .data::<psp34::Data>()
        //     .owners_token_by_index(requestor, index)
        //     .unwrap();
        Ok(position)
    }

     fn get_all_positions(&self, requestor: AccountId) -> Result<Vec<Id>, ProtocolError> {
        let total_number_of_positions = BalancesManagerImpl::_balance_of(self, &requestor);
        // Todo let total_number_of_positions = self
        //     .data::<psp34::Data>()
        //     .balance_of(requestor);
        if total_number_of_positions == 0 {
            return Err(ProtocolError::RequestorHasNoPosition);
        }
        if total_number_of_positions > 20 {
            return Err(ProtocolError::PositionsAreMoreThanTwentyTryToGetThenOneAfterAnother);
        }
        let mut positions = Vec::new();
        for i in 0..total_number_of_positions {
            positions.push(
                PSP34EnumerableImpl
                ::owners_token_by_index(self, requestor, i.into())
                .unwrap()
                // Todo self
                //     .data::<psp34::Data<>>()
                //     .owners_token_by_index(requestor, i.into())
                //     .unwrap()
            );
        }
        Ok(positions)
    }

    fn determine_needed_reward_amount_given_me_amount(&mut self, me_amount: Balance, slippage_in_precision: u128)-> Result<Balance, ProtocolError>{
        let config = *self.data::<PoolConfig>();
        let state = *self.data::<PoolState>();
        let r_last = _calculate_pool_ratio(state.last_reward_amount, state.last_me_amount).unwrap();
        let mut slippage = if slippage_in_precision == 0 {config.default_slippage_in_precision} else{slippage_in_precision};
        let result = determine_reward_amount_for_swap_given_me_amount(r_last,config.r_optimal, me_amount, state.last_me_amount, slippage);
        Ok(result)
    }

    fn determine_optimal_needed_me_amount_given_reward_amount(&mut self, reward_amount: Balance)-> Result<Balance, ProtocolError> {
        ensure_value_is_not_zero(reward_amount);
        let config = *self.data::<PoolConfig>();
        let result = determine_optimal_me_amount_for_swap_given_reward_amount(config.r_optimal, reward_amount).unwrap();
        Ok(result)
    }
     
    fn get_r_optimal(&mut self)-> Result<Balance, ProtocolError>{
        let config = *self.data::<PoolConfig>();
        Ok(config.r_optimal)
    }
}

fn ensure_r_is_within_acceptable_range(
    r_sample: u128,
    maximum_r_limit: u128
) -> Result<(), ProtocolError> {
    if r_sample > maximum_r_limit {
        return Err(ProtocolError::ConversationWillCausePoolToGoOutOfRag);
    }
    Ok(())
}

fn validate_give_pool_tokens_request(
    reward: AccountId,
    me_token: AccountId,
    pool: AccountId,
    reward_amount: Balance,
    me_amount: Balance,
    last_reward_amount: Balance,
    last_me_amount: Balance
) -> Result<(Balance, Balance, Balance, Balance), ProtocolError> {
    let (current_reward_amount, current_me_amount) = objectively_obtain_pool_balances(
        pool,
        reward,
        me_token
    );
    let added_reward_amount = current_reward_amount - last_reward_amount;
    let added_me_amount = current_me_amount - last_me_amount;

   if added_reward_amount < reward_amount {
    return Err(ProtocolError::RequestIsNotWithInAccuracyRange);
   }
   
   if added_me_amount < me_amount{
    return Err(ProtocolError::RequestIsNotWithInAccuracyRange);
   }

    Ok((current_reward_amount, current_me_amount, added_reward_amount, added_me_amount))
}

fn update_pool_state<T>(
    instance: &mut T,
    current_reward_amount: Balance,
    mut current_me_amount: Balance,
    transaction_time: u64
) -> Result<(), ProtocolError>
    where T: Storage<PoolState> + Storage<PoolConfig>
{
    if current_me_amount == 0 {current_me_amount = 1}
    let r = _calculate_pool_ratio(current_reward_amount, current_me_amount).unwrap();
    if instance.data::<PoolConfig>().maximum_r_limit != 0{
        ensure_r_is_within_acceptable_range(r, instance.data::<PoolConfig>().maximum_r_limit)?;
    }
   
    instance.data::<PoolState>().last_reward_amount = current_reward_amount;
    instance.data::<PoolState>().last_me_amount = current_me_amount;
    instance.data::<PoolState>().last_transaction_time = transaction_time;
    Ok(())
}

fn reward_withdrawal_type_a(position_reward_amount: Balance) -> (Balance, Balance) {
    (position_reward_amount, Default::default())
}

fn reward_withdrawal_type_c(
    position_reward_amount: Balance,
    current_reward_amount: Balance,
    minimum_reward_amount_for_conversation: Balance,
    minimum_me_amount_for_conversation: Balance,
    current_me_amount: Balance,
    protocol_me_offset: Balance,
    r_optimal: u128
) -> Result<(Balance, Balance), ProtocolError> {
    let (base, error) = if protocol_me_offset > minimum_me_amount_for_conversation {
        (protocol_me_offset, ProtocolError::ProtocolOffsetMustBeConsidered)
    } else {
        (
            minimum_me_amount_for_conversation,
            ProtocolError::ActionWillTakePoolMeTokensBelowConversationLimit,
        )
    };
    if current_me_amount < base {
        return Err(error);
    }
    let reward_amount_to_withdraw = current_reward_amount - minimum_reward_amount_for_conversation;
    let me_amount_to_withdraw =
        ((position_reward_amount - reward_amount_to_withdraw) * PRECISION) / r_optimal;
    if current_me_amount - me_amount_to_withdraw < base {
        return Err(error);
    }
    Ok((reward_amount_to_withdraw, me_amount_to_withdraw))
}

fn me_withdrawal_type_a(position_me_amount: Balance) -> (Balance, Balance) {
    (Default::default(), position_me_amount)
}

fn me_withdrawal_type_c(
    position_me_amount: Balance,
    current_me_amount: Balance,
    current_reward_amount: Balance,
    minimum_reward_amount_for_conversation: Balance,
    base: Balance,
    r_optimal: u128
) -> Result<(Balance, Balance), ProtocolError> {
    let mut me_amount_to_withdraw = 0;
    let mut reward_amount_to_withdraw = 0;
    if current_me_amount < base {
        reward_amount_to_withdraw = (position_me_amount * r_optimal) / PRECISION;
        if
            current_reward_amount - reward_amount_to_withdraw <
            minimum_reward_amount_for_conversation
        {
            return Err(ProtocolError::ActionWillTakePoolRewardsBelowConversationLimit);
        }
    } else {
        me_amount_to_withdraw = current_me_amount - base;
        reward_amount_to_withdraw =
            ((position_me_amount - me_amount_to_withdraw) * r_optimal) / PRECISION;
        if
            current_reward_amount - reward_amount_to_withdraw <
            minimum_reward_amount_for_conversation
        {
            return Err(ProtocolError::ActionWillTakePoolRewardsBelowConversationLimit);
        }
    }

    Ok((reward_amount_to_withdraw, me_amount_to_withdraw))
}

fn obtain_amount_of_pool_reward_to_withdraw(
    position_reward_amount: Balance,
    position_me_amount: Balance,
    current_reward_amount: Balance,
    current_me_amount: Balance,
    minimum_reward_amount_for_conversation: Balance,
    minimum_me_amount_for_conversation: Balance,
    protocol_me_offset: Balance,
    r_optimal: u128
) -> Result<(Balance, Balance), ProtocolError> {
    let mut reward_amount_to_withdraw_a = 0;
    let mut reward_amount_to_withdraw_b = 0;
    let mut me_amount_to_withdraw_a = 0;
    let mut me_amount_to_withdraw_b = 0;
    let base = if protocol_me_offset > minimum_me_amount_for_conversation {
        protocol_me_offset
    } else {
        minimum_me_amount_for_conversation
    };
    if
        current_reward_amount < position_reward_amount ||
        current_reward_amount - position_reward_amount < minimum_reward_amount_for_conversation
    {
        (reward_amount_to_withdraw_a, me_amount_to_withdraw_a) = reward_withdrawal_type_c(
            position_reward_amount,
            current_reward_amount,
            minimum_reward_amount_for_conversation,
            minimum_me_amount_for_conversation,
            current_me_amount,
            protocol_me_offset,
            r_optimal
        ).unwrap();
    } else {
        (reward_amount_to_withdraw_a, me_amount_to_withdraw_a) =
            reward_withdrawal_type_a(position_reward_amount);
    }

    if current_me_amount < position_me_amount || current_me_amount - position_me_amount < base {
        (reward_amount_to_withdraw_b, me_amount_to_withdraw_b) = me_withdrawal_type_c(
            position_me_amount,
            current_me_amount,
            current_reward_amount,
            minimum_reward_amount_for_conversation,
            base,
            r_optimal
        ).unwrap();
    } else {
        (reward_amount_to_withdraw_b, me_amount_to_withdraw_b) =
            me_withdrawal_type_a(position_me_amount);
    }

    Ok((
        reward_amount_to_withdraw_a + reward_amount_to_withdraw_b,
        me_amount_to_withdraw_a + me_amount_to_withdraw_b,
    ))
}

#[modifier_definition]
pub fn when_active<T, F, R, E>(instance: &mut T, body: F) -> Result<R, E>
    where T: Storage<PoolState>, F: FnOnce(&mut T) -> Result<R, E>, E: From<ProtocolError>
{
    if !instance.data().started {
        return Err(From::from(ProtocolError::ConversationsNotStarted));
    }

    if !instance.data().active {
        return Err(From::from(ProtocolError::PoolNotActive));
    }
    body(instance)
}

#[modifier_definition]
pub fn when_not_active<T, F, R, E>(instance: &mut T, body: F) -> Result<R, E>
    where T: Storage<PoolState>, F: FnOnce(&mut T) -> Result<R, E>, E: From<ProtocolError>
{
    if instance.data().active {
        return Err(From::from(ProtocolError::PoolIsActive));
    }
    body(instance)
}

