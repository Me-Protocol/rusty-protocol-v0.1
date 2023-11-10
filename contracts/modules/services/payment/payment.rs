#![cfg_attr(not(feature = "std"), no_std, no_main)]


///  The payment contract 
/// 
/// The payment contract is resposible for the following:
/// 
/// 1) Allow brands deposit and have shares in the payment contract
/// 
/// 2) Allow brands pay for any service with their shares in the payment contract 
/// 
/// 3) Allow brands to withdraw their shares from the service payemnt contract 
/// 
/// 4) Allow admins to withdraw payemts for services done 

#[openbrush::implementation(AccessControl)]
#[openbrush::contract]
pub mod payment {

  pub  use global::providers::{
        data::payment::PaymentStorage,
        services::payment::{ *,PaymentImpl }
    };

    
    use openbrush::{
        contracts::{ access_control::{*, self}, reentrancy_guard::* },
        traits::Storage,
    };

   
    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Payment {
        #[storage_field]
        pub payment_state: PaymentStorage,
    
        #[storage_field]
        pub access: access_control::Data,

        #[storage_field]
        pub guard: reentrancy_guard::Data,
    }

    impl PaymentImpl for Payment {}

    impl PaymentController for Payment {

        #[ink(message)] 
        fn brand_deposit_me(
            &mut self,
            me_amount: Balance,
            requestor: AccountId,
        ) -> Result<bool, ProtocolError>{
            PaymentImpl::brand_deposit_me(self, me_amount, requestor)
        }

        #[ink(message)]
        fn brand_service_payment(
            &mut self,
            me_amount: Balance,
        ) -> Result<bool, ProtocolError> {
            PaymentImpl::brand_service_payment(self, me_amount)
        }

        #[ink(message)]
        fn brand_withdraw_me(
            &mut self,
            me_amount: Balance,
            requestor: AccountId,
        ) -> Result<bool, ProtocolError>{
            PaymentImpl::brand_withdraw_me(self, me_amount, requestor )
        }

        #[ink(message)]
        fn brand_me_balance(
            &mut self, 
        ) -> Balance {
            PaymentImpl::brand_me_balance(self)
        }
    
        #[ink(message)]
        fn protocol_withdraw_me(
            &mut self,
            me_amount: Balance,
            requestor: AccountId,
        ) -> Result<bool, ProtocolError>{
            PaymentImpl::protocol_withdraw_me(self, me_amount, requestor)
        }

        #[ink(message)]
        fn protocol_me_balance (&mut self) -> Balance{
            PaymentImpl::protocol_me_balance(self)
        }

        #[ink(message)]
        fn get_me_id(&mut self) -> Result<AccountId, ProtocolError> {
           PaymentImpl::get_me_id(self)
        }
    

    }



    impl Payment {

        #[ink(constructor)]
        pub fn new(me_token: AccountId) -> Self {
            let mut instance = Self::default();
            let caller = instance.env().caller();

            access_control::InternalImpl::_init_with_admin(&mut instance, Some(caller));

            access_control::InternalImpl::_setup_role(&mut instance, PROTOCOL, Some(caller));

            PaymentImpl::set_up_payment(&mut instance, me_token);

            instance
        }

    }
}