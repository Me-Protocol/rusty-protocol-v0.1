// #![cfg_attr(not(feature = "std"), no_std)]
// #![feature(min_specialization)]

// #[cfg(test)]
// mod pool_test {
//     use pool::pool::*;
//     use global::{ providers::data::a_pool::*, controllers::deployables::a_pool::* };

//     use openbrush::{ test_utils::*, traits::{ AccountId, Balance } };

//     #[ink::test]
//     fn new_works() {
//         let accounts = accounts();
//         let a = accounts.bob;
//         let b = accounts.alice;
//         let pool = Pool::new(
//             a,
//             b,
//             a,
//             PoolSetUpConfig {
//                 r_optimal: 0,
//                 maximum_r_limit: 12,
//                 minimum_reward_amount_for_conversation: 1,
//                 minimum_me_amount_for_conversation: 1,
//                 notify_reward_amount: 1,
//                 notify_me_amount: 1,
//                 default_slippage_in_precision: 1,
//                 allow_internal_swap: false,
//             }
//         );

//         assert_eq!(pool.provide_pool_state(), (false, false, a, b, a, 0, 0, 0, 0, 0));
//     }
// }
