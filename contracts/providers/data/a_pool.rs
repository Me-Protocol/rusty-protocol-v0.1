use openbrush::{ traits::{ AccountId, Balance, ZERO_ADDRESS } };
use openbrush::traits::Storage;
use ink::storage::traits::StorageLayout;
use crate::providers::common::database::*;

#[derive(Debug, Clone, Copy)]
#[openbrush::upgradeable_storage(A_POOL_STATE)]
pub struct PoolState {
    pub started: bool,
    pub active: bool,
    pub initiator: AccountId,
    pub reward: AccountId,
    pub me_token: AccountId,
    pub last_reward_amount: Balance,
    pub last_me_amount: Balance,
    pub protocol_me_offset: Balance,
    pub last_transaction_time: u64,
    locked: bool,
}

#[derive(Debug, Clone, Copy)]
#[openbrush::upgradeable_storage(A_POOL_CONFIG)]
pub struct PoolConfig {
    pub setup_me_amount: Balance,
    pub r_optimal: u128,
    pub maximum_r_limit: u128,
    pub minimum_reward_amount_for_conversation: Balance,
    pub minimum_me_amount_for_conversation: Balance,
    pub notify_reward_amount: Balance,
    pub notify_me_amount: Balance,
    pub default_slippage_in_precision: u128,
    pub allow_internal_swap: bool,
}

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode, StorageLayout)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub struct EditablePoolConfig {
    pub maximum_r_limit: u128,
    pub minimum_reward_amount_for_conversation: Balance,
    pub minimum_me_amount_for_conversation: Balance,
    pub notify_reward_amount: Balance,
    pub notify_me_amount: Balance,
    pub default_slippage_in_precision: u128,
    pub allow_internal_swap: bool,
}

impl Default for PoolState {
    fn default() -> Self {
        Self {
            started: Default::default(),
            active: Default::default(),
            initiator: ZERO_ADDRESS.into(),
            reward: ZERO_ADDRESS.into(),
            me_token: ZERO_ADDRESS.into(),
            last_reward_amount: Default::default(),
            last_me_amount: Default::default(),
            protocol_me_offset: Default::default(),
            last_transaction_time: Default::default(),
            locked: Default::default(),
        }
    }
}

impl Default for PoolConfig {
    fn default() -> Self {
        Self {
            setup_me_amount: Default::default(),
            r_optimal: Default::default(),
            maximum_r_limit: Default::default(),
            minimum_reward_amount_for_conversation: Default::default(),
            minimum_me_amount_for_conversation: Default::default(),
            notify_reward_amount: Default::default(),
            notify_me_amount: Default::default(),
            default_slippage_in_precision: Default::default(),
            allow_internal_swap: Default::default(),
        }
    }
}

impl Default for EditablePoolConfig {
    fn default() -> Self {
        Self {
            maximum_r_limit: Default::default(),
            minimum_reward_amount_for_conversation: Default::default(),
            minimum_me_amount_for_conversation: Default::default(),
            notify_reward_amount: Default::default(),
            notify_me_amount: Default::default(),
            default_slippage_in_precision: Default::default(),
            allow_internal_swap: Default::default(),
        }
    }
}

pub fn set_pool_initiator<T>(instance: &mut T, initiator: AccountId) where T: Storage<PoolState> {
    instance.data().initiator = initiator;
}

pub fn set_pool_reward<T>(instance: &mut T, reward: AccountId) where T: Storage<PoolState> {
    instance.data().reward = reward;
}

pub fn set_me_token<T>(instance: &mut T, me: AccountId) where T: Storage<PoolState> {
    instance.data().me_token = me;
}