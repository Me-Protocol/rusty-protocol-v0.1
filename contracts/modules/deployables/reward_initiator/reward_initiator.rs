#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(AccessControl)]
#[openbrush::contract]
mod reward_initiator {
    use global::providers::{services::brands::BRAND_ID_TYPE, data::reward_initiator::{add_new_reward, get_all_rewards}};
    use reward::reward::RewardRef;
    use ink::ToAccountId;
    pub use global::providers::{
        data::{reward_initiator::*},
            common::roles::*,
    };
    use openbrush::{
        contracts::access_control::{*, self},
        traits::{ Storage },
    };
    use ink::{ prelude::vec::Vec};
    use ink::env;


  
    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct RewardInitiator {
        #[storage_field]
        pub reward_initiator_storage: RewardInitiatorStorage,

         #[storage_field]
        pub access: access_control::Data,
    }

    impl RewardInitiator {

        #[ink(message)]
        pub fn create_new_reward(
            &mut self,
            brand: AccountId,
            name: Option<String>,
            symbol: Option<String>,
            decimal: u8,
            total_supply: Balance, 
            salt_bytes: Vec<u8>, 
            brand_id: BRAND_ID_TYPE
        ) -> AccountId  {
            let hash = get_hash(self);

            let new_reward =  RewardRef::new(brand, name, symbol, decimal, total_supply)
            .endowment(0)
            .code_hash(hash)
            .salt_bytes(&salt_bytes)
            .instantiate();

            let reward_address =  new_reward.to_account_id();
            
            update_brand_reward(self, brand_id,reward_address);

            add_new_reward(self, reward_address);

            reward_address

        }


        #[ink(message)]
        pub fn update_pool_hash(&mut self, hash: Hash)-> bool{
             update_hash(self, hash);
             true
         }

         #[ink(message)]
         pub fn get_pool_hash(&mut self) -> Hash {
            get_hash(self)
         }

         #[ink(message)]
         pub fn get_all_brand_rewards( &self) -> Vec<AccountId> {
            get_all_rewards(self).to_vec()
         }

         #[ink(message)]
         pub fn get_brand_reward(&mut self, brand: BRAND_ID_TYPE) ->AccountId{
            get_brand_reward(self, brand)
         }

    }


    impl RewardInitiator {

        #[ink(constructor)]
        pub fn new(hash: Hash) -> Self {
            let mut instance = Self::default();

            let caller = instance.env().caller();

            access_control::InternalImpl::_init_with_admin(&mut instance, Some(caller));

            access_control::InternalImpl::_setup_role(&mut instance, PROTOCOL, Some(caller));

            update_hash(&mut instance, hash);

            instance
        }


       


    }

   
}
