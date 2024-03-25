
use crate::providers::common::roleguard::RecordStorage;

pub use crate::
    providers::{
        data::{ brand::*, a_reward::*, protocol::* },
        common::
            errors::ProtocolError
        ,
        services::brands::*,
    }
;

use ink::{
    prelude::vec::Vec,
    primitives::AccountId,
    env::hash::{ Keccak256, CryptoHash, HashOutput },
};

use openbrush::{
    modifier_definition,
    contracts::{
        access_control::*,
        traits::{ psp22::*, psp22::extensions::metadata::* },
        reentrancy_guard::*,
        psp34::Id,
    },
    modifiers,
    traits::{ Balance, Storage, String },
};
use scale::KeyedVec;

pub trait AdminImpl:
        Storage<BrandRecords> +
        Storage<RewardRecords> +
        Storage<access_control::Data> +
        Storage<ProtocolRecords> +
        Storage<ProtocolConfig> +
        Storage<RecordStorage> +
        BrandImpl + 
        AccessControlImpl
{


    fn get_protocol_config(&self) -> Result<ProtocolConfig, ProtocolError> {
        Ok(self.data::<ProtocolConfig>().clone())
    }

    fn get_protocol_records(&self) -> Result<ProtocolRecords, ProtocolError> {
        Ok(self.data::<ProtocolRecords>().clone())
    }

    #[modifiers(only_role(PROTOCOL_ADMIN))]
    fn update_protocol_configurations(&mut self, config: EditableProtocolConfig) -> Result<bool, ProtocolError> {
        update_editable_protocol_config(self,config);
        Ok(true)
    }

    #[modifiers(only_role(PROTOCOL_ADMIN))]
   fn update_protocol_records(&mut self, records: EditableProtocolRecords) -> Result<bool, ProtocolError> { 
        update_editable_protocol_records(self,records);
        Ok(true)    
    }

    #[modifiers(only_role(PROTOCOL_ADMIN))]
    fn update_treasury_address(&mut self, address: AccountId) -> Result<bool, ProtocolError> {
        self.data::<ProtocolRecords>().treasury = address;
        Ok(true)
    }

    #[modifiers(only_role(ONBOARDING_MANAGER))]
    fn register_brand(&mut self, brand_name: String, brand_online_presence: String , brand_account: AccountId, brand_id: BRAND_ID_TYPE) -> Result<bool, ProtocolError> {

        let _ = BrandImpl::register(self, Some(brand_name), Some(brand_online_presence), brand_account, brand_id);
        Ok(true)
    }

    fn get_me_address(&self) -> Result<AccountId, ProtocolError> {
        Ok(self.data::<ProtocolRecords>().me)
    }   



}