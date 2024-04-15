#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(AccessControl)]
#[openbrush::contract]
mod services {

    use ink::{ prelude::vec::Vec };
    use global::{controllers::services::customers, providers::{common::roleguard::RecordStorage, data::{a_reward::RewardRecords, brand::BrandRecords, protocol::{EditableProtocolConfig, EditableProtocolRecords, ProtocolConfig, ProtocolRecords}}, services::{admin::{AdminImpl, BrandImpl}, customers::CustomerImpl}}};
    use openbrush::{
        contracts::access_control::{*, self},
        traits::Storage,
    };

    pub use global::providers::services::{customers::*, admin::*};
    use global::controllers::services::admin::admincontroller_external;
    // use global::controllers::services::admin::admincontroller_external::AdminController;
    use global::controllers::services::admin::AdminController;


    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Services {

        #[storage_field]
        pub access: access_control::Data,

        #[storage_field]
        pub protocol_record: ProtocolRecords,

        #[storage_field]
        pub protocol_config: ProtocolConfig,
        
        #[storage_field]
        pub rewards_record: RewardRecords,

        #[storage_field]
        pub brands_records: BrandRecords,

        #[storage_field]
        pub record_storage: RecordStorage,  

    }


    impl  CustomerImpl for Services {}

    impl CustomerController for Services {

        #[ink(message)]
        fn spend_rewards_on_issuing_brand(&mut self, reward: AccountId, amount: Balance) -> Result<bool, ProtocolError> {
            CustomerImpl::spend_rewards_on_issuing_brand(self, reward, amount)
        }

        #[ink(message)]
        fn spend_rewards_on_other_brand(&mut self, reward_at_hand: AccountId, targeted_reward:AccountId, amount_of_reward_at_hand: Balance, expected_amount_of_targetted_reward: Balance) -> Result<bool, ProtocolError>{
            CustomerImpl::spend_rewards_on_other_brand(self, reward_at_hand, targeted_reward, amount_of_reward_at_hand, expected_amount_of_targetted_reward)
        }

        #[ink(message)]
        fn exchange_brand_rewards(&mut self, reward_at_hand: AccountId, targeted_reward:AccountId, amount_of_reward_at_hand: Balance, expected_amount_of_targetted_reward: Balance, to: AccountId) -> Result<bool, ProtocolError>{
            CustomerImpl::exchange_brand_rewards(self, reward_at_hand, targeted_reward, amount_of_reward_at_hand, expected_amount_of_targetted_reward, to)
        }
    }

    impl AdminImpl for Services {}

    impl AdminController for Services {
        
        #[ink(message)]
        fn get_protocol_config(&self) -> EditableProtocolConfig {
            AdminImpl::get_protocol_config(self)
        }

        #[ink(message)]
        fn get_protocol_records(&self) -> EditableProtocolRecords {
            AdminImpl::get_protocol_records(self)
        }

        #[ink(message)]
        fn update_protocol_configurations(&mut self, config: EditableProtocolConfig) -> Result<bool, ProtocolError> {
            AdminImpl::update_protocol_configurations(self, config)
        }

        #[ink(message)]
        fn update_protocol_records(&mut self, records: EditableProtocolRecords) -> Result<bool, ProtocolError> { 
            AdminImpl::update_protocol_records(self, records)
        }

        #[ink(message)]
        fn update_treasury_address(&mut self, address: AccountId) -> Result<bool, ProtocolError> {
            AdminImpl::update_treasury_address(self, address)
        }

        #[ink(message)]
        fn register_brand(&mut self, brand_name: Option<String>, brand_online_presence: Option<String> , brand_account: AccountId, brand_id: BRAND_ID_TYPE) -> Result<bool, ProtocolError> {
            AdminImpl::register_brand(self, brand_name, brand_online_presence, brand_account, brand_id)
        }

        #[ink(message)]
        fn get_me_address(&self) -> Result<AccountId, ProtocolError> {
           AdminImpl::get_me_address(self)
        }   
    }


    impl BrandImpl for Services {}

    impl BrandController for Services {

        #[ink(message)]
        fn update_brand_details(
            &mut self,
            brand_details: EditableBrandDetails,
            ignore_default: bool
        ) -> Result<bool, ProtocolError>  {
            BrandImpl::update_brand_details(self, brand_details, ignore_default)
        }

