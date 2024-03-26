#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(AccessControl)]
#[openbrush::contract]
mod services {

    use global::{controllers::services::customers, providers::{common::roleguard::RecordStorage, data::{a_reward::RewardRecords, brand::BrandRecords, protocol::{ProtocolConfig, ProtocolRecords}}, services::{admin::{AdminImpl, BrandImpl}, customers::CustomerImpl}}};
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
        fn get_protocol_config(&self) -> Result<ProtocolConfigClone, ProtocolError> {
            AdminImpl::get_protocol_config(self)
        }

        #[ink(message)]
        fn get_protocol_records(&self) -> Result<ProtocolRecordsClone, ProtocolError> {
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
        fn create_more_rewards(&mut self, _amount: Balance, _reward_address: AccountId, _to: AccountId) -> Result<bool, ProtocolError> {
            BrandImpl::create_more_rewards(self, _amount, _reward_address, _to)
        }



    }
    


    impl Services {
       
        #[ink(constructor)]
        pub fn new() -> Self {
            Self::default()
        }


    }

   
}
