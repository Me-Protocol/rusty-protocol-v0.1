#![cfg_attr(not(feature = "std"), no_std, no_main)]
#![no_main]
#![feature(min_specialization)]


/// 
/// 
///           /////   THE TREASURY CONTRACT /////
/// 
///     
/// 
/// This is the main entry into the treasury contract 
/// 
/// Understanding the tresury contract 
/// 
/// The treasury contract serves that record book for all tokens owned by all business owners. 
/// All tokens sent in and out from pool from the business owners are accounted for in the treasury. 
/// 
/// 
/// Treasury FLow
/// 
/// deposit_reward_and_or_me: Called after a reward and me token as a pair as been deposited into the treasury.
/// It serves as a function that records the deposited pair token. 
/// 
/// withdraw_reward_and_or_me: serves as the function that withdraws both the reward token and the me token
/// 
/// pay_for_some_costs: Function called to pay for certain costs inquired in the protocol 
/// 
/// top_up_pool_with_reward_and_or_me: Called to add more me token and reward token to the tresury 
/// 
/// set_reward_notify_limit: Used to set up the reward notify limits 


#[openbrush::implementation(AccessControl)]
#[openbrush::contract]
pub mod treasury {

  pub  use global::providers::{
        data::treasury::*,
        deployables::treasury::{ *, TreasuryImpl, },
        common::types::BRAND_ID_TYPE,
    };

    use openbrush::{
        contracts::{ access_control::{*, self}, reentrancy_guard::* },
        traits::{ Storage, String },
    };

  
    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Treasury {
        
        #[storage_field]
        treasury_state: TreasuryRecord,

        #[storage_field]
        pub access: access_control::Data,

        #[storage_field]
        pub guard: reentrancy_guard::Data,
    }

    impl TreasuryImpl for Treasury {}

    impl TreasuryController for Treasury {

        #[ink(message)] 
        fn deposit_reward_and_or_me(
            &mut self,
            reward: AccountId,
            reward_amount: Balance,
            me_amount: Balance,
            brand: BRAND_ID_TYPE,
            requestor: AccountId,
            metadata: Option<String>
        ) -> Result<bool, ProtocolError> {
            TreasuryImpl::deposit_reward_and_or_me(self, reward, reward_amount, me_amount, brand, requestor, metadata)
        }

        #[ink(message)] 
        fn receive_cai(
            &mut self,
            me_amount: Balance,
            brand: BRAND_ID_TYPE,
            requestor: AccountId,
            metadata: Option<String>
        ) -> Result<bool, ProtocolError> {
            TreasuryImpl::receive_cai(self, me_amount, brand,requestor, metadata)
        }

        #[ink(message)] 
        fn withdraw_reward_and_or_me(
            &mut self,
            reward: AccountId,
            reward_amount: Balance,
            me_amount: Balance,
            brand: BRAND_ID_TYPE,
            to: AccountId,
            requestor: AccountId
        ) -> Result<bool, ProtocolError> {
            TreasuryImpl::withdraw_reward_and_or_me(self,reward, reward_amount, me_amount, brand, to, requestor)
        }

        #[ink(message)]
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
            TreasuryImpl::top_up_pool_with_reward_and_or_me(self, reward, pool_id, reward_amount, me_amount, brand, requestor,metadata )
        }

        #[ink(message)]
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
            TreasuryImpl::pay_for_some_costs(self, reward, to,reward_amount, me_amount,brand, requestor, metadata)
        }

        #[ink(message)]
        fn set_reward_notify_limit(
            &mut self,
            reward: AccountId,
            new_notify_limit: Balance,
            requestor: AccountId
        ) -> Result<bool, ProtocolError> {
            TreasuryImpl::set_reward_notify_limit(self,reward,new_notify_limit,requestor)
        }

        #[ink(message)]
        fn get_reward_notify_limit(
            &mut self,
            reward: AccountId,
            requestor: AccountId
        ) -> Result<Balance, ProtocolError> {
            TreasuryImpl::get_reward_notify_limit(self, reward, requestor)
        }

        #[ink(message)]
        fn set_me_notify_limit(
            &mut self,
            new_notify_limit: Balance,
            requestor: AccountId
        ) -> Result<bool, ProtocolError> {
            TreasuryImpl::set_me_notify_limit(self, new_notify_limit,requestor )
        }

        #[ink(message)]
        fn get_me_notify_limit(&mut self, requestor: AccountId) -> Result<Balance, ProtocolError> {
            TreasuryImpl::get_me_notify_limit(self, requestor)
        }

        #[ink(message)]
        fn get_me_id(&mut self)-> Result<AccountId, ProtocolError> {
            TreasuryImpl::get_me_id(self)
        }
}

    impl Treasury {
       
        #[ink(constructor)]
        pub fn new(me_token: AccountId) -> Self {
            let mut instance = Self::default();
            let caller = instance.env().caller();

            access_control::InternalImpl::_init_with_admin(&mut instance, Some(caller));

            access_control::InternalImpl::_setup_role(&mut instance, PROTOCOL, Some(caller));
            
            TreasuryImpl::set_up_treasury(&mut instance,me_token);

            instance
        }

    }

}