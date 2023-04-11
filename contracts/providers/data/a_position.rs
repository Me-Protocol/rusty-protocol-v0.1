


use ink::storage::traits::StorageLayout;
use openbrush::{storage::Mapping, traits::{ AccountId, Balance} };


use crate::providers::common::database::*;


#[derive(Debug)]
#[openbrush::upgradeable_storage(LIQUIDITY_POSITION)]
pub struct Position {
    pub position_metadata: Mapping<u128, PositionMetadata>,
    pub next_position_id: u128
}

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode, StorageLayout)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub struct PositionMetadata {
   pub reward_position: Balance,
   pub me_token_position: Balance
}

impl Default for Position {
    fn default() -> Self {
        Self {
           position_metadata : Mapping::default(),
           next_position_id: Default::default()

        }
    }
}


impl Default for PositionMetadata {
    fn default() -> Self {
        Self {
           reward_position: Default::default(),
           me_token_position: Default::default(),
        }
    }
}