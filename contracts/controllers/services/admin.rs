use openbrush::{
    contracts::traits::{ access_control::*, psp22::*, psp34::*, pausable::* },
    traits::{ AccountId, Balance, String },
};

use crate::providers::{ common::{errors::*, types::*}, data::{ a_reward::*, brand::*, a_pool::*, protocol::*, treasury::* } };

#[openbrush::wrapper]
pub type AdminRef = dyn AdminController + AccessControl;

#[openbrush::trait_definition]
pub trait AdminController {

    #[ink(message)]
    fn initialize_protocol(
        &mut self,
        protocol_config: EditableProtocolConfig,
        treasury_me_notify_limit: Balance,
        ignore_default: bool
    ) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn update_protocol_config(
        &mut self,
        protocol_config: EditableProtocolConfig,
        ignore_default: bool
    ) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn update_protocol_records(
        &mut self,
        protocol_records: EditableProtocolRecords,
        ignore_default: bool
    ) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn update_treasury_records(
        &mut self,
        treasury_records: EditableTreasuryRecords,
        ignore_default: bool
    ) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn register_brand(
        &mut self,
        brand_name: Option<String>,
        brand_online_presence: Option<String>,
        brand_account:AccountId,
    ) -> Result<(), ProtocolError>;


    #[ink(message)]
    fn integrate_existing_reward_for_brand(
        &mut self,
        brand: BRAND_ID_TYPE,
        reward_address: AccountId,
        reward_description_link: Option<String>,
        read_t_and_c: bool
    ) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn update_global_brand_config_for_brand(
        &mut self,
        brand: BRAND_ID_TYPE,
        brand_config: GlobalBrandConfig,
        ignore_default: bool
    ) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn update_reward_config_for_brand(
        &mut self,
        reward_address: AccountId,
        reward_config: RewardConfig,
        ignore_default: bool
    ) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn update_details_for_brand(
        &mut self,
        brand:BRAND_ID_TYPE,
        brand_details: EditableBrandDetails,
        ignore_default: bool
    ) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn update_reward_details_for_brand(
        &mut self,
        reward: AccountId,
        reward_details: EditableRewardDetails,
        ignore_default: bool
    ) -> Result<bool, ProtocolError>;



    #[ink(message)]
    fn add_bounty_manager_for_brand(
        &mut self,
        reward_address: AccountId,
        bounty_manager: AccountId
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn remove_bounty_manager_for_brand(
        &mut self,
        reward_address: AccountId,
        bounty_manager: AccountId
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn add_pool_manager_for_brand(
        &mut self,
        reward_address: AccountId,
        pool_manager: AccountId
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn remove_pool_manager_for_brand(
        &mut self,
        reward_address: AccountId,
        pool_manager: AccountId
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn set_bounty_trigger_limit_for_brand(
        &mut self,
        reward_address: AccountId,
        trigger_limit: Balance
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn fund_bounty_pool_for_brand(
        &mut self,
        reward_address: AccountId,
        amount: Balance
    ) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn change_optimal_valuation_for_brand(
        &mut self,
        reward_address: AccountId,
        new_optimal_valuation: u128,
        auto_start_conversations: bool
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn update_pool_configuration_for_brand(
        &mut self,
        reward_address: AccountId,
        editable_pool_config: EditablePoolConfig,
        ignore_default: bool
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn activate_open_rewards_for_brand(&mut self, reward_address: AccountId) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn pause_open_rewards_for_brand(&mut self, reward_address: AccountId) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn resume_open_rewards_for_brand(&mut self, reward_address: AccountId) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn top_up_pool_balances_for_brand(
        &mut self,
        reward_address: AccountId,
        reward_amount: Balance,
        me_amount: Balance
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn reduce_pool_balances_for_brand(
        &mut self,
        reward_address: AccountId,
        position: u128,
        reward_amount: Balance,
        me_amount: Balance
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn top_up_treasury_balances_for_brand(
        &mut self,
        reward_address: AccountId,
        reward_amount: Balance,
        me_amount: Balance
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn withdraw_treasury_balances_for_brand(
        &mut self,
        reward_address: AccountId,
        reward_amount: Balance,
        me_amount: Balance,
        to: AccountId
    ) -> Result<bool, ProtocolError>;

}