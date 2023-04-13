#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]
#[openbrush::contract]
pub mod pool {
    use global::providers::{ data::a_pool::*, deployables::a_pool::* };
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
        pub fn new() -> Self {
            Self::default()
        }
    }
}