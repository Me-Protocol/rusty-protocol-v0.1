#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]



#[cfg(test)]
mod payment_test {
    use ink::primitives::Hash;
    use payment::payment::*;
    use global::{ providers::data::payment::* };
    use global::providers::  common::{ roles::*, errors::ProtocolError, eunice::*, validator::* };
    use openbrush::{ test_utils::*, traits::{ AccountId, Balance } };
    use global::{ providers::data::payment::* };
    
    

    #[ink::test]
    fn new_works() {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut payment = Payment::new(a);

        // let res = payment::payment::paymentController::deposit_payment(&mut payment, b, 1000, a);
        
        // println!("the result {:?}", res);

        assert_eq!(payment::payment::PaymentImpl::get_me_id(&mut payment), Ok(a));
    }

    #[ink::test]
    fn brand_service_payment_test () {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut payment = Payment::new(a);
 
        assert_eq!(payment::payment::PaymentImpl::brand_service_payment(&mut payment,1000), Err(ProtocolError::PaymentBalanceIsZero));
    }

    #[ink::test]
    fn brand_withdraw_me_test() {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut payment = Payment::new(a);

        assert_eq!(payment::payment::PaymentImpl::brand_withdraw_me(&mut payment, 100,a),  Err(ProtocolError::YouCannotWithdrawWhatYouDontHave))
    }

    #[ink::test]
    fn brand_me_balance_test() {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut payment = Payment::new(a);

        assert_eq!(payment::payment::PaymentImpl::brand_me_balance(&mut payment), 0)
    }

    #[ink::test]
    fn protocol_withdraw_me_test() {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut payment = Payment::new(a);

        assert_eq!(payment::payment::PaymentImpl::protocol_withdraw_me(&mut payment, 100, a), Err(ProtocolError::YouCannotWithdrawWhatYouDontHave))
    }


    #[ink::test]
    fn protocol_me_balance_test() {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut payment = Payment::new(a);

        assert_eq!(payment::payment::PaymentImpl::protocol_me_balance(&mut payment),0)
    }



        


}