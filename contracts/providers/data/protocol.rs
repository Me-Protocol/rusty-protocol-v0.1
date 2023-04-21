use openbrush::{ traits::{ AccountId, Balance, ZERO_ADDRESS, String } };
use ink::{storage::{traits::StorageLayout, Mapping}};
use crate::providers::common::{database::*, types::*};

#[derive(Debug)]
#[openbrush::upgradeable_storage(PROTOCOL_CONFIG)]pub struct ProtocolConfig{
     pub default_minimum_me_for_conversation: Balance,
     pub default_minimum_reward_for_conversation_in_percent: u8,
     pub default_maximum_r_limit_for_conversation_in_precision: u128,
     pub default_reward_notify_threshold_in_percent: u8,
     pub default_notify_me_amount: Balance,
     pub default_notify_reward_amount_in_percent: u8,
     pub cai_in_me: Balance,
     pub protocol_fee: Balance,
     pub bounty_fee_in_precision: u128,
}

#[derive(Debug)]
#[openbrush::upgradeable_storage(PROTOCOL_RECORDS)]
  pub struct ProtocolRecords{
     pub me : AccountId,
     pub bounty: AccountId,
     pub treasury: AccountId,
     pub total_number_of_brands: u128,
     pub total_number_of_rewards: u128,
     pub last_updated: u64,

}
