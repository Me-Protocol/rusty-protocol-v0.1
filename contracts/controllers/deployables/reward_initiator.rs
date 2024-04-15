use openbrush::{
    contracts::traits::{ access_control::*, psp22::* },
    traits::{ AccountId, Balance },
};
use openbrush::traits::String;

use ink::{ prelude::vec::Vec };
use ink::primitives::Hash;

use crate::providers::{ common::{ errors::*, types::* }, data::a_pool::* };

#[openbrush::wrapper]
pub type RewardInitiatorRef = dyn RewardInitiatorController + AccessControl;


#[openbrush::trait_definition]
pub trait RewardInitiatorController {

    #[ink(message)]
    fn create_new_reward(
        &mut self,
        brand: AccountId,
        name: Option<String>,
        symbol: Option<String>,
        decimal: u8,
        total_supply: Balance, 
        salt_bytes: Vec<u8>, 
        brand_id: BRAND_ID_TYPE
    ) -> Result<AccountId, ProtocolError> ;


    #[ink(message)]
    fn update_pool_hash(&mut self, hash: Hash)-> Result<bool, ProtocolError>;

    #[ink(message)]
    fn get_reward_hash(&mut self) -> Hash;

    #[ink(message)]
    fn get_all_brand_rewards( &self) -> Vec<AccountId>;


}
