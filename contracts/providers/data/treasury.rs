use openbrush::{ traits::{ AccountId, Balance, ZERO_ADDRESS } };
use ink::{storage::{ Mapping}};
use crate::providers::common::database::*;

#[derive(Debug)]
#[openbrush::upgradeable_storage(TREASURY_RECORD)]
pub struct TreasuryRecord {
    pub notify_limits: Mapping<AccountId, u128>,
    pub balance: Mapping<AccountId, u128>
}

impl Default for TreasuryRecord {
    fn default() -> Self {
        Self {
            notify_limits: Default::default(),
            balance: Mapping::default(),
            }
    }
}