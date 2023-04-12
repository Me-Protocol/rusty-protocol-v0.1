use openbrush::{
    contracts::traits::{ access_control::*, psp22::* },
    traits::{ AccountId, Balance },
};

use crate::providers::{ common::errors::* };

#[openbrush::wrapper]
pub type APoolRef = dyn AccessControl + PSP22;

#[openbrush::trait_definition]
pub trait PoolController {
    #[ink(message)]
    fn pause_conversations(&mut self) -> Result<(), ProtocolError>;

    #[ink(message)]
    fn resume_conversations(&mut self) -> Result<(), ProtocolError>;

    #[ink(message)]
    fn give_pool_tokens_for_new_position(
        &mut self,
        pool_numerator_amount: Balance,
        pool_divisor_amount: Balance,
        to: AccountId
    ) -> Result<(), ProtocolError>;

    #[ink(message)]
    fn give_more_pool_tokens_for_existing_position(
        &mut self,
        position_id: u128,
        pool_numerator_amount: Balance,
        pool_divisor_amount: Balance,
        requestor: AccountId,
        to: AccountId
    ) -> Result<(), ProtocolError>;

    #[ink(message)]
    fn withdraw_assets_from_position(
        &mut self,
        position_id: u128,
        pool_numerator_amount: Balance,
        pool_divisor_amount: Balance,
        requestor: AccountId,
        to: AccountId
    ) -> Result<(), ProtocolError>;

    #[ink(message)]
    fn add_pool_manager(&mut self, new_pool_manager: AccountId) -> Result<(), ProtocolError>;

    #[ink(message)]
    fn remove_pool_manager(&mut self, pool_manager: AccountId) -> Result<(), ProtocolError>;

    #[ink(message)]
    fn provide_pool_ratios(&self) -> (u128, u128);

    #[ink(message)]
    fn provide_pool_addresses(&self) -> (AccountId, AccountId, AccountId);

    #[ink(message)]
    fn provide_pool_state(
        &self
    ) -> (bool, AccountId, AccountId, AccountId, Balance, Balance, Balance, u64);

    fn provide_pool_config(
        &self
    ) -> (Balance, u128, u128, Balance, Balance, Balance, Balance, u128, bool);

    #[ink(message)]
    fn initiate_outgoing_conversation(
        &mut self,
        reward_amount_in: Balance,
        expected_output_reward_amount: Balance,
        listener: AccountId,
        listener_r_optimal: u128,
        output_reward_receiver: AccountId,
        slippage_in_precision: u128
    ) -> Result<(), ProtocolError>;

    #[ink(message)]
    fn engage_incoming_conversation(
        &mut self,
        expected_reward_amount: Balance,
        output_reward_receiver: AccountId,
        slippage_in_precision: u128
    ) -> Result<(), ProtocolError>;
}