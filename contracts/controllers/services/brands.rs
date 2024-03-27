use openbrush::{
    contracts::traits::{ access_control::*, psp22::*, psp34::*, pausable::* },
    traits::{ AccountId, Balance, String },
};

use crate::providers::{ common::{errors::*, types::BRAND_ID_TYPE}, data::{ a_pool::*, a_reward::*, brand::* } };

#[openbrush::wrapper]
pub type BrandRef = dyn BrandController + AccessControl;

#[openbrush::trait_definition]
pub trait BrandController {

    #[ink(message)]
    fn create_more_rewards(&mut self, _amount: Balance, _reward_address: AccountId, _to: AccountId) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn update_brand_details(
        &mut self,
        brand_details: EditableBrandDetails,
        ignore_default: bool
    ) -> Result<bool, ProtocolError> ;

    #[ink(message)]
    fn update_brand_details_by_brand_id(
        &mut self,
        brand_details: EditableBrandDetails,
        ignore_default: bool,
        brand_id: BRAND_ID_TYPE
    ) -> Result<bool, ProtocolError> ;

    #[ink(message)]
    fn update_brand_config(
        &mut self,
        brand_config: GlobalBrandConfig,
        ignore_default: bool
    ) -> Result<bool, ProtocolError> ;

    #[ink(message)]
    fn update_brand_config_by_brand_id(
        &mut self,
        brand_config: GlobalBrandConfig,
        ignore_default: bool,
        brand_id: BRAND_ID_TYPE
    ) -> Result<bool, ProtocolError> ;

    #[ink(message)]
    fn update_reward_config(
        &mut self,
        reward: AccountId,
        reward_config: RewardConfig,
        ignore_default: bool
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn update_reward_details(
        &mut self,
        reward: AccountId,
        reward_details: EditableRewardDetails,
        ignore_default: bool
    ) -> Result<bool, ProtocolError> ;

    #[ink(message)]
    fn set_bounty_trigger_limit(
        &mut self,
        reward: AccountId,
        trigger_limit: Balance
    ) -> Result<bool, ProtocolError> ;

    #[ink(message)]
    fn withdraw_rewards_from_bounty_pool_to_treasury(
        &mut self, 
        reward: AccountId,
        amount: Balance
    ) -> Result<bool, ProtocolError>;

    
    #[ink(message)]
    fn add_liquidity_for_open_rewards (
        &mut self,
        reward: AccountId,
        reward_amount: Balance,
        me_amount: Balance
    ) -> Result<bool, ProtocolError>;

    fn add_liquidity_for_open_rewards_from_treasury_add_start_pool(
        &mut self,
        reward: AccountId,
        reward_amount: Balance,
        me_amount: Balance
    ) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn add_liquidity_for_open_rewards_from_treasury (&mut self, reward: AccountId, reward_amount: Balance, me_amount: Balance) -> Result<bool, ProtocolError> ;

    #[ink(message)]
    fn withdraw_open_rewards_liquidity_to_treasury(&mut self, reward: AccountId, liquidity_position: Id, reward_amount: Balance, me_amount: Balance) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn update_r_optimal (&mut self, reward: AccountId, new_r_optimal: Balance) -> Result<bool, ProtocolError> ;

    #[ink(message)]
    fn fund_bounty_pool(
        &mut self,
        reward: AccountId,
        amount: Balance
    ) -> Result<bool, ProtocolError> ;

    #[ink(message)]
    fn integrate_existing_reward(
        &mut self,
        reward: AccountId,
        reward_description_link: Option<String>,
        read_t_and_c: bool
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn change_brand_main_account(&mut self, _new_account: AccountId, requestor: AccountId) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn change_optimal_valuation(
        &mut self,
        reward: AccountId,
        new_optimal_valuation: u128,
        auto_resume_conversations: bool
    ) -> Result<bool, ProtocolError> ;

    #[ink(message)]
    fn update_pool_configuration(
        &mut self,
        reward: AccountId,
        editable_pool_config: EditablePoolConfig,
        ignore_default: bool
    ) -> Result<bool, ProtocolError> ;

    #[ink(message)]
    fn activate_open_rewards(&mut self, reward: AccountId) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn pause_open_rewards(&mut self, reward: AccountId) -> Result<bool, ProtocolError> ;

    #[ink(message)]
    fn resume_open_rewards(&mut self, reward: AccountId) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn get_brand_config_by_address (
        &self,
        brand_address: AccountId
    ) -> Result<BrandDetails, ProtocolError>;

    #[ink(message)]
    fn get_brand_config_by_id (
        &self,
        brand_id: BRAND_ID_TYPE
    ) -> Result<BrandDetails, ProtocolError>;

    #[ink(message)]
    fn top_up_treasury_balances(
        &mut self,
        reward: AccountId,
        reward_amount: Balance,
        me_amount: Balance
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn withdraw_treasury_balances(
        &mut self,
        reward: AccountId,
        reward_amount: Balance,
        me_amount: Balance,
        to: AccountId
    ) -> Result<bool, ProtocolError>;

}