use openbrush::{
    contracts::traits::{ access_control::*, psp22::*, psp34::*, pausable::* },
    traits::{ AccountId, Balance },
};

use ink::{ prelude::vec::Vec };

use crate::providers::{ common::errors::*, data::a_pool::* };

#[openbrush::wrapper]
pub type APoolRef = dyn PoolController + AccessControl + PSP34 + Pausable;

#[openbrush::trait_definition]
pub trait PoolController {

    #[ink(message)]
    fn start_open_rewards(&mut self) -> Result<u128, ProtocolError>;

    #[ink(message)]
    fn pause_open_rewards(&mut self) -> Result<bool, ProtocolError> ;

    #[ink(message)]
    fn resume_open_rewards(&mut self) -> Result<bool, ProtocolError> ;
    
    #[ink(message)]
    fn check_open_rewards_state(&self) -> bool;
    
    #[ink(message)]
    fn record_liquidity_provided(
        &mut self,
        pool_numerator_amount: Balance,
        pool_divisor_amount: Balance,
        requestor: AccountId,
        to: AccountId
    ) -> Result<(), ProtocolError>;

    #[ink(message)]
    fn withdraw_liquidity(
        &mut self,
        position: Id,
        pool_numerator_amount: Balance,
        pool_divisor_amount: Balance,
        requestor: AccountId,
        to: AccountId
    ) -> Result<(), ProtocolError>;

    #[ink(message)]
    fn add_open_rewards_manager(&mut self, new_pool_manager: AccountId) -> Result<(), ProtocolError>;

    #[ink(message)]
    fn remove_open_rewards_manager(&mut self, pool_manager: AccountId) -> Result<(), ProtocolError>;

    #[ink(message)]
    fn get_liquidity_ratios(&self) -> (u128, u128);

    #[ink(message)]
    fn get_liquidity_ids(&self) -> (AccountId, AccountId, AccountId);

    #[ink(message)]
    fn get_open_rewards_state(
        &self
    ) -> (bool, bool, bool, AccountId, AccountId, AccountId, Balance, Balance, Balance, u64);

    #[ink(message)]
    fn get_open_rewards_configurations(&self) -> (u128, u128, Balance, Balance, Balance, Balance, u128, bool);

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
    ) -> Result<Balance, ProtocolError>;

    #[ink(message)]
    fn engage_incoming_conversation(
        &mut self,
        expected_reward_amount: Balance,
        output_reward_receiver: AccountId,
        slippage_in_precision: u128
    ) -> Result<Balance, ProtocolError>;

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

    #[ink(message)]
    fn get_position_data(
        &self,
        position: u128
    ) -> Result<(Balance, Balance), ProtocolError>;
   
    #[ink(message)]
    fn determine_needed_reward_amount_given_me_amount(&mut self, me_amount: Balance, slippage_in_precision: u128)-> Result<Balance, ProtocolError>;

    #[ink(message)]
    fn determine_optimal_needed_me_amount_given_reward_amount(&mut self, reward_amount: Balance)-> Result<Balance, ProtocolError>;

    #[ink(message)]
    fn get_r_optimal(&mut self)-> Result<Balance, ProtocolError>;

    #[ink(message)]
    fn get_balance(&self, token:AccountId, account: AccountId) -> Balance;

    #[ink(message)]
    fn check_if_is_open_rewards_manager(&self, pool_manager: AccountId) -> Result<bool, ProtocolError>;

}