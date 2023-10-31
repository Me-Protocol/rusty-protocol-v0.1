use openbrush::{
    contracts::traits::{ access_control::*, psp22::* },
    traits::{ AccountId, Balance },
};
use openbrush::traits::String;

use ink::{ prelude::vec::Vec };

use crate::providers::{ common::{ errors::*, types::* }, data::a_pool::* };

#[openbrush::wrapper]
pub type PaymentRef = dyn PaymentController + AccessControl;


#[openbrush::trait_definition]
pub trait PaymentController {

    #[ink(message)]
    fn brand_deposit_me(
        &mut self,
        me_amount: Balance,
        brand_id: BRAND_ID_TYPE,
        requestor: AccountId,
        metadata: Option<String>
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn brand_service_payment(
        &mut self,
        me_amount: Balance,
        brand_id: BRAND_ID_TYPE,
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn brand_withdraw_me(
        &mut self,
        me_amount: Balance,
        brand_id: BRAND_ID_TYPE,
        requestor: AccountId,
        metadata: Option<String>
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn brand_me_balance(
        &mut self,
        brand_id: BRAND_ID_TYPE,
    ) -> Balance;

    #[ink(message)]
    fn protocol_withdraw_me(
        &mut self,
        me_amount: Balance,
        brand_id: BRAND_ID_TYPE,
        requestor: AccountId,
        metadata: Option<String>
    ) -> Result<bool, ProtocolError>;

    #[ink(message)]
    fn protocol_me_balance (&mut self) -> Balance;

    #[ink(message)]
    fn total_me_in_payment(&mut self) -> Result<Balance, ProtocolError>;



}