use openbrush::traits::{ AccountId, Balance };
use openbrush::traits::Storage;
use ink::{ storage::{ Mapping, traits::StorageLayout } ,  prelude::vec::Vec,};
use crate::providers::common::database::*;
use crate::providers::common::types::BRAND_ID_TYPE;
use ink::primitives::Hash;
use openbrush::traits::String;

#[derive(Debug)]
#[openbrush::storage_item(REWARD_INITIATOR)]
pub struct RewardInitiatorStorage {
    pub hash: Hash,
    pub all_rewards: Vec<AccountId>,
    pub brand_reward:  Mapping<BRAND_ID_TYPE, AccountId>,
}

impl Default for RewardInitiatorStorage {
    fn default() -> Self {
        Self {
            hash: Default::default(),
            all_rewards: Vec::new(),
            brand_reward: Mapping::default(),
        }
    }
}

pub const ZERO_ADDRESS: [u8; 32] = [0u8; 32];

pub fn update_brand_reward<T>(
    instance: &mut T,
    brand: BRAND_ID_TYPE,
    reward: AccountId
)
    where T: Storage<RewardInitiatorStorage>
{
    instance.data::<RewardInitiatorStorage>().brand_reward.insert(&brand, &reward);
}

pub fn get_brand_reward<T>(instance: &mut T, brand: BRAND_ID_TYPE) -> AccountId
    where T: Storage<RewardInitiatorStorage>
{
    instance.data::<RewardInitiatorStorage>().brand_reward.get(&brand).unwrap_or(ZERO_ADDRESS.into())
}

pub fn get_all_rewards<'a, T>(instance: &'a T) -> &'a Vec<AccountId> where T: Storage<RewardInitiatorStorage>,
{
    &instance.data::<RewardInitiatorStorage>().all_rewards
}

pub fn add_new_reward<T>(instance: &mut T, reward: AccountId)  where T: Storage<RewardInitiatorStorage> {
    instance.data::<RewardInitiatorStorage>().all_rewards.push(reward)
}

pub fn get_hash<T>(instance: &mut T) -> Hash where T: Storage<RewardInitiatorStorage> {
    instance.data::<RewardInitiatorStorage>().hash
}

pub fn update_hash<T>(instance: &mut T, hash: Hash)  where T: Storage<RewardInitiatorStorage> {
    instance.data::<RewardInitiatorStorage>().hash = hash;
}
