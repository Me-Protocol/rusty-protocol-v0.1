use crate::providers::{ common::constants::PRECISION, data::{bounty::BountyRecord, protocol::update_editable_protocol_config} };
pub use crate::{
    providers::{
        data::bounty::*,
        common::{ roles::*, errors::ProtocolError, eunice::*, validator::* },
    },
    controllers::deployables::bounty::*,
};

use ink::{ prelude::vec::Vec, primitives::AccountId, env::call::ConstructorReturnType };
use openbrush::{
    modifier_definition,
    contracts::{ access_control::*, traits::{ psp22::PSP22Ref }, reentrancy_guard::* },
    modifiers,
    traits::{ Balance, Storage },
};

pub trait BountyImpl: Storage<BountyRecord> + 
Storage<access_control::Data> + 
Storage<reentrancy_guard::Data> +   
MembersManager +
AccessControlImpl
 {
    #[modifiers(only_role(PROTOCOL))]
    fn deposit_bounty(
        &mut self,
        reward: AccountId,
        amount: Balance,
        requestor: AccountId
    ) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(reward)?;
        ensure_address_is_not_zero_address(requestor)?;
        ensure_value_is_not_zero(amount)?;
        if reward_is_bounty_reward(self, reward) != true {
            recognise_reward_as_bounty_reward(self, reward);
            let current_number_of_bounty_rewards = get_total_number_of_bounty_rewards(self);
            update_total_number_of_bounty_rewards(self, current_number_of_bounty_rewards + 1);
        }
        let bounty_id = Self::env().account_id();
        let previous_balance = get_bounty_balance(self, reward);
        let current_balance = objectively_obtain_single_balance(bounty_id, reward);

        if current_balance > previous_balance {
            let deposited_amount = current_balance - previous_balance;
            check_if_within_acceptable_percent_range(amount, deposited_amount)?;
            update_bounty_balance(self, reward, current_balance);
            Ok(true)
        } else {
            return Err(ProtocolError::BountyDepositNotRecognized);
        }
    }

    #[modifiers(only_role(PROTOCOL))]
    #[modifiers(non_reentrant)]
    fn withdraw_bounty(
        &mut self,
        reward: AccountId,
        amount: Balance,
        requestor: AccountId,
        to: AccountId
    ) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(reward)?;
        ensure_address_is_not_zero_address(requestor)?;
        ensure_value_is_not_zero(amount)?;
        if !reward_is_bounty_reward(self, reward) {
            return Err(ProtocolError::RewardIsNotBountyReward);
        }
        let current_bounty_balance = get_bounty_balance(self, reward);
        if amount > current_bounty_balance {
            return Err(ProtocolError::InsufficientBountyReward);
        }
        update_bounty_balance(self, reward, current_bounty_balance - amount);
        PSP22Ref::transfer(&reward, to, amount, Vec::<u8>::new())?;
        Ok(true)
    }

    // #[ink(message)]
    // fn distribute_bounty(&mut self, reward:AccountId, amount:Balance, requestor: AccountId) -> Result<bool, ProtocolError>;

    fn set_trigger_limit(
        &mut self,
        reward: AccountId,
        new_trigger_limit: Balance,
        requestor: AccountId
    ) -> Result<bool, ProtocolError> {
        ensure_value_is_not_zero(new_trigger_limit)?;
        ensure_address_is_not_zero_address(reward)?;
        ensure_address_is_not_zero_address(requestor)?;
        if !reward_is_bounty_reward(self, reward) {
            return Err(ProtocolError::RewardIsNotBountyReward);
        }
        update_trigger_limit(self, reward, new_trigger_limit);
        Ok(true)
    }

    fn get_trigger_limit(
        &mut self,
        reward: AccountId,
        requestor: AccountId
    ) -> Result<u128, ProtocolError> {
        ensure_address_is_not_zero_address(reward)?;
        ensure_address_is_not_zero_address(requestor)?;
        if !reward_is_bounty_reward(self, reward) {
            return Err(ProtocolError::RewardIsNotBountyReward);
        }
        Ok(get_trigger_limit(self, reward))
    }


    fn set_up_bounty(
        &mut self,
        me_token: AccountId,
    ) {
        update_me_id(self, me_token);
    }
}