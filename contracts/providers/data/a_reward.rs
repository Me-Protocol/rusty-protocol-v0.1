use openbrush::traits::{ AccountId, Balance, String, Storage };
use ink::{ storage::{ traits::StorageLayout, Mapping } };
use crate::providers::common::{ database::*, types::BRAND_ID_TYPE, errors::ProtocolError };

pub const ZERO_ADDRESS: [u8; 32] = [0u8; 32];


#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo, StorageLayout))]
pub struct RewardDetails {
    pub name: Option<String>,
    pub symbol: Option<String>,
    pub r_type: u8,
    pub verified: bool,
    pub contract_address: AccountId,
    pub description_link: Option<String>,
    pub issuing_brand: BRAND_ID_TYPE,
    pub open: bool,
    pub interspendable: bool,
    pub pool_id: AccountId,
    pub date_created: u128,
}

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo, StorageLayout))]
pub struct RewardConfig {
    pub specific_exceptions: bool,
    pub bounty_enabled: bool,
    pub cai_enabled: bool,
    pub bounty_trigger_limit: u128,
    pub bounty_contribution_in_precision: u128,
    pub pay_incoming_gas_fee: bool,
    pub pay_outgoing_gas_fee: bool,
}

#[derive(Debug, Default)]
#[openbrush::storage_item(REWARD_RECORDS)]
pub struct RewardRecords {
    pub details: Mapping<AccountId, RewardDetails>,
    pub config: Mapping<AccountId, RewardConfig>,
}

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo, StorageLayout))]
pub struct EditableRewardDetails {
    pub name: Option<String>,
    pub symbol: Option<String>,
    pub description_link: Option<String>,
}

impl Default for RewardConfig {
    fn default() -> Self {
        Self {
            specific_exceptions: Default::default(),
            bounty_enabled: Default::default(),
            cai_enabled: Default::default(),
            bounty_trigger_limit: Default::default(),
            bounty_contribution_in_precision: Default::default(),
            pay_incoming_gas_fee: Default::default(),
            pay_outgoing_gas_fee: Default::default()
        }
    }
}

impl Default for RewardDetails {
    fn default() -> Self {
        Self {
            name: Default::default(),
            symbol: Default::default(),
            r_type: Default::default(),
            verified: Default::default(),
            contract_address: ZERO_ADDRESS.into(),
            description_link: Default::default(),
            issuing_brand: Default::default(),
            open: Default::default(),
            interspendable: Default::default(),
            pool_id: ZERO_ADDRESS.into(),
            date_created: Default::default(),
        }
    }
}

pub fn get_pool_id<T>(instance: &mut T, reward: AccountId) -> Result<AccountId,ProtocolError> where T: Storage<RewardRecords> {
    let pool_id = instance.data::<RewardRecords>().details.get(reward).unwrap().pool_id;
    if pool_id == ZERO_ADDRESS.into() {return Err(ProtocolError::RewardHasNoPool)}
    Ok(pool_id)
}

pub fn get_reward_config<T>(instance: &mut T, reward: AccountId) -> Result<RewardConfig,ProtocolError> where T: Storage<RewardRecords> {
    let config = instance.data::<RewardRecords>().config.get(reward).unwrap();
    Ok(config)
}

pub fn get_reward_details<T>(instance: &mut T, reward: AccountId) -> Result<RewardDetails,ProtocolError> where T: Storage<RewardRecords> {
    let details = instance.data::<RewardRecords>().details.get(reward).unwrap();
    Ok(details)
}

pub fn get_bounty_contribution_in_precision_for_reward<T>(instance: &mut T, reward: AccountId) -> Result<u128,ProtocolError> where T: Storage<RewardRecords> {
    let bounty_contribution_in_precision = instance.data::<RewardRecords>().config.get(reward).unwrap().bounty_contribution_in_precision;
     Ok(bounty_contribution_in_precision)
}

pub fn check_if_bounty_is_enabled<T>(instance: &mut T, reward: AccountId) -> Result<bool,ProtocolError> where T: Storage<RewardRecords>{
   let is_enabled = instance.data::<RewardRecords>().config.get(reward).unwrap().bounty_enabled;
   Ok(is_enabled)
}

pub fn check_if_cai_is_enabled<T>(instance: &mut T, reward: AccountId) -> Result<bool,ProtocolError> where T: Storage<RewardRecords>{
    let is_enabled = instance.data::<RewardRecords>().config.get(reward).unwrap().cai_enabled;
    Ok(is_enabled)
 }

 pub fn check_if_reward_is_opened<T>(instance: &mut T, reward: AccountId) -> Result<bool,ProtocolError> where T: Storage<RewardRecords>{
    let is_opened = instance.data::<RewardRecords>().details.get(reward).unwrap().open;
    Ok(is_opened)
 }