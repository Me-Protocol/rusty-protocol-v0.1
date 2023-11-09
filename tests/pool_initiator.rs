#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]



#[cfg(test)]
mod pool_initiator_test {
    use ink::primitives::Hash;
    use pool_initiator::pool_initiator::*;
    use global::{ providers::data::a_pool::* };
    use global::providers::  common::{ roles::*, errors::ProtocolError, eunice::*, validator::* };
    // use pool::pool::PoolImpl;
    use openbrush::{ test_utils::*, traits::{ AccountId, Balance } };

    

    #[ink::test]
    fn new_works() {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        // let mut  pool = PoolInitiator::new([0; 32]);

        // assert_eq!(pool::pool::PoolController::check_open_rewards_state(&pool), false);
    }
}