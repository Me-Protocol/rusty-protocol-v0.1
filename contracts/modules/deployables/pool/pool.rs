#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::implementation(AccessControl, PSP34, PSP34Enumerable)]
#[openbrush::contract]
pub mod pool {
    use global::providers::{
        data::{a_pool::*},
        deployables::{a_pool::{ *, PoolSetUpConfig, PoolConfig, POOL_ADMIN, POOL_MANAGER, PoolImpl }, bounty::{OPEN_REWARDS_MANAGER, OPEN_REWARDS_ADMIN}},
        common::roles::*,
    };
    use openbrush::{
        contracts::{ access_control::{*, self}, psp34::{extensions::enumerable::*, self}, reentrancy_guard::*, traits::ownable },
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
        pub psp34: psp34::Data<>,

        #[storage_field]
        enumerable: enumerable::Data,

        #[storage_field]
        pub guard: reentrancy_guard::Data,
    }


    impl PoolImpl for Pool{}

    impl PoolController for Pool {

        #[ink(message)]
        fn start_open_rewards(&mut self) -> Result<u128, ProtocolError> {
            PoolImpl::start_open_rewards(self)
        }

        #[ink(message)]
        fn pause_open_rewards( &mut self) -> Result<bool, ProtocolError> {
            PoolImpl::pause_open_rewards(self)
        }    

        #[ink(message)]
        fn resume_open_rewards( &mut self) -> Result<bool, ProtocolError> {
            PoolImpl::resume_open_rewards(self)
        }

        #[ink(message)]
        fn check_open_rewards_state(&self) -> bool{
            PoolImpl::check_open_rewards_state(self)
        }

        #[ink(message)]
        fn add_protocol_me_offset( &mut self, expected_me_offset: Balance) -> Result<Balance, ProtocolError> {
            PoolImpl::add_protocol_me_offset(self, expected_me_offset)
        }

        #[ink(message)]
        fn withdraw_protocol_me_offset_only_me_tokens(
            &mut self,
            me_amount_to_withdraw: Balance
        ) -> Result<Balance, ProtocolError> {
            PoolImpl::withdraw_protocol_me_offset_only_me_tokens(self, me_amount_to_withdraw)
        }

        #[ink(message)]
        fn withdraw_protocol_me_offset_withdrawable(
            &mut self,
            me_amount_to_withdraw: Balance
        ) -> Result<bool, ProtocolError> {
            PoolImpl::withdraw_protocol_me_offset_withdrawable(self, me_amount_to_withdraw)
        }

        #[ink(message)]
        fn withdraw_protocol_me_offset_with_rewards_if_need_be(
            &mut self,
            me_amount_to_withdraw: Balance
        ) -> Result<(Balance, Balance), ProtocolError> {
            PoolImpl::withdraw_protocol_me_offset_with_rewards_if_need_be(self, me_amount_to_withdraw)
        }

        #[ink(message)]
        fn forcefully_withdraw_protocol_offset_me_tokens(
            &mut self,
            me_amount_to_withdraw: Balance
        ) -> Result<Balance, ProtocolError> {
            PoolImpl::forcefully_withdraw_protocol_offset_me_tokens(self, me_amount_to_withdraw)
        }

        #[ink(message)]
        fn record_liquidity_provided(
            &mut self,
            pool_numerator_amount: Balance,
            pool_divisor_amount: Balance,
            requestor: AccountId,
            to: AccountId
        ) -> Result<(), ProtocolError> {
            PoolImpl::record_liquidity_provided(self, pool_numerator_amount, pool_divisor_amount, requestor, to)
        }

        #[ink(message)]
        fn withdraw_liquidity(
            &mut self,
            position_id: Id,
            reward_pool_token_amount: Balance,
            me_pool_token_amount: Balance,
            requestor: AccountId,
            to: AccountId
        ) -> Result<(), ProtocolError> {
            PoolImpl::withdraw_liquidity(self, position_id, reward_pool_token_amount,me_pool_token_amount, requestor, to)
        }


        #[ink(message)]
        fn add_open_rewards_manager(&mut self, new_pool_manager: AccountId) -> Result<(), ProtocolError> {
            PoolImpl::add_open_rewards_manager(self, new_pool_manager)
        }

        #[ink(message)]
        fn remove_open_rewards_manager(&mut self, pool_manager: AccountId) -> Result<(), ProtocolError> {
            PoolImpl::remove_open_rewards_manager(self, pool_manager)
        }

        #[ink(message)]
        fn check_if_is_open_rewards_manager(&self, pool_manager: AccountId) -> Result<bool, ProtocolError> {
            PoolImpl::check_if_is_open_rewards_manager(self, pool_manager)
        }

        #[ink(message)]
        fn get_liquidity_ratios(&self) -> (u128, u128) {
            PoolImpl::get_liquidity_ratios(self)
        }

        #[ink(message)]
        fn get_liquidity_ids(&self) -> (AccountId, AccountId, AccountId) {
            PoolImpl::get_liquidity_ids(self)
        }

        #[ink(message)]
        fn get_open_rewards_state(
            &self
        ) -> (bool, bool, bool, AccountId, AccountId, AccountId, Balance,Balance, Balance, u64) {
            PoolImpl::get_open_rewards_state(self)
        }

