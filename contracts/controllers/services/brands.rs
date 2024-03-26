use openbrush::{
    contracts::traits::{ access_control::*, psp22::*, psp34::*, pausable::* },
    traits::{ AccountId, Balance, String },
};

use crate::providers::{ common::errors::*, data::{ a_reward::*, brand::*, a_pool::* } };

#[openbrush::wrapper]
pub type BrandRef = dyn BrandController + AccessControl;

#[openbrush::trait_definition]
pub trait BrandController {
    // #[ink(message)]
    // fn register(
    //     &mut self,
    //     name: Option<String>,
    //     online_presence: Option<String>
    // ) -> Result<(), ProtocolError>;

    // #[ink(message)]
    // fn create_new_reward(&mut self, reward_name: Option<String>, reward_symbol: Option<String>, reward_description_link:Option<String>, reward_type:u8, initial_reward_supply:Balance, use_global_config:bool) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn update_global_brand_config(
        &mut self,
        brand_config: GlobalBrandConfig,
        ignore_default: bool
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn update_reward_config(
        &mut self,
        reward_address: AccountId,
        reward_config: RewardConfig,
        ignore_default: bool
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn update_details(
        &mut self,
        brand_details: EditableBrandDetails,
        ignore_default: bool
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn update_reward_details(
        &mut self,
        reward: AccountId,
        reward_details: EditableRewardDetails,
        ignore_default: bool
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn add_bounty_manager(
        &mut self,
        reward_address: AccountId,
        bounty_manager: AccountId
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn remove_bounty_manager(
        &mut self,
        reward_address: AccountId,
        bounty_manager: AccountId
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn add_pool_manager(
        &mut self,
        reward_address: AccountId,
        pool_manager: AccountId
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn remove_pool_manager(
        &mut self,
        reward_address: AccountId,
        pool_manager: AccountId
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn set_bounty_trigger_limit(
        &mut self,
        reward_address: AccountId,
        trigger_limit: Balance
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn fund_bounty_pool(
        &mut self,
        reward_address: AccountId,
        amount: Balance
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn integrate_existing_reward(
        &mut self,
        reward_address: AccountId,
        reward_description_link: Option<String>,
        read_t_and_c: bool
    ) -> Result<bool, ProtocolError>;

    // #[ink(message)]
    // fn create_a_type_a_pool(&mut self, reward_address: AccountId, initial_reward_deposit:Balance, initial_me_deposit: Balance,  pool_config: PoolSetUpConfig,  use_global_config:bool, auto_start_conversations:bool) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn change_optimal_valuation(
        &mut self,
        reward_address: AccountId,
        new_optimal_valuation: u128,
        auto_start_conversations: bool
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn update_pool_configuration(
        &mut self,
        reward_address: AccountId,
        editable_pool_config: EditablePoolConfig,
        ignore_default: bool
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn activate_open_rewards(&mut self, reward_address: AccountId) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn pause_open_rewards(&mut self, reward_address: AccountId) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn resume_open_rewards(&mut self, reward_address: AccountId) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn top_up_pool_balances(
        &mut self,
        reward_address: AccountId,
        reward_amount: Balance,
        me_amount: Balance
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn reduce_pool_balances(
        &mut self,
        reward_address: AccountId,
        position: u128,
        reward_amount: Balance,
        me_amount: Balance
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn top_up_treasury_balances(
        &mut self,
        reward_address: AccountId,
        reward_amount: Balance,
        me_amount: Balance
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn withdraw_treasury_balances(
        &mut self,
        reward_address: AccountId,
        reward_amount: Balance,
        me_amount: Balance,
        to: AccountId
    ) -> Result<bool, ProtocolError>;
}