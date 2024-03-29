use openbrush::{ traits::{ AccountId } };
use openbrush::traits::Storage;
use ink::{ storage::traits::StorageLayout };
use crate::providers::common::database::*;

#[openbrush::trait_definition]
pub trait ContextTrait {
    
    fn sender(&mut self) -> AccountId;

}

#[derive(Debug, Clone, Copy)]
#[openbrush::storage_item(RESERVED)]
pub struct Context {
    
}

impl <T: Storage<Context>>ContextTrait for T{
    default fn sender(
        &mut self,
    ) -> AccountId {
        Self::env().caller()   
     }
}

impl Default for Context {
    fn default() -> Self {
        Self {  }
    }
}