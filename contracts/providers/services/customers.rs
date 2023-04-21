
pub use crate::{
    providers::{
        data::{ brand::*, a_pool::*, a_reward::*, protocol::* },
        common::{
            roles::*,
            errors::ProtocolError,
            eunice::*,
            validator::*,
            types::*,
            constants::*,
        },
    },
    controllers::{
        services::customers::*,
        deployables::{ a_pool::*, reward::*, treasury::*, bounty::* },
    },
};

use ink::{
    prelude::vec::Vec,
    primitives::AccountId,
    env::hash::{ Keccak256, CryptoHash, HashOutput },
};

use openbrush::{
    modifier_definition,
    contracts::{
        access_control::*,
        traits::{ psp22::*, psp22::extensions::metadata::* },
        reentrancy_guard::*,
        psp34::Id,
    },
    modifiers,
    traits::{ Balance, Storage, String, ZERO_ADDRESS },
};
use scale::KeyedVec;

impl<
    T: Storage<BrandRecords> +
        Storage<RewardRecords> +
        Storage<access_control::Data> +
        Storage<ProtocolRecords>
> CustomerController for T {

    fn spend_rewards_on_issuing_brand(&mut self, reward: AccountId, amount: Balance) -> Result<bool, ProtocolError>{
        ensure_address_is_not_zero_address(reward)?;
        ensure_value_is_not_zero(amount)?;
        let requestor = Self::env().caller();
        let treasury = get_treasury_id(self);
        PSP22Ref::transfer_from(&reward,requestor,treasury,amount,Vec::<u8>::new())?;
        TreasuryRef::deposit_reward_and_or_me(&treasury,reward,amount,0,DEFAULT_BRAND_ID,requestor,None)?;
        Ok(true) 
    }

    fn spend_rewards_on_other_brand(&mut self, reward_at_hand: AccountId, targeted_reward:AccountId, amount_of_reward_at_hand: Balance, expected_amount_of_targetted_reward: Balance) -> Result<bool, ProtocolError>{
        ensure_address_is_not_zero_address(reward_at_hand)?;
        ensure_address_is_not_zero_address(targeted_reward)?;
        ensure_value_is_not_zero(amount_of_reward_at_hand)?;
        ensure_value_is_not_zero(expected_amount_of_targetted_reward)?;
        if !check_if_reward_is_opened(self, reward_at_hand).unwrap() {return Err(ProtocolError::RewardIsNotOpened)}
        if !check_if_reward_is_opened(self, targeted_reward).unwrap() {return Err(ProtocolError:: TragetedRewardIsNotOpened)}

        let actual_bounty_contribution =  if check_if_bounty_is_enabled(self, reward_at_hand).unwrap(){
            let bounty_contribution_in_precision = get_bounty_contribution_in_precision_for_reward(self, reward_at_hand).unwrap();
             let result = calculate_due_bounty_contribution(amount_of_reward_at_hand, bounty_contribution_in_precision).unwrap();
             result
        }
        else{ 0 };
        let reward_amount_after_bounty_contribution = amount_of_reward_at_hand - actual_bounty_contribution;
       
        let requestor = Self::env().caller();
        let treasury = get_treasury_id(self);
        let bounty = get_bount_id(self);
        let reward_at_hand_pool = get_pool_id(self, reward_at_hand).unwrap();
        let targeted_reward_pool = get_pool_id(self, targeted_reward).unwrap();
        let me_for_inter_brand_conversation = APoolRef::determine_optimal_needed_me_amount_given_reward_amount(&targeted_reward_pool, expected_amount_of_targetted_reward)?;
        let expected_reward_at_hand_for_successful_conversation = APoolRef::determine_needed_reward_amount_given_me_amount(&reward_at_hand_pool,me_for_inter_brand_conversation, 0)?;
        if expected_reward_at_hand_for_successful_conversation > reward_amount_after_bounty_contribution {
           return Err(ProtocolError::InsufficientRewardAmountDepositedForConversation);
        }
        if actual_bounty_contribution > 0 {
            BountyRef::deposit_bounty(&bounty,reward_at_hand,actual_bounty_contribution,requestor)?;
        }

        let targeted_reward_optimal_ratio = APoolRef::get_r_optimal(&targeted_reward_pool).unwrap();
        PSP22Ref::transfer_from(&reward_at_hand,requestor,reward_at_hand_pool,reward_amount_after_bounty_contribution,Vec::<u8>::new())?;
       let obtained_targeted_reward =  APoolRef::initiate_outgoing_conversation(&reward_at_hand_pool, reward_amount_after_bounty_contribution,
            expected_amount_of_targetted_reward,
            targeted_reward_pool,
            targeted_reward_optimal_ratio,
            requestor,
            treasury,
            0).unwrap();
            TreasuryRef::deposit_reward_and_or_me(&treasury,targeted_reward,obtained_targeted_reward,0,DEFAULT_BRAND_ID,requestor,None)?;
            Ok(true)
    }

    
    fn exchange_brand_rewards(&mut self, reward_at_hand: AccountId, targeted_reward:AccountId, amount_of_reward_at_hand: Balance, expected_amount_of_targetted_reward: Balance, to: AccountId) -> Result<bool, ProtocolError>{
        ensure_address_is_not_zero_address(reward_at_hand)?;
        ensure_address_is_not_zero_address(targeted_reward)?;
        ensure_address_is_not_zero_address(to)?;
        ensure_value_is_not_zero(amount_of_reward_at_hand)?;
        ensure_value_is_not_zero(expected_amount_of_targetted_reward)?;

        if !check_if_reward_is_opened(self, reward_at_hand).unwrap() {return Err(ProtocolError::RewardIsNotOpened)}
        if !check_if_reward_is_opened(self, targeted_reward).unwrap() {return Err(ProtocolError:: TragetedRewardIsNotOpened)}

        let actual_bounty_contribution =  if check_if_bounty_is_enabled(self, reward_at_hand).unwrap(){
            let bounty_contribution_in_precision = get_bounty_contribution_in_precision_for_reward(self, reward_at_hand).unwrap();
             let result = calculate_due_bounty_contribution(amount_of_reward_at_hand, bounty_contribution_in_precision).unwrap();
             result
        }
        else{ 0 };
        let reward_amount_after_bounty_contribution = amount_of_reward_at_hand - actual_bounty_contribution;
       
        let requestor = Self::env().caller();
        let bounty = get_bount_id(self);
        let reward_at_hand_pool = get_pool_id(self, reward_at_hand).unwrap();
        let targeted_reward_pool = get_pool_id(self, targeted_reward).unwrap();
        let me_for_inter_brand_conversation = APoolRef::determine_optimal_needed_me_amount_given_reward_amount(&targeted_reward_pool, expected_amount_of_targetted_reward)?;
        let expected_reward_at_hand_for_successful_conversation = APoolRef::determine_needed_reward_amount_given_me_amount(&reward_at_hand_pool,me_for_inter_brand_conversation, 0)?;
        if expected_reward_at_hand_for_successful_conversation > reward_amount_after_bounty_contribution {
           return Err(ProtocolError::InsufficientRewardAmountDepositedForConversation);
        }
        if actual_bounty_contribution > 0 {
            BountyRef::deposit_bounty(&bounty,reward_at_hand,actual_bounty_contribution,requestor)?;
        }

        let targeted_reward_optimal_ratio = APoolRef::get_r_optimal(&targeted_reward_pool).unwrap();
        PSP22Ref::transfer_from(&reward_at_hand,requestor,reward_at_hand_pool,reward_amount_after_bounty_contribution,Vec::<u8>::new())?;
        APoolRef::initiate_outgoing_conversation(&reward_at_hand_pool, reward_amount_after_bounty_contribution,
            expected_amount_of_targetted_reward,
            targeted_reward_pool,
            targeted_reward_optimal_ratio,
            requestor,
            to,
            0)?;
        
            Ok(true)
    }

}

