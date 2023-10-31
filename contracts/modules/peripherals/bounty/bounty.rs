#![cfg_attr(not(feature = "std"), no_std, no_main)]
#![no_main]
#![feature(min_specialization)]


///
/// 
/// 
///        /////   THE BOUNTY CONTRACT /////
/// 
/// 
///  This is the main entry to the bounty contract
/// 
/// Understanding the contract
/// 
/// The bounty contract houses rewards to be distributed to users after performing certain tasks 
/// 
/// Bounty Flow 
/// 
/// deposit_bounty: Called to record deposited reward in the bounty contract 
/// 
/// withdraw_bounty: Called to withdraw the bounty  rewards deposited into the contract 
/// 
/// set_trigger_limit: Called to set the trigger limit when the the bounty would be distributed to users who
/// successfully complete certainn tasks 
/// 
/// get_trigger_limit: returns the trigger limit set by the "set_trigger_limit" function 

#[openbrush::implementation(AccessControl)]
#[openbrush::contract]
pub mod bounty {

    use global::providers::{
        data::bounty::*,
        deployables::{bounty::{ *,BountyImpl }, bounty::BOUNTY_MANAGER},
    };

    use openbrush::{
        contracts::{ access_control::{*, self}, reentrancy_guard::* },
        traits::Storage,
    };


    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Bounty {

        #[storage_field]
        treasury_state: BountyRecord,
    
        #[storage_field]
        pub access: access_control::Data,

        #[storage_field]
        pub guard: reentrancy_guard::Data,
    }

    impl BountyImpl for Bounty {}

    impl BountyController for Bounty {

        #[ink(message)] 
        fn deposit_bounty(
            &mut self,
            reward: AccountId,
            amount: Balance,
            requestor: AccountId
        ) -> Result<bool, ProtocolError> {
            BountyImpl::deposit_bounty(self,reward,amount, requestor)
        }

        #[ink(message)]
        fn withdraw_bounty(
            &mut self,
            reward: AccountId,
            amount: Balance,
            requestor: AccountId,
            to: AccountId
        ) -> Result<bool, ProtocolError> {
            BountyImpl::withdraw_bounty(self, reward, amount, requestor, to)
        }

        #[ink(message)]
        fn set_trigger_limit(
            &mut self,
            reward: AccountId,
            new_trigger_limit: Balance,
            requestor: AccountId
        ) -> Result<bool, ProtocolError> {
            BountyImpl::set_trigger_limit(self,reward, new_trigger_limit, requestor)
        }

        #[ink(message)]
        fn get_trigger_limit(
            &mut self,
            reward: AccountId,
            requestor: AccountId
        ) -> Result<u128, ProtocolError> {
            BountyImpl::get_trigger_limit(self,reward,requestor)
        }

        

    }







    impl Bounty {
      
        #[ink(constructor)]
        pub fn new(me_token: AccountId,) -> Self {
            let mut instance = Self::default();
            let caller = instance.env().caller();

            
            access_control::InternalImpl::_init_with_admin(&mut instance, Some(caller));

            access_control::InternalImpl::_setup_role(&mut instance, PROTOCOL, Some(caller));
            
            access_control::InternalImpl::_setup_role(&mut instance,BOUNTY_MANAGER, Some(caller));
            
            BountyImpl::set_up_bounty(&mut instance, me_token);

            instance
        }


    }


}
