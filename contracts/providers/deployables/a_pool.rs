pub use crate::{
    providers::{
        data::{a_pool::*, a_position::*}, 
        deployables::a_pool,
        common::{ roles::*, errors::ProtocolError, eunice::*, validator::* },
    },
    controllers::deployables::a_pool::*,
};

use ink::prelude::vec::Vec;
use openbrush::{
    contracts::{ access_control::*, psp34::*, traits::{ psp22::PSP22Ref } },
    modifiers,
    traits::{ AccountId, AccountIdExt, Balance, Storage, Timestamp, ZERO_ADDRESS },
};

impl<T: Storage<PoolState> + Storage<PoolConfig> + Storage<access_control::Data> + Storage<psp34::Data> + Storage<Position> > PoolController
for T {
    
    default fn pause_conversations(&mut self) -> Result<(), ProtocolError> {
        if !self.data::<PoolState>().active {
            return Err(ProtocolError::PoolAlreadyInActive);
        }
        self.data::<PoolState>().active = false;
        Ok(())
    }

    default fn resume_conversations(&mut self) -> Result<(), ProtocolError> {
        if self.data::<PoolState>().active {
            return Err(ProtocolError::PoolAlreadyActive);
        }
        self.data::<PoolState>().active = true;
        Ok(())
    }

    #[modifiers(only_role(POOL_MANAGER))]
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
            
            update_pool_state(self, current_reward_amount, current_me_amount, Self::env().block_timestamp())?;
            let id =  self.data::<Position>().next_position_id;
            self.data::<Position>().next_position_id = id + 1;
            if added_me_amount !=0 || added_reward_amount !=0 {
              self.data::<Position>().position_metadata.insert(&id, &PositionMetadata{reward_position:added_reward_amount, me_token_position:added_me_amount})
            }
            self.data::<psp34::Data>()._mint_to(to, Id::U128(id))?;
            Ok(())
    }


    #[modifiers(only_role(POOL_MANAGER))]
    default fn give_pool_tokens_for_existing_position(
        &mut self,
        position_id: u128,
        pool_numerator_amount: Balance,
        pool_divisor_amount: Balance,
        to: AccountId
    ) -> Result<(), ProtocolError> {
        ensure_address_is_not_zero_address(to)?;
        ensure_value_is_not_zero(position_id)?;
        self.data::<psp34::Data>()._check_token_exists(&Id::U128(position_id))?;
        if to != self.data::<psp34::Data>()._owner_of(&Id::U128(position_id)).unwrap() {return Err((ProtocolError::RequestorIsNotOwnerOfThePosition))};
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
            
            update_pool_state(self, current_reward_amount, current_me_amount, Self::env().block_timestamp())?;
            if added_me_amount !=0 || added_reward_amount !=0 {
            let current_position_data =  self.data::<Position>().position_metadata.get(&position_id).unwrap_or_default();
            self.data::<Position>().position_metadata.insert(&position_id, &PositionMetadata{reward_position:(added_reward_amount + current_position_data.reward_position), me_token_position:(added_me_amount + current_position_data.me_token_position)})
            }
            Ok(())
    }



    default fn withdraw_assets_from_pool(&mut self, pool_numerator_amount:Balance, pool_divisor_amount: Balance, to: AccountId) -> Result<(), ProtocolError>{
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
    ) -> (bool, AccountId, AccountId, AccountId, Balance, Balance, u64) {
        let state = *self.data::<PoolState>();

        (
            state.active,
            state.initiator,
            state.reward,
            state.me_token,
            state.last_reward_amount,
            state.last_me_amount,
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

default fn initiate_outgoing_conversation(&mut self, reward_amount_in: Balance, expected_output_reward_amount:Balance, listener:AccountId, listener_r_optimal: u128, output_reward_receiver: AccountId, slippage_in_precision:u128 ) -> Result<(), ProtocolError>{
        Ok(())
    }

    // #[ink(message)]
   default fn engage_incoming_conversation(&mut self, expected_reward_amount:Balance, output_reward_receiver: AccountId, slippage_in_precision:u128 ) -> Result<(), ProtocolError>{
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


// function _updateFeatures(uint256 currentNumerator, uint256 currentDivisor)
// internal
// {
// uint256 R = provider._calculatePoolRatio(
//     currentNumerator,
//     currentDivisor
// );
// provider._ensureRIsWithinRange(R, features.Rlimit);
// lastNumerator = currentNumerator;
// lastDivisor = currentDivisor;
// features.lastTransactionTime = _blockTimestamp();
// }


fn update_pool_state<T>(instance: &mut T, current_reward_amount: Balance, current_me_amount: Balance, transaction_time: u64) -> Result<(), ProtocolError> where T: Storage<PoolState> +  Storage<PoolConfig> {
    let r = _calculate_pool_ratio(current_reward_amount, current_me_amount);
    ensure_r_is_within_acceptable_range(r, instance.data::<PoolConfig>().maximum_r_limit)?;
    instance.data::<PoolState>().last_reward_amount = current_reward_amount;
    instance.data::<PoolState>().last_me_amount = current_me_amount;
    instance.data::<PoolState>().last_transaction_time = transaction_time;
    Ok(())
}