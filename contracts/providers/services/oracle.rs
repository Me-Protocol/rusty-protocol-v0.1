
pub use crate::{
    providers::common::{ roles::*, errors::ProtocolError, eunice::*, validator::* },
    controllers::{deployables::a_pool::*, services::brands::*},
};
use ink::{ prelude::vec::Vec };

use ink::primitives::AccountId;
use openbrush::traits::Balance;

use super::customers::BRAND_ID_TYPE;


pub trait OracleImpl {

    fn determine_needed_reward_b_given_reward_a
    (
        reward_a: AccountId,
        reward_b: AccountId,
        amount: Balance,
    ) -> Result<u128, ProtocolError>
    {
        let me_needed = APoolRef::determine_optimal_needed_me_amount_given_reward_amount(&reward_a, amount)?;
        let (_,_,_,_,_,_,slippage_in_precision,_) = APoolRef::get_open_rewards_configurations(&reward_b);
        let reward_b_amount = APoolRef::determine_needed_reward_amount_given_me_amount(&reward_b, me_needed, slippage_in_precision)?;

        Ok(reward_b_amount)
     }

     fn determine_me_and_reward_balance_in_a_pool( 
        pool: AccountId,
        reward: AccountId,
        me_token: AccountId
    ) -> (Balance, Balance) {
       objectively_obtain_pool_balances(
            pool,
            reward,
            me_token
        )
    }

    fn get_all_brands(protocol: AccountId) -> Vec<BRAND_ID_TYPE> {
        BrandRef::get_all_brands(&protocol)
    }
}
