#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]



#[cfg(test)]
mod reward_initiator_test {
    use core::convert::TryFrom;

    use global::providers::common::types::BRAND_ID_TYPE;
    use global::providers::deployables::a_pool::PoolSetUpConfig;
    use ink::primitives::Hash;
    use reward_initiator::reward_initiator::*;
    use openbrush::test_utils::*;

    

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
    
        let mut reward_initiator = RewardInitiator::new(hash);

        assert_eq!(reward_initiator.get_pool_hash(), hash);
    }

    #[ink::test]
    fn update_reward_hash_test() {
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
    
        let mut reward_initiator = RewardInitiator::new(hash);

        let new_hash_bytes: [u8; 32] = [
            0x03, 0x01, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A,
            0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14,
            0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E,
            0x1F, 0x20,
        ];
    
        let new_hash: Hash = Hash::try_from(&new_hash_bytes[..]).expect("Failed to create Hash");
    

       let _ = reward_initiator.update_pool_hash(new_hash);

        assert_eq!(reward_initiator.get_pool_hash(), new_hash);
    }


    #[ink::test]
    fn create_new_reward() {
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
    
        let mut reward_initiator = RewardInitiator::new(hash);

        let reward_config=  PoolSetUpConfig {
            r_optimal: 0,
            maximum_r_limit: 12,
            minimum_reward_amount_for_conversation: 1,
            minimum_me_amount_for_conversation: 1,
            notify_reward_amount: 1,
            notify_me_amount: 1,
            default_slippage_in_precision: 1,
            allow_internal_swap: false,
        };

        let id: BRAND_ID_TYPE = [0; 10];
        pub const ZERO_ADDRESS: [u8; 32] = [0u8; 32];

        // let result = reward_initiator.create_new_reward(a, b, reward_config,  vec![1, 2, 3, 4, 5], id).unwrap();

        assert_eq!(reward_initiator.get_brand_reward(id), ZERO_ADDRESS.into());
    }






}