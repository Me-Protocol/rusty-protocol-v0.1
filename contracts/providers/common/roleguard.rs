
// use openbrush::{
//     contracts::{
//         access_control::*,
//     },
//     traits::{  AccountId, String},
// };

// use scale::Encode;
// use ink::prelude::{vec::Vec};
// use ink::env::{hash, hash_bytes};


// pub fn synthesize_admin_and_access_keys_for_open_rewards(
//     admin: AccountId,
//     target: AccountId,
//     seed: RoleType
// ) -> (RoleType, RoleType) {
//  let admin_key = synthesize_admin_key_for_open_rewards(admin, seed);
//  let access_key = synthesize_access_key_for_open_rewards(target, seed);
//  return (admin_key, access_key);
// }

// fn bytes_to_string(bytes: &[u8]) -> String {
//     String::from_utf8_lossy(bytes).to_string()
// }


// pub fn hash_keccak_256(input: &[u8]) -> [u8; 32] {
//     let mut output = <hash::Keccak256 as hash::HashOutput>::Type::default();
//     hash_bytes::<hash::Keccak256>(input, &mut output);
//     output
// }

// pub fn synthesize_access_key_for_open_rewards(target:AccountId, seed:RoleType)-> RoleType{
//     let target_bytes = target.encode();
//     let seed_bytes = seed.to_le_bytes();
//     let combined_bytes: Vec<u8> = [&target_bytes[..], &seed_bytes[..]].concat();
//     let hash = hash_keccak_256(&combined_bytes);
//     let access_key_u32 = u32::from_le_bytes(hash[..4].try_into().unwrap());

//     access_key_u32
// }

// pub fn synthesize_admin_key_for_open_rewards(admin:AccountId, seed:RoleType)-> RoleType{
//     let admin_bytes = admin.encode();
//     let seed_bytes = seed.to_le_bytes();
//     let combined_bytes: Vec<u8> = [&admin_bytes[..], &seed_bytes[..]].concat();
//     let hash = hash_keccak_256(&combined_bytes);
//     let access_key_u32 = u32::from_le_bytes(hash[..4].try_into().unwrap());

//     access_key_u32
// }


