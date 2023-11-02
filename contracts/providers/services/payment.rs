use crate::providers::{ common::{ constants::PRECISION, types::* }, data::payment::* };
pub use crate::{
    providers::{
        data::{ payment::* },
        common::{ roles::*, errors::ProtocolError, eunice::*, validator::* },
    },
    controllers::deployables::payment::*,
};
use openbrush::traits::String;

use ink::{ prelude::vec::Vec, primitives::AccountId };
use openbrush::{
    modifier_definition,
    contracts::{ access_control::*, traits::{ psp22::PSP22Ref }, reentrancy_guard::* },
    modifiers,
    traits::{ Balance, Storage },
};

pub trait PaymentImpl: Storage<PaymentStorage> + 
Storage<access_control::Data> + 
Storage<reentrancy_guard::Data> +
MembersManager +
AccessControlImpl
{

    fn brand_deposit_me(
        &mut self,
        me_amount: Balance,
        requestor: AccountId,
    ) -> Result<bool, ProtocolError>{

        ensure_address_is_not_zero_address(requestor)?;
        let payment_contract = Self::env().account_id();
        let caller = Self::env().caller();
        let me = get_me(self);

        if me_amount == 0 {
            return Err(ProtocolError::PaymentCanNotBeZero);
        }

        PSP22Ref::transfer_from(&me, caller, payment_contract, me_amount, Vec::<u8>::new())?;

        update_brand_me_balances(self, requestor, me_amount);

        Ok(true)
    }


    fn brand_service_payment(
        &mut self,
        me_amount: Balance,
    
    ) -> Result<bool, ProtocolError>{

        let caller = Self::env().caller();

        let brand_bal = get_brand_me_balance(self, caller);


        if brand_bal == 0 {
            return Err(ProtocolError::PaymentBalanceIsZero);
        }

        if brand_bal < me_amount {
            return Err(ProtocolError::TopUpToPayForService);
        }

        if brand_bal >= me_amount {
            let protocol_bal = get_protocol_me_balance(self);

            let new_protocol_new_bal = protocol_bal + me_amount;

            let new_brand_bal = brand_bal - me_amount;

            update_protocol_me_balance(self, new_protocol_new_bal);

            update_brand_me_balances(self, caller, new_brand_bal);
        }

        Ok(true)
    }

    #[modifiers(non_reentrant)]
    fn brand_withdraw_me(
        &mut self,
        me_amount: Balance,
    
        requestor: AccountId,
    ) -> Result<bool, ProtocolError>{

        ensure_address_is_not_zero_address(requestor)?;
        
        let caller = Self::env().caller();

        if me_amount == 0 {
            return Err(ProtocolError::PaymentCanNotBeZero);
        }

        let me = get_me(self);

        let brand_bal = get_brand_me_balance(self, caller);

        if brand_bal == 0 {
            return Err(ProtocolError::YouCannotWithdrawWhatYouDontHave);
        }

        if  me_amount != 0 {

            let new_brand_bal = brand_bal - me_amount;

            update_brand_me_balances(self, caller, new_brand_bal);

            PSP22Ref::transfer(&me, requestor, me_amount, Vec::<u8>::new())?;

        }       

        Ok(true)
    }


   
    fn brand_me_balance(
        &mut self,
    
    ) -> Balance {

        let caller = Self::env().caller();

        get_brand_me_balance(self, caller)
    }

    #[modifiers(only_role(PROTOCOL))]
    #[modifiers(non_reentrant)]
    fn protocol_withdraw_me(
        &mut self,
        me_amount: Balance,
        requestor: AccountId,
    ) -> Result<bool, ProtocolError> {

        ensure_address_is_not_zero_address(requestor)?;

        if me_amount == 0 {
            return Err(ProtocolError::PaymentCanNotBeZero);
        }

        let protocol_me_bal = get_protocol_me_balance(self);

        let me = get_me(self);

        if me_amount >  protocol_me_bal {
            return Err(ProtocolError::YouCannotWithdrawWhatYouDontHave);
        }

        if me_amount <=  protocol_me_bal {
            let new_protocol_bal = protocol_me_bal - me_amount;
            update_protocol_me_balance(self, new_protocol_bal);

            PSP22Ref::transfer(&me, requestor, me_amount, Vec::<u8>::new())?;
        }

        Ok(true)
    }

    fn protocol_me_balance (&mut self) -> Balance {
        get_protocol_me_balance(self)
    }

    fn set_up_payment(
        &mut self,
        me_token: AccountId,
    ) {
        update_me_id(self, me_token);
    }

    fn get_me_id(&mut self) -> Result<AccountId, ProtocolError> {
        Ok(get_me(self))
    }

}