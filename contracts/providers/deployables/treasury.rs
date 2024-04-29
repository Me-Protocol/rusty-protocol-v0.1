use crate::providers::{ common::{ constants::PRECISION, types::* }, data::treasury::* };
pub use crate::{
    providers::{
        data::{ treasury::* },
        common::{ roles::*, errors::ProtocolError, eunice::*, validator::* },
    },
    controllers::deployables::treasury::*,
};
use openbrush::traits::String;

use ink::{ prelude::vec::Vec, primitives::AccountId };
use openbrush::{
    modifier_definition,
    contracts::{ access_control::*, traits::{ psp22::PSP22Ref }, reentrancy_guard::* },
    modifiers,
    traits::{ Balance, Storage },
};

    pub trait TreasuryImpl: Storage<TreasuryRecord> + 
    Storage<access_control::Data> + 
    Storage<reentrancy_guard::Data> +
    MembersManager +
    AccessControlImpl
    {


    // #[modifiers(only_role(PROTOCOL))]
    fn deposit_reward_and_or_me(
        &mut self,
        reward: AccountId,
        reward_amount: Balance,
        me_amount: Balance,
        brand: BRAND_ID_TYPE,
        requestor: AccountId,
        metadata: Option<String>
    ) -> Result<bool, ProtocolError> {
      
        ensure_address_is_not_zero_address(requestor)?;
        let treasury = Self::env().account_id();
        let me = get_me(self);
        if reward_amount == 0 && me_amount == 0 {
            return Err(ProtocolError::BothDepositsCanNotBeZero);
        }
        let (current_reward_balance, current_me_balance) = objectively_obtain_pool_balances(
            treasury,
            reward,
            me
        );
        if reward_amount > 0 {
            ensure_address_is_not_zero_address(reward)?;
            let previous_reward_balance = get_treasury_reward_balance(self, reward);
            if previous_reward_balance > current_reward_balance {
                return Err(ProtocolError::TreasuryDepositNotRecognized);
            }
            let deposited_reward_amount = current_reward_balance - previous_reward_balance;
            check_if_within_acceptable_percent_range(reward_amount, deposited_reward_amount)?;
            update_treasury_reward_balance(self, reward, current_reward_balance);
        }
        if me_amount > 0 {
            ensure_brand_is_not_default(brand)?;
            let previous_me_balance = get_treasury_me_balance_for_brand(self, brand);
            if previous_me_balance > current_me_balance {
                return Err(ProtocolError::TreasuryDepositNotRecognized);
            }
            let deposited_me_amount = current_me_balance - previous_me_balance;
            check_if_within_acceptable_percent_range(me_amount, deposited_me_amount)?;
            update_treasury_me_balance_for_brand(self, brand, current_me_balance);
        }
        Ok(true)
    }

    #[modifiers(only_role(PROTOCOL))]
    fn receive_cai(
        &mut self,
        me_amount: Balance,
        brand: BRAND_ID_TYPE,
        requestor: AccountId,
        metadata: Option<String>
    ) -> Result<bool, ProtocolError> {
        ensure_value_is_not_zero(me_amount)?;
        ensure_brand_is_not_default(brand)?;
        ensure_address_is_not_zero_address(requestor)?;
        let treasury = Self::env().account_id();
        let me = get_me(self);
        let current_me_balance = objectively_obtain_single_balance(treasury, me);
        let previous_me_balance = get_treasury_me_balance_for_brand(self, brand);
        if previous_me_balance > current_me_balance {
            return Err(ProtocolError::TreasuryDepositNotRecognized);
        }
        let deposited_me_amount = current_me_balance - previous_me_balance;
        check_if_within_acceptable_percent_range(me_amount, deposited_me_amount)?;
        update_treasury_me_balance_for_brand(self, brand, current_me_balance);
        Ok(true)
    }

    // #[modifiers(only_role(PROTOCOL))]
    #[modifiers(non_reentrant)]
    fn withdraw_reward_and_or_me(
        &mut self,
        reward: AccountId,
        reward_amount: Balance,
        me_amount: Balance,
        brand: BRAND_ID_TYPE,
        to: AccountId,
        requestor: AccountId
    ) -> Result<bool, ProtocolError> {
        let treasury = Self::env().account_id();
        //emit event
        withdraw_reward_and_or_me(
            self,
            reward,
            reward_amount,
            me_amount,
            brand,
            to,
            requestor,
            treasury
        )?;
        Ok(true)
    }

    #[modifiers(only_role(PROTOCOL))]
    #[modifiers(non_reentrant)]
    fn top_up_pool_with_reward_and_or_me(
        &mut self,
        reward: AccountId,
        pool_id: AccountId,
        reward_amount: Balance,
        me_amount: Balance,
        brand: BRAND_ID_TYPE,
        requestor: AccountId,
        metadata: Option<String>
    ) -> Result<bool, ProtocolError> {
        let treasury = Self::env().account_id();
        //emit event
        withdraw_reward_and_or_me(
            self,
            reward,
            reward_amount,
            me_amount,
            brand,
            pool_id,
            requestor,
            treasury
        )?;
        Ok(true)
    }

    #[modifiers(only_role(PROTOCOL))]
    #[modifiers(non_reentrant)]
    fn pay_for_some_costs(
        &mut self,
        reward: AccountId,
        to: AccountId,
        reward_amount: Balance,
        me_amount: Balance,
        brand: BRAND_ID_TYPE,
        requestor: AccountId,
        metadata: Option<String>
    ) -> Result<bool, ProtocolError> {
        let treasury = Self::env().account_id();
        //emit event
        withdraw_reward_and_or_me(
            self,
            reward,
            reward_amount,
            me_amount,
            brand,
            to,
            requestor,
            treasury
        )?;
        Ok(true)
    }

    #[modifiers(only_role(PROTOCOL))]
    fn set_reward_notify_limit(
        &mut self,
        reward: AccountId,
        new_notify_limit: Balance,
        requestor: AccountId
    ) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(reward)?;
        ensure_address_is_not_zero_address(requestor)?;
        ensure_value_is_not_zero(new_notify_limit)?;
        update_reward_notify_limit(self, reward, new_notify_limit);
        Ok(true)
    }

    #[modifiers(only_role(PROTOCOL))]
    fn get_reward_notify_limit(
        &mut self,
        reward: AccountId,
        requestor: AccountId
    ) -> Result<Balance, ProtocolError> {
        Ok(get_reward_notify_limit(self, reward))
    }

    #[modifiers(only_role(PROTOCOL))]
    fn set_me_notify_limit(
        &mut self,
        new_notify_limit: Balance,
        requestor: AccountId
    ) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(requestor)?;
        ensure_value_is_not_zero(new_notify_limit)?;
        update_me_notify_limit(self, new_notify_limit);
        Ok(true)
    }

    #[modifiers(only_role(PROTOCOL))]
    fn get_me_notify_limit(&mut self, requestor: AccountId) -> Result<Balance, ProtocolError> {
        Ok(get_me_notify_limit(self))
    }


    fn set_up_treasury(
        &mut self,
        me_token: AccountId,
    ) {
        update_me_id(self, me_token);
    }

    fn get_me_id(&mut self)-> Result<AccountId, ProtocolError> {
        Ok(get_me( self))
    }

}

