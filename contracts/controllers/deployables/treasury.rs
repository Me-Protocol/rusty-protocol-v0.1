use openbrush::{
    contracts::traits::{ access_control::*, psp22::*},
    traits::{ AccountId, Balance },
};

use ink::{prelude::vec::Vec};

use crate::providers::{ common::{errors::*, types::*}, data::a_pool::* };

#[openbrush::wrapper]
pub type TreasuryRef = dyn TreasuryController + AccessControl ;

#[openbrush::trait_definition]
pub trait TreasuryController {
     
    #[ink(message)]
    fn deposit_reward_and_or_me(&mut self, reward:AccountId, reward_amount:Balance, me_amount:Balance, brand_id: BRAND_ID_TYPE, requestor: AccountId, metadata: Option<String>) -> Result<bool, ProtocolError>;
  

    #[ink(message)]
    fn receive_cai(&mut self, me_amount:Balance, brand_id: BRAND_ID_TYPE, requestor: AccountId, metadata: Option<String>  ) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn withdraw_reward_and_or_me(&mut self, reward:AccountId, reward_amount:Balance, me_amount:Balance, brand_id: BRAND_ID_TYPE, to: AccountId, requestor: AccountId) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn top_up_pool_with_reward_and_or_me(&mut self, reward:AccountId, pool_id: AccountId, reward_amount:Balance, me_amount:Balance, brand_id: BRAND_ID_TYPE, requestor: AccountId, metadata: Option<String>) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn pay_for_some_costs(&mut self, reward:AccountId, pool_id: AccountId, reward_amount:Balance, me_amount:Balance, brand_id: BRAND_ID_TYPE, requestor: AccountId, metadata: Option<String>) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn set_reward_notify_limit(&mut self, reward:AccountId, new_notify_limit:Balance, requestor: AccountId) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn get_reward_notify_limit(&mut self, reward:AccountId, requestor: AccountId) -> Result<Balance, ProtocolError>;


    #[ink(message)]
    fn set_me_notify_limit(&mut self, new_notify_limit:Balance, requestor: AccountId) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn get_me_notify_limit(&mut self, requestor: AccountId) -> Result<Balance, ProtocolError>;



}