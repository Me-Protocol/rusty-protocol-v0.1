#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]



#[cfg(test)]
mod pool_test {
    use pool::pool::*;
    use global::{ providers::data::a_pool::* };
    use global::providers::  common::{ roles::*, errors::ProtocolError, eunice::*, validator::* };
    use openbrush::{ test_utils::*, traits::{ AccountId, Balance } };

    

    #[ink::test]
    fn new_works() {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut  pool = Pool::new(
            a,
            b,
            PoolSetUpConfig {
                r_optimal: 0,
                maximum_r_limit: 12,
                minimum_reward_amount_for_conversation: 1,
                minimum_me_amount_for_conversation: 1,
                notify_reward_amount: 1,
                notify_me_amount: 1,
                default_slippage_in_precision: 1,
                allow_internal_swap: false,
            }
        );

        assert_eq!(pool::pool::PoolController::check_open_rewards_state(&pool), false);
    }

    #[ink::test]
    fn start_open_rewards_fail () {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut  pool = Pool::new(
            a,
            b,
            PoolSetUpConfig {
                r_optimal: 0,
                maximum_r_limit: 12,
                minimum_reward_amount_for_conversation: 1,
                minimum_me_amount_for_conversation: 1,
                notify_reward_amount: 1,
                notify_me_amount: 1,
                default_slippage_in_precision: 1,
                allow_internal_swap: false,
            }
        );
     
        assert_eq!(pool::pool::PoolController::start_open_rewards(&mut pool), Err(ProtocolError::OptimalRewardRatioCanNotBeZero));
    }

    #[ink::test]
    fn pause_open_rewards_fails () {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut  pool = Pool::new(
            a,
            b,
            PoolSetUpConfig {
                r_optimal: 0,
                maximum_r_limit: 12,
                minimum_reward_amount_for_conversation: 1,
                minimum_me_amount_for_conversation: 1,
                notify_reward_amount: 1,
                notify_me_amount: 1,
                default_slippage_in_precision: 1,
                allow_internal_swap: false,
            }
        );
     
        assert_eq!(pool::pool::PoolController::pause_open_rewards(&mut pool), Err(ProtocolError::ConversationsNotStarted));
 
    }

    #[ink::test]
    fn resume_open_rewards_fails () {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut  pool = Pool::new(
            a,
            b,
            PoolSetUpConfig {
                r_optimal: 0,
                maximum_r_limit: 12,
                minimum_reward_amount_for_conversation: 1,
                minimum_me_amount_for_conversation: 1,
                notify_reward_amount: 1,
                notify_me_amount: 1,
                default_slippage_in_precision: 1,
                allow_internal_swap: false,
            }
        );
     
        assert_eq!(pool::pool::PoolController::resume_open_rewards(&mut pool), Err(ProtocolError::OpenRewardsNotStarted));
 
    }

    #[ink::test]
    fn withdraw_protocol_me_offset_only_me_tokens_fails () {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut  pool = Pool::new(
            a,
            b,
            PoolSetUpConfig {
                r_optimal: 0,
                maximum_r_limit: 12,
                minimum_reward_amount_for_conversation: 1,
                minimum_me_amount_for_conversation: 1,
                notify_reward_amount: 1,
                notify_me_amount: 1,
                default_slippage_in_precision: 1,
                allow_internal_swap: false,
            }
        );
     
        assert_eq!(pool::pool::PoolController::withdraw_protocol_me_offset_only_me_tokens(&mut pool, 100000), Err(ProtocolError::ExpectedProtocolMeOffsetExceedsActualMeOffset));
 
    }

