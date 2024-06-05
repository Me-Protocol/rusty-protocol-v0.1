#![cfg_attr(not(feature = "std"), no_std, no_main)]


/// The Oracle Contract 
/// 
/// 
/// The oracle contract is a contract containing just one function. What it does is to get the 
/// coresponding price of a reward from one pool to the other pool.
/// Just like a price oracle, the oracle contract do well to get the equivalent amount of reward 
/// from Pool A to Pool B and vice versa 

#[openbrush::contract]
mod oracle {

    use global::providers::{
        common::types::BRAND_ID_TYPE, data::protocol, deployables::a_pool::*, services::oracle::OracleImpl
    };
    use ink::{ prelude::vec::Vec };



    #[ink(storage)]
    pub struct Oracle {
        started: bool,
    }

    impl Oracle {

        #[ink(constructor)]
        pub fn new(init_started: bool) -> Self {
            Self { started: init_started }
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

        #[ink(message)]
        pub fn determine_me_and_reward_balance_in_a_pool( 
            &self,
            pool: AccountId,
            reward: AccountId,
            me_token: AccountId
        ) -> (Balance, Balance) {
            <Oracle as OracleImpl>::determine_me_and_reward_balance_in_a_pool(pool, reward, me_token)
        }


        #[ink(message)]
        pub fn get_all_brands(&self, protocol: AccountId) -> Vec<BRAND_ID_TYPE> {
            <Oracle as OracleImpl>::get_all_brands(protocol)
        }


        
    }

    impl OracleImpl for Oracle {}

}
