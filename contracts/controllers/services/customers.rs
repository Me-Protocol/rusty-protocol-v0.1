use openbrush::{
    contracts::traits::{ access_control::*, psp22::*, psp34::*, pausable::* },
    traits::{ AccountId, Balance, String },
};

use crate::providers::{ common::errors::*, data::{ a_reward::*, brand::*, a_pool::* } };

#[openbrush::wrapper]
pub type CustomerRef = dyn CustomerController;

#[openbrush::trait_definition]
pub trait CustomerController {
  
    #[ink(message)]
    fn spend_rewards_on_issuing_brand(&mut self, reward: AccountId, amount: Balance) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn spend_rewards_on_other_brand(&mut self, reward_at_hand: AccountId, targeted_reward:AccountId, amount_of_reward_at_hand: Balance, expected_amount_of_targetted_reward: Balance) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn exchange_brand_rewards(&mut self, reward_at_hand: AccountId, targeted_reward:AccountId, amount_of_reward_at_hand: Balance, expected_amount_of_targetted_reward: Balance, to: AccountId) -> Result<bool, ProtocolError>;

}