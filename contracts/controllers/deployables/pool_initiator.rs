use openbrush::{
    contracts::traits::{ access_control::*, psp22::* },
    traits::{ AccountId, Balance },
};
use openbrush::traits::String;

use ink::{ prelude::vec::Vec };
use ink::primitives::Hash;

use crate::providers::{ common::{ errors::*, types::* }, data::a_pool::* };

#[openbrush::wrapper]
pub type PoolInitiatorRef = dyn PoolInitiatorController + AccessControl;


#[openbrush::trait_definition]
pub trait PoolInitiatorController { 

    #[ink(message)]
    fn create_new_pool(  &mut self,
        reward: AccountId, 
        me_token: AccountId,  
        config: PoolSetUpConfig,
        salt_bytes: Vec<u8>, 
        brand: BRAND_ID_TYPE) ->AccountId;

    #[ink(message)]
    fn update_pool_hash(&mut self, hash: Hash) -> bool;

    #[ink(message)]
    fn get_pool_hash(&mut self) -> Hash;

    #[ink(message)]
    fn get_brand_pool(&mut self, brand: BRAND_ID_TYPE) ->AccountId;
}