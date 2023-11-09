#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]



#[cfg(test)]
mod pool_initiator_test {
    use core::convert::TryFrom;

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

        let hash_bytes: [u8; 32] = [
            0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A,
            0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14,
            0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E,
            0x1F, 0x20,
        ];
    
        let hash: Hash = Hash::try_from(&hash_bytes[..]).expect("Failed to create Hash");
    
        let mut pool_initiator = PoolInitiator::new(hash);

        assert_eq!(pool_initiator.get_pool_hash(), hash);
    }
}