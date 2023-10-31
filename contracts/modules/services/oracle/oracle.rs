#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod oracle {

    use global::providers::{
        data::{a_pool::*},
        deployables::{a_pool::{ *, PoolSetUpConfig, PoolConfig, POOL_ADMIN, POOL_MANAGER, PoolImpl }, bounty::{OPEN_REWARDS_MANAGER, OPEN_REWARDS_ADMIN}},
        common::roles::*, services::oracle::OracleImpl,
    };
    use ink::env::call::ConstructorReturnType;
    use openbrush::{
        contracts::{ access_control::{*, self}, psp34::{extensions::enumerable::*, self}, reentrancy_guard::*, traits::ownable },
        traits::{ Storage },
    };


    #[ink(storage)]
    pub struct Oracle {
        /// Stores a single `bool` started on the storage.
        started: bool,
    }

    impl Oracle {

        #[ink(constructor)]
        pub fn new(init_started: bool) -> Self {
            Self { started: init_started }
        }

        #[ink(constructor)]
        pub fn default() -> Self {
            Self::new(Default::default())
        }

        #[ink(message)]
        pub fn determine_needed_reward_b_given_reward_a
        (  
            &self,
            reward_a: AccountId,
            reward_b: AccountId,
            amount: Balance,
        ) -> Result<u128, ProtocolError>
        {
           <Oracle as OracleImpl>::determine_needed_reward_b_given_reward_a(reward_a, reward_b, amount)
        }
        
    }

    impl OracleImpl for Oracle {}

}