        #[ink(message)]
        fn update_brand_details_by_brand_id(
            &mut self,
            brand_details: EditableBrandDetails,
            ignore_default: bool,
            brand_id: BRAND_ID_TYPE
        ) -> Result<bool, ProtocolError> {
            BrandImpl::update_brand_details_by_brand_id(self, brand_details, ignore_default, brand_id)
        }

        #[ink(message)]
        fn update_brand_config(
            &mut self,
            brand_config: GlobalBrandConfig,
            ignore_default: bool
        ) -> Result<bool, ProtocolError> {
            BrandImpl::update_brand_config(self, brand_config, ignore_default)
        }

        #[ink(message)]
        fn update_brand_config_by_brand_id(
            &mut self,
            brand_config: GlobalBrandConfig,
            ignore_default: bool,
            brand_id: BRAND_ID_TYPE
        ) -> Result<bool, ProtocolError> {
            BrandImpl::update_brand_config_by_brand_id(self, brand_config, ignore_default, brand_id)
        }

        #[ink(message)]
        fn update_reward_config(
            &mut self,
            reward: AccountId,
            reward_config: RewardConfig,
            ignore_default: bool
        ) -> Result<bool, ProtocolError> {
            BrandImpl::update_reward_config(self, reward, reward_config, ignore_default)
        }

        #[ink(message)]
        fn update_reward_details(
            &mut self,
            reward: AccountId,
            reward_details: EditableRewardDetails,
            ignore_default: bool
        ) -> Result<bool, ProtocolError> {
            BrandImpl::update_reward_details(self, reward, reward_details, ignore_default)
        }

        #[ink(message)]
        fn set_bounty_trigger_limit(
            &mut self,
            reward: AccountId,
            trigger_limit: Balance
        ) -> Result<bool, ProtocolError> {
            BrandImpl::set_bounty_trigger_limit(self, reward, trigger_limit)
        }

        #[ink(message)]
        fn withdraw_rewards_from_bounty_pool_to_treasury(
            &mut self, 
            reward: AccountId,
            amount: Balance
        ) -> Result<bool, ProtocolError> {
            BrandImpl::withdraw_rewards_from_bounty_pool_to_treasury(self, reward, amount)
        }

        #[ink(message)]
        fn add_liquidity_for_open_rewards (
            &mut self,
            reward: AccountId,
            reward_amount: Balance,
            me_amount: Balance
        ) -> Result<bool, ProtocolError> {
            BrandImpl::add_liquidity_for_open_rewards(self, reward, reward_amount, me_amount)
        }

        fn add_liquidity_for_open_rewards_from_treasury_add_start_pool(
            &mut self,
            reward: AccountId,
            reward_amount: Balance,
            me_amount: Balance
        ) -> Result<bool, ProtocolError> {
            BrandImpl::add_liquidity_for_open_rewards_from_treasury_add_start_pool(self, reward, reward_amount, me_amount)
        }

        #[ink(message)]
        fn add_liquidity_for_open_rewards_from_treasury (&mut self, reward: AccountId, reward_amount: Balance, me_amount: Balance) -> Result<bool, ProtocolError> {
            BrandImpl::add_liquidity_for_open_rewards_from_treasury(self, reward, reward_amount, me_amount)
        }    

        #[ink(message)]
        fn withdraw_open_rewards_liquidity_to_treasury(&mut self, reward: AccountId, liquidity_position: Id, reward_amount: Balance, me_amount: Balance) -> Result<bool, ProtocolError>{
            BrandImpl::withdraw_open_rewards_liquidity_to_treasury(self, reward, liquidity_position, reward_amount, me_amount)
        }    

        #[ink(message)]
        fn update_r_optimal (&mut self, reward: AccountId, new_r_optimal: Balance) -> Result<bool, ProtocolError>{
            BrandImpl::update_r_optimal(self, reward, new_r_optimal)
        }    

        #[ink(message)]
        fn fund_bounty_pool(
            &mut self,
            reward: AccountId,
            amount: Balance
        ) -> Result<bool, ProtocolError> {
            BrandImpl::fund_bounty_pool(self, reward, amount)
        }    

