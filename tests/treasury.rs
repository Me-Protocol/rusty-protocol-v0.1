#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]



#[cfg(test)]
mod treasury_test {
    
    use treasury::treasury::*;
    use openbrush::test_utils::*;
    
    
    

    #[ink::test]
    fn new_works() {
        let accounts = accounts();
        let a = accounts.bob;
        let _b = accounts.alice;
        let mut treasury = Treasury::new(a);

        assert_eq!(treasury::treasury::TreasuryImpl::get_me_id(&mut treasury), Ok(a));
    }

    #[ink::test]
    fn withdraw_reward_and_or_me_test () {
        let accounts = accounts();
        let a = accounts.bob;
   
        let mut treasury = Treasury::new(a);
        let id: BRAND_ID_TYPE = [0; 10];
        // treasury::treasury::TreasuryImpl::deposit_reward_and_or_me(&mut treasury, b, 1000,1000,id, a, Some(String::from("metadata"))
        assert_eq!(treasury::treasury::TreasuryImpl::receive_cai(&mut treasury, 1000,id, a, Some(String::from("metadata"))), Err(ProtocolError::BrandCanNotBeEmpty));
    }

    #[ink::test]
    fn get_reward_notify_limit_test() {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut treasury = Treasury::new(a);
  
        assert_eq!(treasury::treasury::TreasuryImpl::get_reward_notify_limit(&mut treasury,b, a),  Ok(0));
    }

    #[ink::test]
    fn set_me_notify_limit_test() {
        let accounts = accounts();
        let a = accounts.bob;
        let _b = accounts.alice;
        let mut treasury = Treasury::new(a);
        let _id: BRAND_ID_TYPE = [0; 10];

        assert_eq!(treasury::treasury::TreasuryImpl::set_me_notify_limit(&mut treasury, 100, a),  Ok(true));
    }

    #[ink::test]
    fn get_me_notify_limit_test() {
        let accounts = accounts();
        let a = accounts.bob;
        let _b = accounts.alice;
        let mut treasury = Treasury::new(a);
        
        let _ = treasury::treasury::TreasuryImpl::set_me_notify_limit(&mut treasury, 100, a);

        assert_eq!(treasury::treasury::TreasuryImpl::get_me_notify_limit(&mut treasury,a),  Ok(100));
    }







}