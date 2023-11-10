#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]



#[cfg(test)]
mod bounty_test {
    use ink::primitives::Hash;
    use bounty::bounty::*;
    use global::{ providers::data::bounty::* };
    use global::providers::  common::{ roles::*, errors::ProtocolError, eunice::*, validator::* };
    use openbrush::{ test_utils::*, traits::{ AccountId, Balance } };
    use global::{ providers::data::bounty::* };
    
    

    #[ink::test]
    fn new_works() {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut bounty = Bounty::new(a);

        // let res = bounty::bounty::BountyController::deposit_bounty(&mut bounty, b, 1000, a);
        
        // println!("the result {:?}", res);

        assert_eq!(bounty::bounty::BountyController::get_me(&mut bounty), Ok(a));
    }

    #[ink::test]
    fn withdraw_bounty_test () {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut bounty = Bounty::new(a);
 
        assert_eq!(bounty::bounty::BountyImpl::withdraw_bounty(&mut bounty, b, 1000, a, a), Err(ProtocolError::RewardIsNotBountyReward));
    }

    #[ink::test]
    fn trigger_limit_test() {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut bounty = Bounty::new(a);
        
        let _ = bounty::bounty::BountyImpl::set_trigger_limit(&mut bounty, b, 1000, a);

        assert_eq!(bounty::bounty::BountyImpl::get_trigger_limit(&mut bounty,b, a),  Err(ProtocolError::RewardIsNotBountyReward))
    }




}