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
    fn get_protocol_config(&self) -> EditableProtocolConfig;

    #[ink(message)]
    fn get_protocol_records(&self) -> EditableProtocolRecords;

    #[ink(message)]
    fn update_protocol_configurations(&mut self, config: EditableProtocolConfig) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn update_protocol_records(&mut self, records: EditableProtocolRecords) -> Result<bool, ProtocolError> ;

    #[ink(message)]
    fn update_treasury_address(&mut self, address: AccountId) -> Result<bool, ProtocolError> ;

    #[ink(message)]
    fn register_brand(&mut self, brand_name: Option<String>, brand_online_presence: Option<String> , brand_account: AccountId, brand_id: BRAND_ID_TYPE) -> Result<bool, ProtocolError> ;

    #[ink(message)]
    fn get_me_address(&self) -> Result<AccountId, ProtocolError>;

}