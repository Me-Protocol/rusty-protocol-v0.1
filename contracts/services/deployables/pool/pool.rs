#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]
#[openbrush::contract]
pub mod pool {
    use global::providers::{ data::a_pool::*, deployables::a_pool::{*, PoolSetUpConfig, PoolConfig, POOL_ADMIN, POOL_MANAGER} , common::roles::*};
    use openbrush::{
        contracts::{ access_control::*, psp34::extensions::enumerable::*, reentrancy_guard::* },
        traits::{ Storage },
    };

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Pool {
        #[storage_field]
        pub pool_state: PoolState,

        #[storage_field]
        pub pool_config: PoolConfig,

        #[storage_field]
        pub position: Position,

        #[storage_field]
        pub access: access_control::Data,

        #[storage_field]
        pub psp34: psp34::Data<enumerable::Balances>,

        #[storage_field]
        pub guard: reentrancy_guard::Data,
    }

    impl PoolController for Pool {}

    impl Pool {
        #[ink(constructor)]
        pub fn new(
        initiator: AccountId, 
        reward: AccountId,
        me_token: AccountId,
        config: PoolSetUpConfig,
        ignoreDefault: bool,
        ) -> Self {
        
        let mut instance =   Self::default();
        
        let caller = instance.env().caller();
        
        instance.pool_state = PoolState{
                started: false,
                active: false,
                initiator,
                reward,
                me_token,
                last_reward_amount: 0,
                last_me_amount: 0,
                protocol_me_offset: 0,
                setup_me_amount: 0,
                last_transaction_time: 0,
            };

        instance.pool_config = PoolConfig{
                r_optimal: Default::default(),
                maximum_r_limit: config.maximum_r_limit,
                minimum_reward_amount_for_conversation: config.minimum_reward_amount_for_conversation,
                minimum_me_amount_for_conversation: config.minimum_me_amount_for_conversation,
                notify_reward_amount: config.notify_reward_amount,
                notify_me_amount: config.notify_me_amount,
                default_slippage_in_precision: config.default_slippage_in_precision,
                allow_internal_swap: config.allow_internal_swap,
            };

           instance._init_with_admin(caller);
            
           instance.grant_role(POOL_ADMIN, caller).expect("");
           
           instance.grant_role(POOL_MANAGER, caller).expect("");
           
           instance

        }
        }
    }