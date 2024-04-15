
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
        AccessControlImpl
{


    fn get_protocol_config(&self) -> EditableProtocolConfig{
       let config = self.data::<ProtocolConfig>().clone();

      EditableProtocolConfig{
            default_minimum_me_for_conversation: config.default_minimum_me_for_conversation,
            default_minimum_reward_for_conversation_in_percent: config.default_minimum_reward_for_conversation_in_percent,
            default_maximum_r_limit_for_conversation_in_precision: config.default_maximum_r_limit_for_conversation_in_precision,
            default_reward_notify_threshold_in_percent: config.default_reward_notify_threshold_in_percent,
            default_notify_me_amount: config.default_notify_me_amount,
            default_notify_reward_amount_in_percent: config.default_notify_reward_amount_in_percent,
            cai_in_me: config.cai_in_me,
            protocol_fee: config.protocol_fee,
            bounty_contribution_in_precision: config.bounty_contribution_in_precision,
            conversions_slippage_in_precisiion: config.conversions_slippage_in_precisiion,
            informations_slippage_in_precision: config.informations_slippage_in_precision,
        }
    }

    fn get_protocol_records(&self) -> EditableProtocolRecords{
        let protocol = self.data::<ProtocolRecords>().clone();

    
            EditableProtocolRecords{
                me: protocol.me,
                bounty: protocol.bounty,
                treasury: protocol.treasury,
                admin_id: protocol.admin_id,
                total_number_of_brands: protocol.total_number_of_brands,
                total_number_of_rewards: protocol.total_number_of_rewards,
                last_updated: protocol.last_updated,
            }
        

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
    fn register_brand(&mut self, brand_name: Option<String>, brand_online_presence: Option<String> , brand_account: AccountId, brand_id: BRAND_ID_TYPE) -> Result<bool, ProtocolError> {

       
        let mut details = BrandDetails::default();
        let config = GlobalBrandConfig::default();

        details.name = brand_name.clone();
        details.online_presence = brand_online_presence.clone();
        details.main_account = brand_account;
        details.date_joined = Self::env().block_timestamp();
    
        ensure_brand_is_not_empty(brand_id).unwrap();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        self.data::<BrandRecords>().exists.insert(brand_id, &true);
        self.data::<BrandRecords>().details.insert(brand_id, &details);
        self.data::<BrandRecords>().global_config.insert(brand_id, &config);
        self.data::<BrandRecords>().id.insert(brand_account, &brand_id);

       
        Ok(true)
    }

    fn get_me_address(&self) -> Result<AccountId, ProtocolError> {
        Ok(self.data::<ProtocolRecords>().me)
    }   



}