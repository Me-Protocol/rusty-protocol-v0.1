#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(AccessControl)]
#[openbrush::contract]
mod services {

    use global::{controllers::services::customers, providers::{data::{a_reward::RewardRecords, brand::BrandRecords, protocol::{ProtocolConfig, ProtocolRecords}}, services::customers::CustomerImpl}};
    use openbrush::{
        contracts::access_control::{*, self},
        traits::Storage,
    };

    pub use global::providers::services::{customers::*, admin::*};


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
        
    }
    


    impl Services {
       
        #[ink(constructor)]
        pub fn new() -> Self {
            Self::default()
        }


    }

   
}