        #[ink(message)]
        fn integrate_existing_reward(
            &mut self,
            reward: AccountId,
            reward_description_link: Option<String>,
            read_t_and_c: bool
        ) -> Result<bool, ProtocolError> {
            BrandImpl::integrate_existing_reward(self, reward, reward_description_link, read_t_and_c)
        }

        #[ink(message)]
        fn change_brand_main_account(&mut self, _new_account: AccountId, requestor: AccountId) -> Result<bool, ProtocolError>{
            BrandImpl::change_brand_main_account(self, _new_account, requestor)
        }    

        #[ink(message)]
        fn change_optimal_valuation(
            &mut self,
            reward: AccountId,
            new_optimal_valuation: u128,
            auto_resume_conversations: bool
        ) -> Result<bool, ProtocolError> {
            BrandImpl::change_optimal_valuation(self, reward, new_optimal_valuation, auto_resume_conversations)
        }

        #[ink(message)]
        fn update_pool_configuration(
            &mut self,
            reward: AccountId,
            editable_pool_config: EditablePoolConfig,
            ignore_default: bool
        ) -> Result<bool, ProtocolError> {
            BrandImpl::update_pool_configuration(self, reward, editable_pool_config, ignore_default)
        }

        #[ink(message)]
        fn activate_open_rewards(&mut self, reward: AccountId) -> Result<bool, ProtocolError>{
            BrandImpl::activate_open_rewards(self, reward)
        }

        #[ink(message)]
        fn pause_open_rewards(&mut self, reward: AccountId) -> Result<bool, ProtocolError>{
            BrandImpl::pause_open_rewards(self, reward)
        }    

        #[ink(message)]
        fn resume_open_rewards(&mut self, reward: AccountId) -> Result<bool, ProtocolError>{
            BrandImpl::resume_open_rewards(self, reward)
        }    

        #[ink(message)]
        fn get_brand_config_by_address (
            &self,
            brand_address: AccountId
        ) -> Result<BrandDetails, ProtocolError> {
            BrandImpl::get_brand_config_by_address(self, brand_address)
        }

        #[ink(message)]
        fn get_brand_config_by_id (
            &self,
            brand_id: BRAND_ID_TYPE
        ) -> Result<BrandDetails, ProtocolError>{
            BrandImpl::get_brand_config_by_id(self, brand_id)
        }

        #[ink(message)]
        fn top_up_treasury_balances(
            &mut self,
            reward: AccountId,
            reward_amount: Balance,
            me_amount: Balance
        ) -> Result<bool, ProtocolError>{
            BrandImpl::top_up_treasury_balances(self, reward, reward_amount, me_amount)
        }

        #[ink(message)]
        fn withdraw_treasury_balances(
            &mut self,
            reward: AccountId,
            reward_amount: Balance,
            me_amount: Balance,
            to: AccountId
        ) -> Result<bool, ProtocolError>{
            BrandImpl::withdraw_treasury_balances(self, reward, reward_amount, me_amount, to)
        }

        #[ink(message)]
        fn create_new_reward(&mut self,reward_initiator: AccountId, reward_name: Option<String>, reward_symbol: Option<String>, reward_description_link:Option<String>, reward_type:u8, initial_reward_supply:Balance, salt_bytes: Vec<u8>,brand_id: BRAND_ID_TYPE, requestor: AccountId) -> Result<bool, ProtocolError>{

            BrandImpl::create_new_reward(self, reward_initiator, reward_name, reward_symbol, reward_description_link, reward_type, initial_reward_supply, salt_bytes, brand_id, requestor)
        }

        #[ink(message)]
        fn get_reward_details ( &self, requestor: AccountId) -> RewardDetails{

            BrandImpl::get_reward_details(self, requestor)
        }

    }
    


    impl Services {
       
        #[ink(constructor)]
        pub fn new() -> Self {

            let mut instance = Self::default(); 
           
            let caller = instance.env().caller();

            access_control::InternalImpl::_init_with_admin(&mut instance, Some(caller));

            access_control::InternalImpl::_setup_role(&mut instance,PROTOCOL_ADMIN, Some(caller));

            access_control::InternalImpl::_setup_role(&mut instance,ONBOARDING_MANAGER, Some(caller));

            RewardConfig::default();

            instance
        }


    }

   
}
