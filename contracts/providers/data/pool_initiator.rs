use openbrush::traits::{ AccountId, Balance };
use openbrush::traits::Storage;
use ink::{ storage::{ Mapping, traits::StorageLayout } };
use crate::providers::common::database::*;
use crate::providers::common::types::BRAND_ID_TYPE;
use ink::primitives::Hash;

#[derive(Debug)]
#[openbrush::storage_item(POOL_INITIATOR)]
pub struct PoolInitiatorStorage {
    pub hash: Hash,
    pub pools:  Mapping<BRAND_ID_TYPE, AccountId>,
}

impl Default for PoolInitiatorStorage {
    fn default() -> Self {
        Self {
            hash: Default::default(),
            pools: Mapping::default(),
        }
    }
}

pub const ZERO_ADDRESS: [u8; 32] = [0u8; 32];


pub fn get_hash<T>(instance: &mut T) -> Hash where T: Storage<PoolInitiatorStorage> {
    instance.data::<PoolInitiatorStorage>().hash
}

pub fn update_hash<T>(instance: &mut T, hash: Hash)  where T: Storage<PoolInitiatorStorage> {
    instance.data::<PoolInitiatorStorage>().hash = hash;
}

pub fn update_brand_pool<T>(
    instance: &mut T,
    new_pool: AccountId,
    brand: BRAND_ID_TYPE
)
    where T: Storage<PoolInitiatorStorage>
{
    instance.data::<PoolInitiatorStorage>().pools.insert(&brand, &new_pool);
}

pub fn get_brand_pool<T>(instance: &mut T, brand: BRAND_ID_TYPE) -> AccountId
    where T: Storage<PoolInitiatorStorage>
{
    instance.data::<PoolInitiatorStorage>().pools.get(&brand).unwrap_or(ZERO_ADDRESS.into())
}
