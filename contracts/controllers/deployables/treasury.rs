use openbrush::{
    contracts::traits::{ access_control::*, psp22::*},
    traits::{ AccountId, Balance },
};

use ink::{prelude::vec::Vec};

use crate::providers::{ common::errors::*, data::a_pool::* };

#[openbrush::wrapper]
pub type TresuryRef = dyn TreasuryController + AccessControl ;

#[openbrush::trait_definition]
pub trait TreasuryController {
     
    #[ink(message)]
    fn deposit_reward(&mut self, reward:AccountId, amount:Balance, requestor: AccountId) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn withdraw_reward(&mut self, reward:AccountId, amount:Balance, requestor: AccountId) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn set_notify_limit(&mut self, reward:AccountId, requestor: AccountId) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn get_notify_limit(&mut self, reward:AccountId, requestor: AccountId) -> Result<bool, ProtocolError>;

}