
use openbrush::{
    contracts::access_control::*, traits::{  AccountId, Storage, String}
};

use scale::{Decode, Encode};
use ink::{env::hash::Keccak256, prelude::{collections::BTreeMap, vec::Vec}, storage::Mapping};
use ink::env::{hash, hash_bytes};

use super::{errors::ProtocolError, types::BRAND_ID_TYPE, validator::is_empty};


#[derive(Debug)]
#[openbrush::storage_item(PAYMENT_STATE)]
pub struct RecordStorage {
    records: BTreeMap<RoleType, AccessData>,
}

#[derive(scale::Encode, scale::Decode, Debug,)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo)
)]
pub struct AccessData {
   pub admin_access_key: RoleType,
   pub members: BTreeMap<AccountId, bool>,
}


pub fn is_authorized<T> (instance: &mut T, access_key: RoleType, account: AccountId) -> bool
where T: Storage<RecordStorage>
{
     *instance.data::<RecordStorage>().records.get(&access_key).unwrap().members.get(&account).unwrap()
   
}

pub fn ensure_account_is_authorized<T> (instance: &mut T, target: BRAND_ID_TYPE, seeds: Vec<RoleType>, account: AccountId, brand_id: BRAND_ID_TYPE) -> Result<bool, ProtocolError>
    where T: Storage<RecordStorage>
{
   
    if seeds.len() > 5  { 
        return Err(ProtocolError::AccountAlreadyPoolManager);
    }
    if (!is_empty(brand_id)) {
        if target == brand_id{
            return Ok(true);
        }
    }

    for seed in seeds {
        // let access_key = syn
    }
    

    Ok(true)
}

pub fn synthesis_acces_key_for_brand(brand: BRAND_ID_TYPE, seed: RoleType) -> RoleType {
    let seed_bytes = seed.to_le_bytes();
    let combined_bytes: Vec<u8> = [&brand[..], &seed_bytes[..]].concat();
    let hash = hash_keccak_256(&combined_bytes);
    let access_key_u32 = u32::from_le_bytes(hash[..4].try_into().unwrap());
    access_key_u32
}



pub fn synthesize_admin_and_access_keys_for_open_rewards(
    admin: AccountId,
    target: AccountId,
    seed: RoleType
) -> (RoleType, RoleType) {
 let admin_key = synthesize_admin_key_for_open_rewards(admin, seed);
 let access_key = synthesize_access_key_for_open_rewards(target, seed);
 return (admin_key, access_key);
}

fn bytes_to_string(bytes: &[u8]) -> String {
    String::from_utf8_lossy(bytes).to_string()
}


pub fn hash_keccak_256(input: &[u8]) -> [u8; 32] {
    let mut output = <hash::Keccak256 as hash::HashOutput>::Type::default();
    hash_bytes::<hash::Keccak256>(input, &mut output);
    output
}

pub fn synthesize_access_key_for_open_rewards(target:AccountId, seed:RoleType)-> RoleType{
    let target_bytes = target.encode();
    let seed_bytes = seed.to_le_bytes();
    let combined_bytes: Vec<u8> = [&target_bytes[..], &seed_bytes[..]].concat();
    let hash = hash_keccak_256(&combined_bytes);
    let access_key_u32 = u32::from_le_bytes(hash[..4].try_into().unwrap());

    access_key_u32
}

pub fn synthesize_admin_key_for_open_rewards(admin:AccountId, seed:RoleType)-> RoleType{
    let admin_bytes = admin.encode();
    let seed_bytes = seed.to_le_bytes();
    let combined_bytes: Vec<u8> = [&admin_bytes[..], &seed_bytes[..]].concat();
    let hash = hash_keccak_256(&combined_bytes);
    let access_key_u32 = u32::from_le_bytes(hash[..4].try_into().unwrap());

    access_key_u32
}


