
use openbrush::{
    contracts::access_control::*, traits::{  AccountId, Storage, String}
};

use scale::{Decode, Encode};
use ink::{env::hash::Keccak256, prelude::{collections::BTreeMap, vec::Vec}, storage::Mapping};
use ink::env::{hash, hash_bytes};

use crate::controllers::services::admin;

use super::{errors::ProtocolError, types::BRAND_ID_TYPE, validator::is_empty};
const EMPTY_ACCESS: RoleType  = 0;

#[derive(Debug)]
#[openbrush::storage_item(PAYMENT_STATE)]
pub struct RecordStorage {
    pub records: BTreeMap<RoleType, AccessData>,
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

pub fn ensure_account_is_authorized_1<T> (instance: &mut T, target: AccountId, seeds: Vec<RoleType>, account: AccountId, brand_id: BRAND_ID_TYPE) -> Result<bool, ProtocolError>
    where T: Storage<RecordStorage>
{
    if seeds.len() > 5  {
        return Err(ProtocolError::SeedsAreTooMuch);
    }

    let record = &instance.data::<RecordStorage>().records;

    if !is_empty(brand_id) {
       let (admin_access_key, access_key) = synthesize_admin_and_access_key_for_reward(brand_id, target, seeds[0]);
       if admin_access_key == record.get(&access_key).unwrap().admin_access_key {
        return Ok(true)
       }
    }

    for seed in seeds {
        let access_key = synthesize_access_key_for_reward(target, seed);
        if *record.get(&access_key).unwrap().members.get(&account).unwrap() {
            return Ok(true)
        }
    }
    Err(ProtocolError::AccountIsNotAuthorizedToMakeThisRequest)
}

pub fn ensure_account_is_authorized_2<T> (instance: &mut T, target: BRAND_ID_TYPE, seeds: Vec<RoleType>, account: AccountId, brand_id: BRAND_ID_TYPE) -> Result<bool, ProtocolError>
    where T: Storage<RecordStorage>
{

    if seeds.len() > 5 {
        return Err(ProtocolError::SeedsAreTooMuch);
    }

    let record = &instance.data::<RecordStorage>().records;
    if !is_empty(brand_id) {
        if target == brand_id {
            return Ok(true)
        }
    }
    for seed in seeds {
        let access_key = synthesize_access_key_for_brand(target, seed);
        if record.get(&access_key).unwrap().members.get(&account).is_some() {
            return Ok(true)
        }
    }

    Err(ProtocolError::AccountIsNotAuthorizedToMakeThisRequest)
}

pub fn ensure_account_is_authorized_3<T> (instance: &mut T, target: AccountId, seeds: Vec<RoleType>, account: AccountId) -> Result<bool, ProtocolError>
    where T: Storage<RecordStorage>
{

    if seeds.len() > 5 {
      return  Err(ProtocolError::SeedsAreTooMuch);
    }

    let record: &BTreeMap<u32, AccessData> = &instance.data::<RecordStorage>().records;
    let (admin_access_key, _access_key) = synthesize_admin_and_access_keys_for_open_rewards(account, target, seeds[0]);

    if admin_access_key == record.get(&_access_key).unwrap().admin_access_key {
        return Ok(true)
    }

    for seed in seeds {
        let access_key = synthesize_access_key_for_reward(target, seed);
        if record.get(&access_key).unwrap().members.get(&account).is_some() {
            return Ok(true)
        }
    }
   
    Err(ProtocolError::AccountIsNotAuthorizedToMakeThisRequest)
}

pub fn ensure_account_is_authorized_4 <T> (instance: &mut T, target: AccountId, seed: RoleType, account: AccountId , brand: BRAND_ID_TYPE) -> Result<bool, ProtocolError>
    where T: Storage<RecordStorage>
{

    let record: &BTreeMap<u32, AccessData> = &instance.data::<RecordStorage>().records;
    let (admin_key, access_key) = synthesize_admin_and_access_key_for_reward(brand, target, seed);

    if admin_key != record.get(&access_key).unwrap().admin_access_key {
        if !record.get(&access_key).unwrap().members.get(&account).is_some() {
            return  Err(ProtocolError::AccountIsNotAuthorizedToMakeThisRequest);
        }
    }

    Ok(true)
}

pub fn ensure_account_is_authorized_5 <T>(instance:&mut T, target: BRAND_ID_TYPE, seed: RoleType, account: AccountId, brand_id: BRAND_ID_TYPE) -> Result<bool, ProtocolError>
    where T: Storage<RecordStorage>

{
    let record: &BTreeMap<u32, AccessData> = &instance.data::<RecordStorage>().records;
    if brand_id != target {
        let access_key = synthesize_access_key_for_brand(target, seed);
        if !record.get(&access_key).unwrap().members.get(&account).is_some() {
            return  Err(ProtocolError::AccountIsNotAuthorizedToMakeThisRequest);
        }
    }
    Ok(true)
}


pub fn ensure_account_is_authorized_6 <T> (instance: &mut T, target: AccountId, seed: RoleType, account: AccountId) -> Result<bool, ProtocolError>
    where T: Storage<RecordStorage>
{
    let record: &BTreeMap<u32, AccessData> = &instance.data::<RecordStorage>().records;

    let (admin_access_key, access_key) = synthesize_admin_and_access_keys_for_open_rewards(account, target, seed);

    if admin_access_key == record.get(&access_key).unwrap().admin_access_key {
        return Ok(true);
    }

    if record.get(&access_key).unwrap().members.get(&account).is_some() {
        return Ok(true)
    }

    Err(ProtocolError::AccountIsNotAuthorizedToMakeThisRequest)
}

pub fn ensure_account_is_authorized_7 <T> (instance: &mut T, seed: RoleType, account: AccountId) -> Result<bool, ProtocolError>
    where T: Storage<RecordStorage>
{
    let record: &BTreeMap<u32, AccessData> = &instance.data::<RecordStorage>().records;

    let (admin_access_key, access_key) = synthesize_admin_and_access_key_for_me_protocol(account, seed);
    if  admin_access_key == record.get(&access_key).unwrap().admin_access_key {
        return Ok(true)
    }

    if record.get(&access_key).unwrap().members.get(&account).is_some() {
       return  Ok(true)
    }

    Err(ProtocolError::AccountIsNotAuthorizedToMakeThisRequest)
}

pub fn grant_access_to_account<T> (instance: &mut T, access_key: RoleType, admin_access_key: RoleType, account: AccountId) -> Result<bool, ProtocolError>
    where T: Storage<RecordStorage>
{
    let record: &BTreeMap<u32, AccessData> = &instance.data::<RecordStorage>().records;

    if admin_access_key != record.get(&access_key).unwrap().admin_access_key {
        return Err(ProtocolError::RequestorIsNotAdminForThisAccessKey);
    }

    if record.get(&access_key).unwrap().members.get(&account).is_some() {
        return Err(ProtocolError::AccountAlreadyHasAccess);
    }

    instance.data::<RecordStorage>().records.get_mut(&access_key).unwrap().members.insert(account, true);

    Ok(true)
}

pub fn revoke_access_from_account <T> (instance: &mut T, access_key: RoleType, admin_access_key: RoleType, account: AccountId) -> Result<bool, ProtocolError>
    where T: Storage<RecordStorage>
{
    let record: &BTreeMap<u32, AccessData> = &instance.data::<RecordStorage>().records;
    
    if admin_access_key != record.get(&access_key).unwrap().admin_access_key {
        return Err(ProtocolError::RequestorIsNotAdminForThisAccessKey);
    }

    if !record.get(&access_key).unwrap().members.get(&account).is_some() {
        return Err(ProtocolError::AccountDoesNotHaveAccess);
    }

    instance.data::<RecordStorage>().records.get_mut(&access_key).unwrap().members.insert(account, false);

    Ok(true)
}

pub fn create_new_access_key_for_reward<T> (instance: &mut T, brand: BRAND_ID_TYPE, target: AccountId, seed: RoleType) -> Result<bool, ProtocolError>
    where T: Storage<RecordStorage>

{
    let (admin_access_key, access_key) = synthesize_admin_and_access_key_for_reward(brand, target, seed);

    _create_new_access_key(instance, access_key, admin_access_key)
}

pub fn create_new_access_keys_for_reward<T> (instance: &mut T, brand: BRAND_ID_TYPE, target: AccountId, seeds: Vec<RoleType>) -> Result<bool, ProtocolError>
    where T: Storage<RecordStorage>
{
    let record: &mut BTreeMap<u32, AccessData> = &mut instance.data::<RecordStorage>().records;
    
    if seeds.len() > 5 {
        return Err(ProtocolError::SeedsAreTooMuch);
    }

    for seed in seeds {
        let (admin_access_key, access_key) = synthesize_admin_and_access_key_for_reward(brand, target, seed);
        if record.get(&access_key).unwrap().admin_access_key != EMPTY_ACCESS {
            return Err(ProtocolError::AccessKeyAlreadyExistsPleaseChangeInstead);
        }

        record.get_mut(&access_key).unwrap().admin_access_key = admin_access_key;
    }

    Ok(true)
}

pub fn create_new_access_keys_for_open_rewards<T> (instance: &mut T, admin: AccountId, target: AccountId, seeds: Vec<RoleType>) -> Result<bool, ProtocolError>
    where T: Storage<RecordStorage>
{
    let record: &mut BTreeMap<u32, AccessData> = &mut instance.data::<RecordStorage>().records;

    if seeds.len() > 5 {
        return Err(ProtocolError::SeedsAreTooMuch);
    }

    for seed in seeds {
        let (admin_access_key, access_key) = synthesize_admin_and_access_keys_for_open_rewards(admin, target, seed);

        if record.get(&access_key).unwrap().admin_access_key != EMPTY_ACCESS {
            return Err(ProtocolError::AccessKeyAlreadyExistsPleaseChangeInstead);
        }

        record.get_mut(&access_key).unwrap().admin_access_key = admin_access_key;

    }

    Ok(true)
}


pub fn create_new_access_key_for_me_protocol<T> (instance: &mut T, admin: AccountId, seeds: Vec<RoleType>) -> Result<bool, ProtocolError>
    where T: Storage<RecordStorage>
{
    let record: &mut BTreeMap<u32, AccessData> = &mut instance.data::<RecordStorage>().records;

    if seeds.len() > 5 {
        return Err(ProtocolError::SeedsAreTooMuch);
    }

    for seed in seeds {
        let (admin_access_key, access_key) = synthesize_admin_and_access_key_for_me_protocol(admin, seed);

        if record.get(&access_key).unwrap().admin_access_key != EMPTY_ACCESS {
            return Err(ProtocolError::AccessKeyAlreadyExistsPleaseChangeInstead);
        }
        
        record.get_mut(&access_key).unwrap().admin_access_key = admin_access_key;
    }

    Ok(true)
}

pub fn create_new_access_key_for_me_protocol_2<T> (instance: &mut T, admin: AccountId, seed: RoleType) -> Result<bool, ProtocolError>
    where T: Storage<RecordStorage>
{
    let (admin_access_key, access_key) = synthesize_admin_and_access_key_for_me_protocol(admin, seed);
    _create_new_access_key(instance, access_key, admin_access_key)
}

pub fn create_new_access_key_for_brand<T> (instance: &mut T, brand: BRAND_ID_TYPE, seed: RoleType) -> Result<bool, ProtocolError>
    where T: Storage<RecordStorage>
{
    let (admin_access_key, access_key) = synthesize_admin_and_access_key_for_brand(brand, seed);

    _create_new_access_key(instance, access_key, admin_access_key)
}

pub fn create_new_access_keys_for_open_rewards_2 <T> (instance: &mut T, admin: AccountId, target: AccountId, seed: RoleType) -> Result<bool, ProtocolError>
    where T: Storage<RecordStorage>
{
    let (admin_access_key, access_key) = synthesize_admin_and_access_keys_for_open_rewards(admin, target, seed);
    _create_new_access_key(instance, access_key, admin_access_key)
}

fn synthesize_admin_and_access_key_for_brand(brand: BRAND_ID_TYPE, seed: RoleType) -> (RoleType, RoleType) {
    let access_key = synthesize_access_key_for_brand(brand, seed);
    let admin_access_key = synthesize_admin_access_key_for_brand(brand);
    (access_key, admin_access_key)
}

fn synthesize_admin_access_key_for_brand(brand: BRAND_ID_TYPE) -> RoleType {
    let brand_bytes = brand.encode();
    let hash = hash_keccak_256(&brand_bytes);
    let access_key_u32 = u32::from_le_bytes(hash[..4].try_into().unwrap());
    access_key_u32
}

fn _create_new_access_key<T>(instance: &mut T, access_key: RoleType, admin_access_key: RoleType) -> Result<bool, ProtocolError>
    where T: Storage<RecordStorage>
{
    let record: &BTreeMap<u32, AccessData> = &instance.data::<RecordStorage>().records;

    if record.get(&access_key).unwrap().admin_access_key != EMPTY_ACCESS {
        return Err(ProtocolError::AccessKeyAlreadyExistsPleaseChangeInstead);
    }

    instance.data::<RecordStorage>().records.get_mut(&access_key).unwrap().admin_access_key = admin_access_key;

    Ok(true)
}



fn synthesize_admin_and_access_key_for_me_protocol (admin: AccountId, seed: RoleType) -> (RoleType, RoleType) {
    let access_key = synthesize_access_key_for_me_protocol(seed);
    let admin_access_key = synthesize_admin_access_key_for_me_protocol(admin, seed);
    (access_key, admin_access_key)
}

fn synthesize_admin_access_key_for_me_protocol (admin: AccountId, seed: RoleType) -> RoleType {
    let admin_bytes = admin.encode();
    let seed_bytes = seed.to_le_bytes();
    let combined_bytes: Vec<u8> = [&admin_bytes[..], &seed_bytes[..]].concat();
    let hash = hash_keccak_256(&combined_bytes);
    let access_key_u32 = u32::from_le_bytes(hash[..4].try_into().unwrap());
    access_key_u32
}

fn synthesize_access_key_for_me_protocol (seed: RoleType) -> RoleType {
    let seed_bytes = seed.to_le_bytes();
    let hash = hash_keccak_256(&seed_bytes);
    let access_key_u32 = u32::from_le_bytes(hash[..4].try_into().unwrap());
    access_key_u32
}

fn synthesize_admin_and_access_key_for_reward (brand: BRAND_ID_TYPE, target: AccountId, seed: RoleType)
    -> (RoleType, RoleType)
{
    let access_key = synthesize_access_key_for_reward(target, seed);
    let admin_addess_key = synthesize_admin_access_key_for_reward(brand, target);
    (access_key, admin_addess_key)
}



 fn synthesize_admin_access_key_for_reward(brand: BRAND_ID_TYPE, target: AccountId) -> RoleType {
    let admin_bytes = target.encode();
    let combined_bytes: Vec<u8> = [&admin_bytes[..], &brand[..]].concat();
    let hash = hash_keccak_256(&combined_bytes);
    let access_key_u32 = u32::from_le_bytes(hash[..4].try_into().unwrap());
    access_key_u32
 }




 fn synthesize_access_key_for_brand(brand: BRAND_ID_TYPE, seed: RoleType) -> RoleType {
    let seed_bytes = seed.to_le_bytes();
    let combined_bytes: Vec<u8> = [&brand[..], &seed_bytes[..]].concat();
    let hash = hash_keccak_256(&combined_bytes);
    let access_key_u32 = u32::from_le_bytes(hash[..4].try_into().unwrap());
    access_key_u32
}

fn synthesize_access_key_for_reward(target: AccountId, seed: RoleType ) -> RoleType {
    let admin_bytes = target.encode();
    let seed_bytes = seed.to_le_bytes();
    let combined_bytes: Vec<u8> = [&admin_bytes[..], &seed_bytes[..]].concat();
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


