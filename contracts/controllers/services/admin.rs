use openbrush::{
    contracts::traits::{ access_control::*, psp22::*, psp34::*, pausable::* },
    traits::{ AccountId, Balance, String },
};

use crate::providers::{ common::{errors::*, types::*}, data::{ a_reward::*, brand::*, a_pool::*, protocol::*, treasury::* } };

#[openbrush::wrapper]
pub type AdminRef = dyn AdminController + AccessControl;

#[openbrush::trait_definition]
pub trait AdminController {

    #[ink(message)]
    fn initialize_protocol(
        &mut self,
        protocol_config: EditableProtocolConfig,
        forwarded_address: AccountId,
        protocol_main_address: AccountId
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn set_new_forwarder_address(
        &mut self,
        new_forwarder: AccountId,
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn is_forwarder_address(
        &self,
        forwarder: AccountId,
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn update_protocol_configurations(
        &mut self,
        protocol_config: EditableProtocolConfig,
        ignore_default: bool
    ) -> Result<bool, ProtocolError>;


    #[ink(message)]
    fn update_protocol_records(
        &mut self,
        protocol_records: EditableProtocolRecords,
        ignore_default: bool
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn update_treasury_address(
        &mut self,
        new_treasury: AccountId,
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn register_brand(
        &mut self,
        brand_name: Option<String>,
        brand_online_presence: Option<String>,
        brand_account:AccountId,
        brand_id: BRAND_ID_TYPE,
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn add_protocol_manager(
        &mut self,
        manager: AccountId,
        seed: u64,
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn get_is_authenticated(
        &mut self,
        seed: u64,
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn get_protocol_config(&self)-> Result<ProtocolConfigClone, ProtocolError>;

    #[ink(message)]
    fn get_protocol_records(&self) -> Result<ProtocolRecordsClone, ProtocolError>;


}