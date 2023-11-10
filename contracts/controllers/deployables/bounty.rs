use openbrush::{
    contracts::traits::{ access_control::*, psp22::* },
    traits::{ AccountId, Balance },
};

use ink::{ prelude::vec::Vec };

use crate::providers::{ common::errors::*, data::a_pool::* };

#[openbrush::wrapper]
pub type BountyRef = dyn BountyController + AccessControl;

#[openbrush::trait_definition]
pub trait BountyController {
    #[ink(message)]
    fn deposit_bounty(
        &mut self,
        reward: AccountId,
        amount: Balance,
        requestor: AccountId
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn withdraw_bounty(
        &mut self,
        reward: AccountId,
        amount: Balance,
        requestor: AccountId,
        to: AccountId
    ) -> Result<bool, ProtocolError>;

    // #[ink(message)]
    // fn distribute_bounty(&mut self, reward:AccountId, amount:Balance, requestor: AccountId) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn set_trigger_limit(
        &mut self,
        reward: AccountId,
        new_trigger_limit: u128,
        requestor: AccountId
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn get_trigger_limit(
        &mut self,
        reward: AccountId,
        requestor: AccountId
    ) -> Result<u128, ProtocolError>;

    fn get_me(&mut self)-> Result<AccountId, ProtocolError>;
}