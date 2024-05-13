use core::clone;

use openbrush::{ traits::{ AccountId, Balance, String, Storage } };
use ink::{ storage::{ traits::StorageLayout, Mapping } };
use crate::providers::common::{ database::*, types::* };

use super::a_pool::ZERO_ADDRESS;

#[derive(Debug, Clone, Copy, Default)]
#[openbrush::storage_item(PROTOCOL_CONFIG)]
pub struct ProtocolConfig {
    pub default_minimum_me_for_conversation: Balance,
    pub default_minimum_reward_for_conversation_in_percent: u8,
    pub default_maximum_r_limit_for_conversation_in_precision: u128,
    pub default_reward_notify_threshold_in_percent: u8,
    pub default_notify_me_amount: Balance,
    pub default_notify_reward_amount_in_percent: u8,
    pub cai_in_me: Balance,
    pub protocol_fee: Balance,
    pub bounty_contribution_in_precision: u128,
    pub conversions_slippage_in_precisiion: u128,
    pub informations_slippage_in_precision: u128,
}

#[derive(Debug, Clone, Copy)]
#[openbrush::storage_item(PROTOCOL_RECORDS)]
pub struct ProtocolRecords {
    pub me: AccountId,
    pub bounty: AccountId,
    pub treasury: AccountId,
    pub admin_id: BRAND_ID_TYPE,
    pub total_number_of_brands: u128,
    pub total_number_of_rewards: u128,
    pub last_updated: u64,
}

impl  Default for ProtocolRecords {
    fn default() -> Self {
        Self { 
            me: ZERO_ADDRESS.into(),
            bounty: ZERO_ADDRESS.into(),
            treasury: ZERO_ADDRESS.into(),
            admin_id: BRAND_ID_TYPE::default(),
            total_number_of_brands: Default::default(),
            total_number_of_rewards: Default::default(),
            last_updated: Default::default(),
        }
    }
}

// #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
// #[cfg_attr(feature = "std", derive(scale_info::TypeInfo, StorageLayout))]
// pub struct ProtocolConfigClone {
//     pub default_minimum_me_for_conversation: Balance,
//     pub default_minimum_reward_for_conversation_in_percent: u8,
//     pub default_maximum_r_limit_for_conversation_in_precision: u128,
//     pub default_reward_notify_threshold_in_percent: u8,
//     pub default_notify_me_amount: Balance,
//     pub default_notify_reward_amount_in_percent: u8,
//     pub cai_in_me: Balance,
//     pub protocol_fee: Balance,
//     pub bounty_contribution_in_precision: u128,

// }

// #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
// #[cfg_attr(feature = "std", derive(scale_info::TypeInfo, StorageLayout))]
// pub struct ProtocolRecordsClone {
//     pub me: AccountId,
//     pub bounty: AccountId,
//     pub treasury: AccountId,
//     pub admin_id: BRAND_ID_TYPE,
//     pub total_number_of_brands: u128,
//     pub total_number_of_rewards: u128,
//     pub last_updated: u64,
// }


#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo, StorageLayout))]
pub struct EditableProtocolConfig {
    pub default_minimum_me_for_conversation: Balance,
    pub default_minimum_reward_for_conversation_in_percent: u8,
    pub default_maximum_r_limit_for_conversation_in_precision: u128,
    pub default_reward_notify_threshold_in_percent: u8,
    pub default_notify_me_amount: Balance,
    pub default_notify_reward_amount_in_percent: u8,
    pub cai_in_me: Balance,
    pub protocol_fee: Balance,
    pub bounty_contribution_in_precision: u128,
    pub conversions_slippage_in_precisiion: u128,
    pub informations_slippage_in_precision: u128,
}


#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo, StorageLayout))]
pub struct EditableProtocolRecords {
    pub me: AccountId,
    pub bounty: AccountId,
    pub treasury: AccountId,
    pub admin_id: BRAND_ID_TYPE,
    pub total_number_of_brands: u128,
    pub total_number_of_rewards: u128,
    pub last_updated: u64,
}

pub fn get_me<T>(instance: &mut T) -> AccountId where T: Storage<ProtocolRecords> {
    instance.data::<ProtocolRecords>().me
}

pub fn get_bount_id<T>(instance: &mut T) -> AccountId where T: Storage<ProtocolRecords> {
    instance.data::<ProtocolRecords>().bounty
}

pub fn get_treasury_id<T>(instance: &mut T) -> AccountId where T: Storage<ProtocolRecords> {
     instance.data::<ProtocolRecords>().treasury
 }

 pub fn get_default_protocol_bounty_contribution_in_precision<T>(instance: &mut T) -> u128 where T: Storage<ProtocolConfig> {
     instance.data::<ProtocolConfig>().bounty_contribution_in_precision
 }

 pub fn update_editable_protocol_config<T>(instance: &mut T, protocol_config: EditableProtocolConfig) where T: Storage<ProtocolConfig> {
    instance.data::<ProtocolConfig>().default_minimum_me_for_conversation = protocol_config.default_minimum_me_for_conversation;
    instance.data::<ProtocolConfig>().default_minimum_reward_for_conversation_in_percent = protocol_config.default_minimum_reward_for_conversation_in_percent;
    instance.data::<ProtocolConfig>().default_maximum_r_limit_for_conversation_in_precision = protocol_config.default_maximum_r_limit_for_conversation_in_precision;
    instance.data::<ProtocolConfig>().default_reward_notify_threshold_in_percent = protocol_config.default_reward_notify_threshold_in_percent;
    instance.data::<ProtocolConfig>().default_notify_me_amount = protocol_config.default_notify_me_amount;
    instance.data::<ProtocolConfig>().default_notify_reward_amount_in_percent = protocol_config.default_notify_reward_amount_in_percent;
    instance.data::<ProtocolConfig>().cai_in_me = protocol_config.cai_in_me;
    instance.data::<ProtocolConfig>().protocol_fee = protocol_config.protocol_fee;
    instance.data::<ProtocolConfig>().bounty_contribution_in_precision = protocol_config.bounty_contribution_in_precision;
    instance.data::<ProtocolConfig>().conversions_slippage_in_precisiion = protocol_config.conversions_slippage_in_precisiion;
    instance.data::<ProtocolConfig>().informations_slippage_in_precision = protocol_config.informations_slippage_in_precision;
}


pub fn update_editable_protocol_records<T>(instance: &mut T, protocol_records: EditableProtocolRecords) where T: Storage<ProtocolRecords> {
    instance.data::<ProtocolRecords>().admin_id = protocol_records.admin_id;
    instance.data::<ProtocolRecords>().me = protocol_records.me;
    instance.data::<ProtocolRecords>().bounty = protocol_records.bounty;
    instance.data::<ProtocolRecords>().treasury = protocol_records.treasury;
    instance.data::<ProtocolRecords>().total_number_of_brands = protocol_records.total_number_of_brands;
    instance.data::<ProtocolRecords>().total_number_of_rewards = protocol_records.total_number_of_rewards;
    instance.data::<ProtocolRecords>().last_updated = protocol_records.last_updated;
}