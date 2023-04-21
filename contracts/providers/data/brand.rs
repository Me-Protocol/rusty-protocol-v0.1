use openbrush::{ traits::{ AccountId, Balance, ZERO_ADDRESS, String } };
use ink::{storage::{traits::StorageLayout, Mapping}};
use crate::providers::common::{database::*, types::*};

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo, StorageLayout))]
  pub struct BrandDetails{
    pub name: Option<String>,
    pub id: BRAND_ID_TYPE,
    pub main_account: AccountId,
    pub online_presence: Option<String>,
    pub date_joined: u64
}

#[derive(Debug)]
#[openbrush::upgradeable_storage(BRAND_RECORDS)]
  pub struct BrandRecords{
   pub Id: Mapping<AccountId, BRAND_ID_TYPE>,
   pub Exists: Mapping<BRAND_ID_TYPE, bool>,
   pub Details: Mapping<BRAND_ID_TYPE, BrandDetails>,
   pub GlobalConfig: Mapping<BRAND_ID_TYPE, GlobalBrandConfig>,
}

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo, StorageLayout))]
  pub struct GlobalBrandConfig{
    pub enable_bounty_rewards: bool,
    pub enable_cais: bool,
    pub pay_incoming_gas_fees: bool,
    pub pay_outgoing_gas_fees: bool,
}

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo, StorageLayout))]
  pub struct EditableBrandDetails{
    pub name: Option<String>,
    pub online_presence: Option<String>,
}


impl Default for GlobalBrandConfig {
    fn default() -> Self {
        Self {
           enable_bounty_rewards: Default::default(),
           enable_cais: Default::default(),
           pay_incoming_gas_fees: Default::default(),
           pay_outgoing_gas_fees: Default::default(),
        }
    }
}

impl Default for EditableBrandDetails {
  fn default() -> Self {
      Self {
         name: Default::default(),
         online_presence: Default::default(),
      }
  }
}


impl Default for BrandDetails {
  fn default() -> Self {
      Self {
         name: Default::default(),
         id: Default::default(),
         main_account: ZERO_ADDRESS.into(),
         online_presence: Default::default(),
         date_joined: Default::default()
      }
  }
}