fn withdraw_reward_and_or_me<T>(
    instance: &mut T,
    reward: AccountId,
    reward_amount: Balance,
    me_amount: Balance,
    brand: BRAND_ID_TYPE,
    to: AccountId,
    requestor: AccountId,
    treasury: AccountId
) -> Result<bool, ProtocolError>
    where T: Storage<TreasuryRecord>
{
   
    ensure_address_is_not_zero_address(requestor)?;
    
    let me = get_me(instance);
    if reward_amount == 0 && me_amount == 0 {
        return Err(ProtocolError::BothWithdrawalsCanNotBeZero);
    }
    let (current_reward_balance, current_me_balance) = objectively_obtain_pool_balances(
        treasury,
        reward,
        me
    );
    if reward_amount > 0 {
        ensure_address_is_not_zero_address(reward)?;
        if current_reward_balance < reward_amount {
            return Err(ProtocolError::InsufficientTreasuryRewardBalance);
        }
        update_treasury_reward_balance(instance, reward, current_reward_balance - reward_amount);
        PSP22Ref::transfer(&reward, to, reward_amount, Vec::<u8>::new())?;
    }
    if me_amount > 0 {
        ensure_brand_is_not_default(brand)?;
        if current_me_balance < me_amount {
            return Err(ProtocolError::InsufficientTreasuryMeBalance);
        }
        update_treasury_me_balance_for_brand(instance, brand, current_me_balance - me_amount);
        PSP22Ref::transfer(&me, to, me_amount, Vec::<u8>::new())?;
    }

    Ok(true)
}