        #[ink(message)]
        fn get_open_rewards_configurations(&self) -> (u128, u128, Balance, Balance, Balance, Balance, u128, bool) {
            PoolImpl::get_open_rewards_configurations(self)
        }

        #[ink(message)]
        fn initiate_outgoing_conversation(
            &mut self,
            reward_amount_in: Balance,
            expected_output_reward_amount: Balance,
            listener: AccountId,
            listener_r_optimal: u128,
            requestor: AccountId,
            output_reward_receiver: AccountId,
            slippage_in_precision: u128
        ) -> Result<Balance, ProtocolError> {
            PoolImpl::initiate_outgoing_conversation(self, reward_amount_in, expected_output_reward_amount,listener, listener_r_optimal, requestor,output_reward_receiver, slippage_in_precision)
        }

        #[ink(message)]
        fn engage_incoming_conversation(
            &mut self,
            expected_reward_amount: Balance,
            output_reward_receiver: AccountId,
            slippage_in_precision: u128
        ) -> Result<Balance, ProtocolError> {
            PoolImpl::engage_incoming_conversation(self, expected_reward_amount, output_reward_receiver, slippage_in_precision)
        }

        #[ink(message)]
        fn change_r_optimal(&mut self, new_r_optimal: u128) -> Result<bool, ProtocolError> {
            PoolImpl::change_r_optimal(self, new_r_optimal)
        }

        #[ink(message)]
        fn change_pool_config_except_r_optimal(
            &mut self,
            editable_config: EditablePoolConfig,
            ignore_ : bool
        ) -> Result<bool, ProtocolError> {
            PoolImpl::change_pool_config_except_r_optimal(self, editable_config, ignore_)
        }

        #[ink(message)]
        fn get_position_data(
            &self,
            position: u128
        ) -> Result<(Balance, Balance), ProtocolError> {
            PoolImpl::get_position_data(self,position )
        }

       #[ink(message)]
       fn get_position_by_index(
            &self,
            requestor: AccountId,
            index: u128
      ) -> Result<Id, ProtocolError> {
        PoolImpl::get_position_by_index(self, requestor, index )
      }

      #[ink(message)]
      fn get_all_positions(&self, requestor: AccountId) -> Result<Vec<Id>, ProtocolError> {
        PoolImpl::get_all_positions(self, requestor)
      }

      #[ink(message)]
      fn determine_needed_reward_amount_given_me_amount(&mut self, me_amount: Balance, slippage_in_precision: u128)-> Result<Balance, ProtocolError>{
        PoolImpl::determine_needed_reward_amount_given_me_amount(self, me_amount,slippage_in_precision)
      }

      #[ink(message)]
      fn determine_optimal_needed_me_amount_given_reward_amount(&mut self, reward_amount: Balance)-> Result<Balance, ProtocolError> {
        PoolImpl::determine_optimal_needed_me_amount_given_reward_amount(self, reward_amount)
      } 

      #[ink(message)]     
      fn get_r_optimal(&mut self)-> Result<Balance, ProtocolError>{
        PoolImpl::get_r_optimal(self)
      }

      #[ink(message)]   
      fn get_balance(&self, token:AccountId, account: AccountId) -> Balance {
          PoolImpl::get_balance(self, token, account)
      }


    }


    impl Pool {
        #[ink(constructor)]
        pub fn new(
            reward: AccountId,
            me_token: AccountId,
            config: PoolSetUpConfig
        ) -> Self {
            let mut instance = Self::default();

            let caller = instance.env().caller();
         
            instance.pool_state = PoolState {
                started: false,
                active: false,
                busy: false,
                initiator: caller,
                reward,
                me_token,
                last_reward_amount: 0,
                last_me_amount: 0,
                protocol_me_offset: 0,
                last_transaction_time: 0,
            };

            instance.pool_config = PoolConfig {
                r_optimal: config.r_optimal,
                maximum_r_limit: config.maximum_r_limit,
                minimum_reward_amount_for_conversation: config.minimum_reward_amount_for_conversation,
                minimum_me_amount_for_conversation: config.minimum_me_amount_for_conversation,
                notify_reward_amount: config.notify_reward_amount,
                notify_me_amount: config.notify_me_amount,
                default_slippage_in_precision: config.default_slippage_in_precision,
                allow_internal_swap: config.allow_internal_swap,
            };

            access_control::InternalImpl::_init_with_admin(&mut instance, Some(caller));

            // instance._init_with_admin(caller);

            access_control::InternalImpl::_setup_role(&mut instance,OPEN_REWARDS_ADMIN, Some(caller));

            // instance._setup_role(OPEN_REWARDS_ADMIN,caller);

            access_control::InternalImpl::_setup_role(&mut instance,OPEN_REWARDS_MANAGER, Some(caller));
            
            // instance._setup_role(OPEN_REWARDS_MANAGER, caller);
            
            access_control::InternalImpl::_setup_role(&mut instance, PROTOCOL, Some(caller));
            // instance._setup_role(PROTOCOL, caller);
            
            access_control::InternalImpl::_set_role_admin(&mut instance, OPEN_REWARDS_MANAGER, OPEN_REWARDS_ADMIN);

            instance
        }
    }
}