    #[ink::test]
    fn withdraw_protocol_me_offset_withdrawable_fails () {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut  pool = Pool::new(
            a,
            b,
            PoolSetUpConfig {
                r_optimal: 0,
                maximum_r_limit: 12,
                minimum_reward_amount_for_conversation: 1,
                minimum_me_amount_for_conversation: 1,
                notify_reward_amount: 1,
                notify_me_amount: 1,
                default_slippage_in_precision: 1,
                allow_internal_swap: false,
            }
        );
     
        assert_eq!(pool::pool::PoolController::withdraw_protocol_me_offset_withdrawable(&mut pool, 100000), Err(ProtocolError::ExpectedProtocolMeOffsetExceedsActualMeOffset));
 
    }


    #[ink::test]
    fn withdraw_protocol_me_offset_with_rewards_if_need_be_fails () {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut  pool = Pool::new(
            a,
            b,
            PoolSetUpConfig {
                r_optimal: 0,
                maximum_r_limit: 12,
                minimum_reward_amount_for_conversation: 1,
                minimum_me_amount_for_conversation: 1,
                notify_reward_amount: 1,
                notify_me_amount: 1,
                default_slippage_in_precision: 1,
                allow_internal_swap: false,
            }
        );
     
        assert_eq!(pool::pool::PoolController::withdraw_protocol_me_offset_with_rewards_if_need_be(&mut pool, 100000), Err(ProtocolError::ExpectedProtocolMeOffsetExceedsActualMeOffset));
 
    }

    #[ink::test]
    fn forcefully_withdraw_protocol_offset_me_tokens_fails () {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut  pool = Pool::new(
            a,
            b,
            PoolSetUpConfig {
                r_optimal: 0,
                maximum_r_limit: 12,
                minimum_reward_amount_for_conversation: 1,
                minimum_me_amount_for_conversation: 1,
                notify_reward_amount: 1,
                notify_me_amount: 1,
                default_slippage_in_precision: 1,
                allow_internal_swap: false,
            }
        );
     
        assert_eq!(pool::pool::PoolController::forcefully_withdraw_protocol_offset_me_tokens(&mut pool, 100000), Err(ProtocolError::ExpectedProtocolMeOffsetExceedsActualMeOffset));
 
    }

    #[ink::test]
    fn get_liquidity_ratios_test () {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut  pool = Pool::new(
            a,
            b,
            PoolSetUpConfig {
                r_optimal: 0,
                maximum_r_limit: 12,
                minimum_reward_amount_for_conversation: 1,
                minimum_me_amount_for_conversation: 1,
                notify_reward_amount: 1,
                notify_me_amount: 1,
                default_slippage_in_precision: 1,
                allow_internal_swap: false,
            }
        );
     
        assert_eq!(pool::pool::PoolController::get_liquidity_ratios(&mut pool), (0,0));
 
    }

    #[ink::test]
    fn get_liquidity_ids_test () {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut  pool = Pool::new(
            a,
            b,
            PoolSetUpConfig {
                r_optimal: 0,
                maximum_r_limit: 12,
                minimum_reward_amount_for_conversation: 1,
                minimum_me_amount_for_conversation: 1,
                notify_reward_amount: 1,
                notify_me_amount: 1,
                default_slippage_in_precision: 1,
                allow_internal_swap: false,
            }
        );
     
        assert_eq!(pool::pool::PoolController::get_liquidity_ids(&mut pool), (b,a,b));
 
    }

    #[ink::test]
    fn get_open_rewards_state_test () {
        let accounts = accounts();
        let a = accounts.bob;
        let b = accounts.alice;
        let mut  pool = Pool::new(
            a,
            b,
            PoolSetUpConfig {
                r_optimal: 0,
                maximum_r_limit: 12,
                minimum_reward_amount_for_conversation: 1,
                minimum_me_amount_for_conversation: 1,
                notify_reward_amount: 1,
                notify_me_amount: 1,
                default_slippage_in_precision: 1,
                allow_internal_swap: false,
            }
        );
     
        assert_eq!(pool::pool::PoolController::get_open_rewards_state(&mut pool), (false, false, false, b,a,b, 0, 0, 0, 0));
 
    }








}
