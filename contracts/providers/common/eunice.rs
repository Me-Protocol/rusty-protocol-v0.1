use openbrush::{ contracts::{ traits::{ psp22::PSP22Ref } }, traits::{ AccountId, Balance } };

use crate::providers::common::constants::*;

pub fn _calculate_pool_ratio(reward_amount: Balance, me_amount: Balance) -> u128 {
    (reward_amount * PRECISION) / me_amount
}

pub fn objectively_obtain_single_balance(pool: AccountId, reward: AccountId) -> Balance {
    PSP22Ref::balance_of(&reward, pool)
}

pub fn objectively_obtain_pool_balances(
    pool: AccountId,
    reward: AccountId,
    me: AccountId
) -> (Balance, Balance) {
    let reward_amount = PSP22Ref::balance_of(&reward, pool);
    let me_amount = PSP22Ref::balance_of(&me, pool);
    return (reward_amount, me_amount);
}

pub fn objectively_obtain_pool_ratio(pool: AccountId, reward: AccountId, me: AccountId) -> u128 {
    let (a, b) = objectively_obtain_pool_balances(pool, reward, me);
    _calculate_pool_ratio(a, b)
}

pub fn calculate_exchange_ratio(r_last: u128, percentage_change: u128, r_optimal: u128) -> u128 {
    let mut r = (r_last * (1 * PRECISION + (EXCHANGE_SLOPE * percentage_change) / 100)) / PRECISION;
    r = if r < r_optimal { r_optimal } else { r };
    r
}

pub fn add_slippage_considerations(
    actual_value: u128,
    tolerated_slippage_in_precision: u128
) -> u128 {
    (actual_value * (100 + tolerated_slippage_in_precision)) / 100
}

pub fn determine_reward_amount_for_swap_given_me_amount(
    r_last: u128,
    r_optimal: u128,
    me_amount: Balance,
    last_me_amount: u128,
    slippage_in_precision: u128
) -> Balance {
    let percentage_change = (me_amount * 100) / last_me_amount;
    let actual_reward =
        (me_amount * calculate_exchange_ratio(r_last, percentage_change, r_optimal)) / PRECISION;
    add_slippage_considerations(actual_reward, slippage_in_precision)
}

pub fn determine_optimal_me_amount_for_swap_given_reward_amount(
    r_optimal: u128,
    reward_amount: Balance
) -> Balance {
    (reward_amount * PRECISION) / r_optimal
}

pub fn check_if_within_acceptable_slippage_range(
    obtained_value: u128,
    actual_value: u128,
    slipage_in_precision: u128
) -> bool {
    let a = if obtained_value > actual_value {
        obtained_value - actual_value
    } else {
        actual_value - obtained_value
    };
    (a * PRECISION) / actual_value <= (PRECISION * slipage_in_precision) / 100
}

pub fn check_if_within_acceptable_percent_range(obtained_value: u128, actual_value: u128) -> bool {
    let a = if obtained_value > actual_value {
        obtained_value - actual_value
    } else {
        actual_value - obtained_value
    };
    (a * PRECISION) / actual_value <= PRECISION / 100
}