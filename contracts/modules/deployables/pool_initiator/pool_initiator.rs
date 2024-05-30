#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(AccessControl)]
#[openbrush::contract]
pub mod pool_initiator {

    use global::providers::{data::pool_initiator::{*},services::payment::ProtocolError, common::types::BRAND_ID_TYPE};
    use pool::pool::PoolRef;
    use ink::ToAccountId;
    pub use global::providers::{
        data::{a_pool::*},
        deployables::{a_pool::{ *, PoolSetUpConfig, PoolConfig, POOL_ADMIN, POOL_MANAGER, PoolImpl }, bounty::{OPEN_REWARDS_MANAGER, OPEN_REWARDS_ADMIN}},
    };
    use openbrush::{
        contracts::access_control::{*, self},
        traits::{ Storage }, modifiers,
    };
    use ink::prelude::vec::Vec;
    

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct PoolInitiator {
        #[storage_field]
        pub pool_initiator_storage: PoolInitiatorStorage,

        #[storage_field]
        pub access: access_control::Data,
    }

    impl PoolInitiator {


        #[ink(message)]
        #[modifiers(only_role(PROTOCOL))]
        pub fn create_new_pool(
            &mut self,
            reward: AccountId, 
            me_token: AccountId,  
            config: PoolSetUpConfig,
            salt_bytes: Vec<u8>, 
            brand: BRAND_ID_TYPE
        ) -> Result<AccountId, ProtocolError>  {
            let hash = get_hash(self);

            let new_pool=  PoolRef::new(reward, me_token, config)
            .endowment(0)
            .code_hash(hash)
            .salt_bytes(&salt_bytes)
            .instantiate();

            let pool_address =  new_pool.to_account_id();
            
            update_brand_pool(self, pool_address,brand);

            Ok(pool_address)
        }

        #[ink(message)]
        #[modifiers(only_role(PROTOCOL))]
        pub fn update_pool_hash(&mut self, hash: Hash)-> Result<bool, ProtocolError>{
             update_hash(self, hash);
             Ok(true)
         }

         #[ink(message)]
         pub fn get_pool_hash(&mut self) -> Hash {
            get_hash(self)
         }

         #[ink(message)]
         pub fn get_brand_pool(&mut self, brand: BRAND_ID_TYPE) ->AccountId{
            get_brand_pool(self, brand)
         }
     
         

 
    }



    impl PoolInitiator {
     
        #[ink(constructor)]
        pub fn new( hash: Hash) -> Self {
           let mut instance = Self::default();

           let caller = instance.env().caller();

           access_control::InternalImpl::_init_with_admin(&mut instance, Some(caller));

           access_control::InternalImpl::_setup_role(&mut instance, PROTOCOL, Some(caller));

           update_hash(&mut instance, hash);

           instance
        }

    }

   
}
