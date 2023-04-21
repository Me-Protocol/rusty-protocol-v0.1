use openbrush::{ traits::{ AccountId, Balance, ZERO_ADDRESS, String } };
use ink::{ storage::{ traits::StorageLayout, Mapping } };
use crate::providers::common::{ database::*, types::BRAND_ID_TYPE };

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
    pub pay_incoming_gas_fee: bool,
    pub pay_outgoing_gas_fee: bool,
}

#[derive(Debug)]
#[openbrush::upgradeable_storage(REWARD_RECORDS)]
pub struct RewardRecords {
    pub Details: Mapping<AccountId, RewardDetails>,
    pub Config: Mapping<AccountId, RewardConfig>,
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
            pay_incoming_gas_fee: Default::default(),
            pay_outgoing_gas_fee: Default::default(),
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