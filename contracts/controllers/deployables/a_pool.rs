use openbrush::{
    contracts::traits::{ access_control::*, psp22::*, psp34::*, pausable::* },
    traits::{ AccountId, Balance },
};

use crate::providers::{ common::errors::*, data::a_pool::* };

#[openbrush::wrapper]
pub type APoolRef = dyn PoolController + AccessControl + PSP34 + Pausable;

#[openbrush::trait_definition]
pub trait PoolController {
    #[ink(message)]
    fn start_allowing_conversations(&mut self, requestor: AccountId) -> Result<u128, ProtocolError>;

    #[ink(message)]
    fn pause_conversations(&mut self, requestor: AccountId) -> Result<(), ProtocolError>;

    #[ink(message)]
    fn resume_conversations(&mut self, requestor: AccountId) -> Result<(), ProtocolError>;

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
    ) -> (bool, bool, AccountId, AccountId, AccountId, Balance, Balance, Balance, Balance, u64);

    fn provide_pool_config(
        &self
    ) -> (u128, u128, Balance, Balance, Balance, Balance, u128, bool);

    #[ink(message)]
    fn initiate_outgoing_conversation(
        &mut self,
        reward_amount_in: Balance,
        expected_output_reward_amount: Balance,
        listener: AccountId,
        listener_r_optimal: u128,
        requestor: AccountId,
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

    #[ink(message)]
    fn add_protocol_me_offset(
        &mut self,
        expected_me_offset: Balance
    ) -> Result<Balance, ProtocolError>;

    #[ink(message)]
    fn withdraw_protocol_me_offset_only_me_tokens(
        &mut self,
        me_amount_to_withdraw: Balance
    ) -> Result<Balance, ProtocolError>;

    #[ink(message)]
    fn withdraw_protocol_me_offset_with_rewards_if_need_be(
        &mut self,
        me_amount_to_withdraw: Balance
    ) -> Result<(Balance, Balance), ProtocolError>;

    #[ink(message)]
    fn forcefully_withdraw_protocol_offset_me_tokens(
        &mut self,
        me_amount_to_withdraw: Balance
    ) -> Result<Balance, ProtocolError>;

    #[ink(message)]
    fn withdraw_protocol_me_offset_withdrawable(
        &mut self,
        me_amount_to_withdraw: Balance
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn change_pool_config_except_r_optimal(
        &mut self,
        editable_config: EditablePoolConfig,
        ignore_default: bool
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn change_r_optimal(&mut self, new_r_optimal: u128) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn get_position_by_index(&self, requestor: AccountId, index: u128) -> Result<Id, ProtocolError>;

    #[ink(message)]
    fn get_all_positions(&self, requestor: AccountId) -> Result<Vec<Id>, ProtocolError>;
}