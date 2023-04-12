use crate::providers::common::constants::PRECISION;
pub use crate::{
    providers::{
        data::{ a_pool::*, a_position::* },
        deployables::a_pool,
        common::{ roles::*, errors::ProtocolError, eunice::*, validator::* },
    },
    controllers::deployables::a_pool::*,
};

use ink::{prelude::vec::Vec, primitives::AccountId};
use openbrush::{
    contracts::{ access_control::*, psp34::*, traits::{ psp22::PSP22Ref }, reentrancy_guard::*, pausable::*, },
    modifiers,
    traits::{ Balance, Storage, Timestamp, ZERO_ADDRESS },
};

impl<
    T: Storage<PoolState> +
        Storage<PoolConfig> +
        Storage<access_control::Data> +
        Storage<psp34::Data> +
        Storage<Position> +
        Storage<reentrancy_guard::Data> +
        Storage<pausable::Data>
> PoolController for T {
    default fn pause_conversations(&mut self,  requestor: AccountId) -> Result<(), ProtocolError> {
        if !self.data::<PoolState>().active {
            return Err(ProtocolError::PoolAlreadyInActive);
        }
        self.data::<PoolState>().active = false;
        self.data::<pausable::Data>().paused = true;
        self.data::<pausable::Data>()._emit_paused_event(requestor);
        Ok(())
    }

    default fn resume_conversations(&mut self, requestor: AccountId) -> Result<(), ProtocolError> {
        if self.data::<PoolState>().active {
            return Err(ProtocolError::PoolAlreadyActive);
        }
        self.data::<PoolState>().active = true;
        self.data::<pausable::Data>().paused = false;
        self.data::<pausable::Data>()._emit_paused_event(requestor);
        Ok(())
    }

    #[modifiers(only_role(POOL_MANAGER))]
    #[modifiers(non_reentrant)]
    default fn give_pool_tokens_for_new_position(
        &mut self,
        pool_numerator_amount: Balance,
        pool_divisor_amount: Balance,
        to: AccountId
    ) -> Result<(), ProtocolError> {
        ensure_address_is_not_zero_address(to)?;
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
        let id = self.data::<Position>().next_position_id;
        self.data::<Position>().next_position_id = id + 1;
        if added_me_amount != 0 || added_reward_amount != 0 {
            self.data::<Position>().position_metadata.insert(
                &id,
                &(PositionMetadata {
                    reward_position: added_reward_amount,
                    me_token_position: added_me_amount,
                })
            );
        }
        self.data::<psp34::Data>()._mint_to(to, Id::U128(id))?;
        Ok(())
    }

    #[modifiers(only_role(POOL_MANAGER))]
    #[modifiers(non_reentrant)]
    default fn give_more_pool_tokens_for_existing_position(
        &mut self,
        position_id: u128,
        pool_numerator_amount: Balance,
        pool_divisor_amount: Balance,
        requestor: AccountId,
        to: AccountId
    ) -> Result<(), ProtocolError> {
        ensure_address_is_not_zero_address(to)?;
        ensure_address_is_not_zero_address(requestor)?;
        ensure_value_is_not_zero(position_id)?;
        self.data::<psp34::Data>()._check_token_exists(&Id::U128(position_id))?;
        if requestor != self.data::<psp34::Data>()._owner_of(&Id::U128(position_id)).unwrap() {
            return Err(ProtocolError::RequestorIsNotOwnerOfThePosition);
        }
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
        if added_me_amount != 0 || added_reward_amount != 0 {
            let current_position_data = self
                .data::<Position>()
                .position_metadata.get(&position_id)
                .unwrap_or_default();
            self.data::<Position>().position_metadata.insert(
                &position_id,
                &(PositionMetadata {
                    reward_position: added_reward_amount + current_position_data.reward_position,
                    me_token_position: added_me_amount + current_position_data.me_token_position,
                })
            );
        }
        Ok(())
    }

    #[modifiers(only_role(POOL_MANAGER))]
    #[modifiers(non_reentrant)]
    default fn withdraw_assets_from_position(
        &mut self,
        position_id: u128,
        reward_pool_token_amount: Balance,
        me_pool_token_amount: Balance,
        requestor: AccountId,
        to: AccountId
    ) -> Result<(), ProtocolError> {
        ensure_address_is_not_zero_address(to)?;
        ensure_address_is_not_zero_address(requestor)?;
        ensure_value_is_not_zero(position_id)?;
        if reward_pool_token_amount == 0 && me_pool_token_amount == 0 {
            return Err(ProtocolError::CanNotWithdrawZeroAssetsFromThePool);
        }
        self.data::<psp34::Data>()._check_token_exists(&Id::U128(position_id))?;
        if requestor != self.data::<psp34::Data>()._owner_of(&Id::U128(position_id)).unwrap() {
            return Err(ProtocolError::RequestorIsNotOwnerOfThePosition);
        }
        let current_position_data = self
            .data::<Position>()
            .position_metadata.get(&position_id)
            .unwrap_or_default();
        if
            reward_pool_token_amount > current_position_data.reward_position ||
            me_pool_token_amount > current_position_data.me_token_position
        {
            return Err(ProtocolError::InsufficientPositionBalance);
        }
        let pool = Self::env().account_id();
        let state = *self.data::<PoolState>();
        let config = *self.data::<PoolConfig>();
        self.data::<Position>().position_metadata.insert(
            &position_id,
            &(PositionMetadata {
                reward_position: current_position_data.reward_position - reward_pool_token_amount,
                me_token_position: current_position_data.me_token_position - me_pool_token_amount,
            })
        );
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

    #[modifiers(only_role(POOL_ADMIN))]
    default fn add_pool_manager(&mut self, new_pool_manager: AccountId) -> Result<(), ProtocolError> {
        ensure_address_is_not_zero_address(new_pool_manager)?;
        if self.data::<access_control::Data>().has_role(POOL_MANAGER, new_pool_manager) {
            return Err(ProtocolError::AccountAlreadyPoolManager);
        }
        self.data::<access_control::Data>().grant_role(POOL_MANAGER, new_pool_manager)?;
        Ok(())
    }

    #[modifiers(only_role(POOL_ADMIN))]
    default fn remove_pool_manager(&mut self, pool_manager: AccountId) -> Result<(), ProtocolError> {
        ensure_address_is_not_zero_address(pool_manager)?;
        if !self.data::<access_control::Data>().has_role(POOL_MANAGER, pool_manager) {
            return Err(ProtocolError::AccountIsNotAPoolManager);
        }
        self.data::<access_control::Data>().revoke_role(POOL_MANAGER, pool_manager)?;
        Ok(())
    }

    default fn provide_pool_ratios(&self) -> (u128, u128) {
        let state = *self.data::<PoolState>();
        let config = *self.data::<PoolConfig>();
        (config.r_optimal, _calculate_pool_ratio(state.last_reward_amount, state.last_me_amount))
    }

    fn provide_pool_addresses(&self) -> (AccountId, AccountId, AccountId) {
        let state = *self.data::<PoolState>();
        (state.initiator, state.reward, state.me_token)
    }

    default fn provide_pool_state(
        &self
    ) -> (bool, AccountId, AccountId, AccountId, Balance, Balance, Balance, u64) {
        let state = *self.data::<PoolState>();

        (
            state.active,
            state.initiator,
            state.reward,
            state.me_token,
            state.last_reward_amount,
            state.last_me_amount,
            state.protocol_me_offset,
            state.last_transaction_time,
        )
    }

    default fn provide_pool_config(
        &self
    ) -> (Balance, u128, u128, Balance, Balance, Balance, Balance, u128, bool) {
        let config = *self.data::<PoolConfig>();

        (
            config.setup_me_amount,
            config.r_optimal,
            config.maximum_r_limit,
            config.minimum_reward_amount_for_conversation,
            config.minimum_me_amount_for_conversation,
            config.notify_reward_amount,
            config.notify_me_amount,
            config.default_slippage_in_precision,
            config.allow_internal_swap,
        )
    }

 
    #[modifiers(when_not_paused)]
    default fn initiate_outgoing_conversation(
        &mut self,
        reward_amount_in: Balance,
        expected_output_reward_amount: Balance,
        listener: AccountId,
        listener_r_optimal: u128,
        requestor: AccountId,
        output_reward_receiver: AccountId,
        slippage_in_precision: u128
    ) -> Result<(), ProtocolError> {
        let pool = Self::env().account_id();
        let config = *self.data::<PoolConfig>();
        let state = *self.data::<PoolState>();
       let mut working_slippage_in_precision: u128;
       if slippage_in_precision == 0 { working_slippage_in_precision = config.default_slippage_in_precision} else {working_slippage_in_precision = slippage_in_precision};
       let current_reward_amount = objectively_obtain_single_balance(pool, state.reward);

       let actually_deposited_reward_amount = current_reward_amount - state.last_reward_amount;
       if !check_if_within_acceptable_percent_range(reward_amount_in, actually_deposited_reward_amount){
       return Err(ProtocolError::DepositedRewardAmountIsNotTheSameAsStatedAmount);
       }

       let needed_me_token_amount = determine_optimal_me_amount_for_swap_given_reward_amount(listener_r_optimal, expected_output_reward_amount);
       if needed_me_token_amount > (state.last_me_amount - config.minimum_me_amount_for_conversation){
        return Err(ProtocolError::ActionWillTakePoolMeTokensBelowConversationLimit);
       }
       let r_last = _calculate_pool_ratio(current_reward_amount, state.last_me_amount);
       let needed_reward_amount = determine_reward_amount_for_swap_given_me_amount(r_last, config.r_optimal, needed_me_token_amount, state.last_me_amount, working_slippage_in_precision);

       if actually_deposited_reward_amount < needed_reward_amount {return Err(ProtocolError::InsufficientRewardAmountDepositedForConversation)}

       PSP22Ref::transfer(&state.me_token, listener, needed_me_token_amount, Vec::<u8>::new())?;
        
       let excess_deposited_reward_amount = actually_deposited_reward_amount - needed_me_token_amount;

       PSP22Ref::transfer(&state.reward, requestor, excess_deposited_reward_amount, Vec::<u8>::new())?;
        
        APoolRef::engage_incoming_conversation(&listener,expected_output_reward_amount, output_reward_receiver, working_slippage_in_precision)?;
        
        let (current_reward_amount, current_me_amount) = objectively_obtain_pool_balances(pool, state.reward, state.me_token);
        update_pool_state(self, current_reward_amount, current_me_amount, Self::env().block_timestamp())?;

       Ok(())

    }



    // function engageIncomingPoolConversation(
    //     uint256 _expectedNumeratorOut,
    //     address _receiver,
    //     uint256 slippage_in_percent
    // ) external locked returns (bool _done) {
    //     if (slippage_in_percent == 0)
    //         slippage_in_percent = features.DEFAULT_SLIPPAGE_IN_PERCENT;
    //     (address _numerator, address _divisor) = (numerator, divisor);
    //     (
    //         ,
    //         uint256 _Roptimal,
    //         ,
    //         uint256 _lastDivisor,
    //         ,
    //         ,
    //         ,

    //     ) = _getCommonFeatures();

    //     uint256 divisorBalance = provider.objectivelyObtainSingleBalance(
    //         address(this),
    //         _divisor
    //     );

    //     uint256 divisorDeposited = divisorBalance - _lastDivisor;

    //     uint256 numeratorOut = (divisorDeposited * _Roptimal) / 10**6; 

    //     if (
    //         !provider.checkIfWithinSlippageRange(
    //             numeratorOut,
    //             _expectedNumeratorOut,
    //             slippage_in_percent
    //         )
    //     ) revert(Errors.NOT_WITHIN_ACCURACY_RANGE);

    //     provider.transferERC20(_numerator, _receiver, numeratorOut);

    //     (uint256 newNumeratorBalance, uint256 newDivisorBalance) = provider
    //         .objectivelyObtainPoolBalances(address(this), _numerator, _divisor);
    //     _updateFeatures(newNumeratorBalance, newDivisorBalance);
    //     _done = true;
    // }

    #[modifiers(when_not_paused)]
    default fn engage_incoming_conversation(
        &mut self,
        expected_reward_amount: Balance,
        output_reward_receiver: AccountId,
        slippage_in_precision: u128
    ) -> Result<(), ProtocolError> {
        let pool = Self::env().account_id();
        let config = *self.data::<PoolConfig>();
        let state = *self.data::<PoolState>();

       let mut working_slippage_in_precision: u128;
       if slippage_in_precision == 0 { working_slippage_in_precision = config.default_slippage_in_precision} else {working_slippage_in_precision = slippage_in_precision};
        let current_me_amount = objectively_obtain_single_balance(pool, state.me_token);
        let me_amount_from_conversation = current_me_amount - state.last_me_amount;
        let output_reward = determine_optimal_reward_amount_for_swap_given_me_amount(config.r_optimal, me_amount_from_conversation);
        if expected_reward_amount > output_reward{
            if !check_if_within_acceptable_slippage_range(expected_reward_amount, output_reward, working_slippage_in_precision) {return Err(ProtocolError::ExpectedRewardAmountExceedsActuallyObtainableRewardsAmount)}
        }
        PSP22Ref::transfer(&state.reward, output_reward_receiver, output_reward, Vec::<u8>::new())?;

        let (current_reward_amount, current_me_amount) = objectively_obtain_pool_balances(pool, state.reward, state.me_token);
        update_pool_state(self, current_reward_amount, current_me_amount, Self::env().block_timestamp())?;
        Ok(())
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

    if !check_if_within_acceptable_percent_range(reward_amount, added_reward_amount) {
        return Err(ProtocolError::RequestIsNotWithInAccuracyRange);
    }

    if !check_if_within_acceptable_percent_range(me_amount, added_me_amount) {
        return Err(ProtocolError::RequestIsNotWithInAccuracyRange);
    }

    Ok((current_reward_amount, current_me_amount, added_reward_amount, added_me_amount))
}

fn update_pool_state<T>(
    instance: &mut T,
    current_reward_amount: Balance,
    current_me_amount: Balance,
    transaction_time: u64
) -> Result<(), ProtocolError>
    where T: Storage<PoolState> + Storage<PoolConfig>
{
    let r = _calculate_pool_ratio(current_reward_amount, current_me_amount);
    ensure_r_is_within_acceptable_range(r, instance.data::<PoolConfig>().maximum_r_limit)?;
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