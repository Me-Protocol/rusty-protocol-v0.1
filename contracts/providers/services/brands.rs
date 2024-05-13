
use crate::{controllers::deployables::{reward, treasury}, providers::data::brand};
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
        services::brands::*,
        deployables::{ a_pool::*, reward::*, treasury::*, bounty::* , reward_initiator::*},
    },
};

use ink::{
    prelude::vec::Vec,
    primitives::AccountId,
    env::hash::{ Keccak256, CryptoHash, HashOutput },
};

use openbrush::{
    contracts::{
        access_control::*, psp22::PSP22TransferImpl, psp34::Id, reentrancy_guard::*, traits::psp22::{extensions::metadata::*, *}
    }, modifier_definition, modifiers, traits::{ Balance, Storage, String }
};
use scale::KeyedVec;

pub const ZERO_ADDRESS: [u8; 32] = [0u8; 32];

pub trait BrandImpl: Storage<BrandRecords> +
        Storage<RewardRecords> +
        Storage<access_control::Data> +
        Storage<ProtocolRecords> + 
        AccessControlImpl 
{
 

    fn create_new_reward(&mut self, reward: AccountId, reward_name: Option<String>, reward_symbol: Option<String>, reward_description_link:Option<String>, reward_type:u8,brand_id: BRAND_ID_TYPE, requestor: AccountId, pool_id: AccountId) -> Result<bool, ProtocolError>{

        if reward_name == None {return Err(ProtocolError::RewardNameCannotBeEmpty)}
        if reward_symbol == None {return Err(ProtocolError::RewardSymbolCannotBeEmpty)}
        ensure_address_is_not_zero_address(requestor).unwrap();
        ensure_value_is_not_zero(reward_type.into()).unwrap();

       if reward_type == FUNGIBLE_REWARD{
       let reward_details = RewardDetails {
            name: reward_name,
            symbol: reward_symbol,
            r_type: reward_type,
            verified: false,
            contract_address: reward,
            description_link: reward_description_link,
            issuing_brand: brand_id,
            open: true,
            interspendable: false,
            pool_id: pool_id,
            date_created: 20,
       };
     
       self.data::<RewardRecords>().details.insert(&reward, &reward_details);
       }

        Ok(true)
    }


    fn get_reward_details ( &self, requestor: AccountId) -> RewardDetails{

     let res = get_reward_details(self, requestor).unwrap();
        res
    }


   // Todo: Implement Role Guard
    fn update_brand_details(
        &mut self,
        brand_details: EditableBrandDetails,
        ignore_default: bool
    ) -> Result<bool, ProtocolError> {
        let requestor = Self::env().caller();
        let brand_id = Self::get_self_id(self, requestor).unwrap();
        let _ = ensure_brand_is_not_empty(brand_id);
        let mut details: BrandDetails = self.data::<BrandRecords>().details.get(brand_id).unwrap();

        if !ignore_default {
            details.online_presence = brand_details.online_presence;
            details.name = brand_details.name;
        } else {
            if brand_details.online_presence != Default::default() {
                details.online_presence = brand_details.online_presence;
            }
            if brand_details.name != Default::default() {
                details.name = brand_details.name;
            }
        }
        self.data::<BrandRecords>().details.insert(brand_id, &details);
        Ok(true)
    }

    fn get_brand_details ( &self, brand_id: BRAND_ID_TYPE) -> BrandDetails{
        get_brand_details(self, brand_id)
    }

   // Todo: Implement Role Guard
    fn update_brand_details_by_brand_id(
        &mut self,
        brand_details: BrandDetails,
        brand_id: BRAND_ID_TYPE
    ){
        let _ = ensure_brand_is_not_empty(brand_id);

        update_brand_details(self, brand_id, brand_details)
    }

   // Todo: Implement Role Guard
    fn update_brand_config(
        &mut self,
        brand_config: GlobalBrandConfig,
        ignore_default: bool
    ) -> Result<bool, ProtocolError> {
        let requestor = Self::env().caller();

        let id = Self::get_self_id(self, requestor).unwrap();

        if !ignore_default {
            self.data::<BrandRecords>().global_config.insert(&id, &brand_config);
        } else {
            let mut previous_config: GlobalBrandConfig = self
                .data::<BrandRecords>()
                .global_config.get(&id)
                .unwrap();

            if brand_config.enable_bounty_rewards != false {
                previous_config.enable_bounty_rewards = brand_config.enable_bounty_rewards;
            }
            if brand_config.enable_cais != false {
                previous_config.enable_cais = brand_config.enable_cais;
            }
            if brand_config.pay_incoming_gas_fees != false {
                previous_config.pay_incoming_gas_fees = brand_config.pay_incoming_gas_fees;
            }
            if brand_config.pay_outgoing_gas_fees != false {
                previous_config.pay_outgoing_gas_fees = brand_config.pay_outgoing_gas_fees;
            }
            self.data::<BrandRecords>().global_config.insert(&id, &previous_config);
        }

        Ok(true)
    }

   // Todo: Implement Role Guard
    fn update_brand_config_by_brand_id(
        &mut self,
        brand_config: GlobalBrandConfig,
        ignore_default: bool,
        brand_id: BRAND_ID_TYPE
    ) -> Result<bool, ProtocolError> {

        let _ = ensure_brand_is_not_empty(brand_id);
        
        if !ignore_default {
            self.data::<BrandRecords>().global_config.insert(&brand_id, &brand_config);
        } else {
            let mut previous_config: GlobalBrandConfig = self
                .data::<BrandRecords>()
                .global_config.get(&brand_id)
                .unwrap();

            if brand_config.enable_bounty_rewards != false {
                previous_config.enable_bounty_rewards = brand_config.enable_bounty_rewards;
            }
            if brand_config.enable_cais != false {
                previous_config.enable_cais = brand_config.enable_cais;
            }
            if brand_config.pay_incoming_gas_fees != false {
                previous_config.pay_incoming_gas_fees = brand_config.pay_incoming_gas_fees;
            }
            if brand_config.pay_outgoing_gas_fees != false {
                previous_config.pay_outgoing_gas_fees = brand_config.pay_outgoing_gas_fees;
            }
            self.data::<BrandRecords>().global_config.insert(&brand_id, &previous_config);
        }

        Ok(true)
    }

   // Todo: Implement Role Guard
    fn update_reward_config(
        &mut self,
        reward: AccountId,
        reward_config: RewardConfig,
        ignore_default: bool
    ) -> Result<bool, ProtocolError> {

        let requestor = Self::env().caller();
        Self::ensure_is_issuing_brand(self, reward, requestor)?;
        if !ignore_default {
            self.data::<RewardRecords>().config.insert(reward, &reward_config);
        } else {
            let mut previous_config = self.data::<RewardRecords>().config.get(&reward).unwrap();

            if reward_config.specific_exceptions != false {
                previous_config.specific_exceptions = reward_config.specific_exceptions;
            }
            if reward_config.bounty_enabled != false {
                previous_config.bounty_enabled = reward_config.bounty_enabled;
            }
            if reward_config.cai_enabled != false {
                previous_config.cai_enabled = reward_config.cai_enabled;
            }
            if reward_config.bounty_trigger_limit != Default::default() {
                previous_config.bounty_trigger_limit = reward_config.bounty_trigger_limit;
            }

            if reward_config.pay_incoming_gas_fee != false {
                previous_config.pay_incoming_gas_fee = reward_config.pay_incoming_gas_fee;
            }

            if reward_config.pay_outgoing_gas_fee !=false {
                previous_config.pay_outgoing_gas_fee = reward_config.pay_outgoing_gas_fee;
            }

            self.data::<RewardRecords>().config.insert(reward, &previous_config);
        }
        Ok(true)
    }



   // Todo: Implement Role Guard
    fn update_reward_details(
        &mut self,
        reward: AccountId,
        reward_details: EditableRewardDetails,
        ignore_default: bool
    ) -> Result<bool, ProtocolError> {
        let requestor = Self::env().caller();
        ensure_address_is_not_zero_address(reward)?;

        Self::ensure_is_issuing_brand(self, reward, requestor)?;
        let mut details = self.data::<RewardRecords>().details.get(&reward).unwrap();
        if !ignore_default {
            details.description_link = reward_details.description_link;
            details.name = reward_details.name;
            details.symbol = reward_details.symbol;
        } else {
            if reward_details.description_link != Default::default() {
                details.description_link = reward_details.description_link;
            }
            if reward_details.name != Default::default() {
                details.name = reward_details.name;
            }
            if reward_details.symbol != Default::default() {
                details.symbol = reward_details.symbol;
            }
        }
        self.data::<RewardRecords>().details.insert(reward, &details);

        Ok(true)
    }

   
    fn add_pool_manager(
        &mut self,
        reward: AccountId,
        pool_manager: AccountId
    ) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(pool_manager)?;
        ensure_address_is_not_zero_address(reward)?;
        let requestor = Self::env().caller();
 
        let pool_id = self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
        if pool_id == ZERO_ADDRESS.into() {
            return Err(ProtocolError::RewardHasNoPool);
        }
        Ok(true)
    }

    fn remove_pool_manager(
        &mut self,
        reward: AccountId,
        pool_manager: AccountId
    ) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(pool_manager)?;
        ensure_address_is_not_zero_address(reward)?;
        let requestor = Self::env().caller();
        
        let pool_id = self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
        if pool_id == ZERO_ADDRESS.into() {
            return Err(ProtocolError::RewardHasNoPool);
        }
        Ok(true)
    }

    fn set_bounty_trigger_limit(
        &mut self,
        reward: AccountId,
        trigger_limit: Balance
    ) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(reward)?;
        ensure_value_is_not_zero(trigger_limit)?;
        let bounty = get_bount_id(self);
        let requestor = Self::env().caller();
        BountyRef::set_trigger_limit(&bounty, reward, trigger_limit, requestor)?;
        Ok(true)
    }

    fn withdraw_rewards_from_bounty_pool_to_treasury(
        &mut self, 
        reward: AccountId,
        amount: Balance
    ) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(reward)?;
        ensure_value_is_not_zero(amount)?;
        let bounty = get_bount_id(self);
        let treasury = get_treasury_id(self);
        let requestor = Self::env().caller();
        BountyRef::withdraw_bounty(&bounty, reward, amount, requestor, treasury)?;

        TreasuryRef::deposit_reward_and_or_me(&treasury, reward, amount,  EMPTY_AMOUNT, DEFAULT_BRAND_ID, requestor, Some("".into()) )
    }

    fn add_liquidity_for_open_rewards (
        &mut self,
        reward: AccountId,
        reward_amount: Balance,
        me_amount: Balance
    ) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(reward)?;
        ensure_value_is_not_zero(reward_amount)?;
        ensure_value_is_not_zero(me_amount)?;
        let requestor = Self::env().caller();
        let open_reward_id =  self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
        let me_id = get_me(self);
        ensure_address_is_not_zero_address(open_reward_id).unwrap();

        if reward_amount > 0 {
            PSP22Ref::transfer_from(&reward, requestor, open_reward_id, reward_amount, Vec::<u8>::new())?;
        }
        
        if me_amount > 0 {
            PSP22Ref::transfer_from(&me_id, requestor, open_reward_id, me_amount, Vec::<u8>::new())?;
        }

        let existing_positions: Vec<Id> = APoolRef::get_all_positions(&open_reward_id, requestor)?;
        
        let position = match is_empty_positions(&existing_positions) {
            true => &EMPTY_POSITION,
            false => &existing_positions[0]
        };


        APoolRef::record_liquidity_provided(&open_reward_id,reward_amount, me_amount, requestor, requestor)?;
        
        Ok(true)
    }


    fn add_liquidity_for_open_rewards_from_treasury_add_start_pool(
        &mut self,
        reward: AccountId,
        reward_amount: Balance,
        me_amount: Balance
    ) -> Result<bool, ProtocolError> {
      
      let treasury_id = get_treasury_id(self);
      let requestor = Self::env().caller();
      let open_reward_id =  self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;

      ensure_address_is_not_zero_address(reward)?;
      ensure_address_is_not_zero_address(treasury_id)?;
      ensure_address_is_not_zero_address(open_reward_id)?;

      ensure_value_is_not_zero(reward_amount)?;
      ensure_value_is_not_zero(me_amount)?;

     let requestor_id = self.data::<BrandRecords>().id.get(requestor).unwrap_or_default();

     let brand_id = self.data::<RewardRecords>().details.get(reward).unwrap_or_default().issuing_brand;

     TreasuryRef::withdraw_reward_and_or_me(&treasury_id, reward,reward_amount, me_amount, brand_id, open_reward_id,requestor)?;
     
     let existing_positions: Vec<Id> = APoolRef::get_all_positions(&open_reward_id, requestor)?;

     let position = match is_empty_positions(&existing_positions) {
        true => &EMPTY_POSITION,
        false => &existing_positions[0]
     }; 

     APoolRef::record_liquidity_provided(&open_reward_id,reward_amount, me_amount, requestor, requestor)?;
        
     self.activate_open_rewards(open_reward_id)?;   

      Ok(true)
    }   

    fn add_liquidity_for_open_rewards_from_treasury (&mut self, reward: AccountId, reward_amount: Balance, me_amount: Balance) -> Result<bool, ProtocolError> {

      let treasury_id = get_treasury_id(self);
      let open_reward_id =  self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;

      ensure_address_is_not_zero_address(reward)?;
      ensure_address_is_not_zero_address(treasury_id)?;
      ensure_address_is_not_zero_address(open_reward_id)?;

      ensure_value_is_not_zero(reward_amount)?;
      ensure_value_is_not_zero(me_amount)?;

      let requestor = Self::env().caller();

      let brand_id = self.data::<RewardRecords>().details.get(reward).unwrap_or_default().issuing_brand;
        
      TreasuryRef::withdraw_reward_and_or_me(&treasury_id, reward,reward_amount, me_amount, brand_id, open_reward_id,requestor)?;
     
      let existing_positions: Vec<Id> = APoolRef::get_all_positions(&open_reward_id, requestor)?;
 
      let position = match is_empty_positions(&existing_positions) {
         true => &EMPTY_POSITION,
         false => &existing_positions[0]
      }; 
 
      APoolRef::record_liquidity_provided(&open_reward_id,reward_amount, me_amount, requestor, requestor)?;

    Ok(true) 
      
    }



    fn withdraw_open_rewards_liquidity_to_treasury(&mut self, reward: AccountId, liquidity_position: Id, reward_amount: Balance, me_amount: Balance) -> Result<bool, ProtocolError> {

      let to = get_treasury_id(self);
      let open_reward_id =  self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
      ensure_address_is_not_zero_address(reward)?;
      ensure_address_is_not_zero_address(to)?;
      ensure_address_is_not_zero_address(open_reward_id)?;

    ensure_value_is_not_zero(reward_amount)?;
    ensure_value_is_not_zero(me_amount)?;

    let requestor = Self::env().caller();

    let brand_id = self.data::<RewardRecords>().details.get(reward).unwrap_or_default().issuing_brand;
    
    APoolRef::withdraw_liquidity(&open_reward_id, liquidity_position, reward_amount, me_amount,requestor,  to)?;

    TreasuryRef::deposit_reward_and_or_me(&to, reward,reward_amount, me_amount,brand_id, requestor, Some("".into()))?;
    
    Ok(true)
    }


    fn update_r_optimal (&mut self, reward: AccountId, new_r_optimal: Balance) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(reward)?;
        ensure_value_is_not_zero(new_r_optimal)?;
        let requestor = Self::env().caller();
        let requestor_id = self.data::<BrandRecords>().id.get(requestor).unwrap_or_default();
        
       Ok(true)
    }




    fn fund_bounty_pool(
        &mut self,
        reward: AccountId,
        amount: Balance
    ) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(reward)?;
        ensure_value_is_not_zero(amount)?;
        let bounty = get_bount_id(self);
        let requestor = Self::env().caller();
        BountyRef::deposit_bounty(&bounty, reward, amount, requestor)?;
        Ok(true)
    }

    fn integrate_existing_reward(
        &mut self,
        reward: AccountId,
        reward_description_link: Option<String>,
        read_t_and_c: bool
    ) -> Result<bool, ProtocolError> {
        if !read_t_and_c {
            return Err(ProtocolError::PleaseReadTandC);
        }
        let reward_name = PSP22MetadataRef::token_name(&reward);
        let reward_symbol = PSP22MetadataRef::token_symbol(&reward);
        if reward_name == None {
            return Err(ProtocolError::RewardNameCannotBeEmpty);
        }
        if reward_symbol == None {
            return Err(ProtocolError::RewardSymbolCannotBeEmpty);
        }
        let requestor = Self::env().caller();
        let brand_id = Self::get_self_id(self, requestor).unwrap();
        if brand_id == DEFAULT_BRAND_ID {
            return Err(ProtocolError::BrandDoesNotExist);
        }

        let mut details: RewardDetails = Default::default();
        let config: RewardConfig = Default::default();

        details.name = reward_name;
        details.symbol = reward_symbol;
        details.description_link = reward_description_link;

        details.contract_address = reward;
        details.issuing_brand = brand_id;
        details.date_created = Self::env().block_timestamp().into();

        self.data::<RewardRecords>().details.insert(reward, &details);
        self.data::<RewardRecords>().config.insert(reward, &config);

        Ok(true)
    }



    fn change_brand_main_account(&mut self, _new_account: AccountId, requestor: AccountId) -> Result<bool, ProtocolError> {

        let brand_record = self.data::<BrandRecords>();
        
        let mut  brand_id = brand_record.id.get(&requestor).unwrap_or_default();

        if brand_id == DEFAULT_BRAND_ID {
            return Err(ProtocolError::BrandDoesNotExist);
        }
        let name = brand_record.details.get(&brand_id).unwrap().name;
        let id = brand_record.details.get(&brand_id).unwrap().id;
        let online_presence = brand_record.details.get(&brand_id).unwrap().online_presence;
        let date_joined = brand_record.details.get(&brand_id).unwrap().date_joined;

        let brandtails = BrandDetails {
             name,
             id,
             main_account: _new_account,
             online_presence,
             date_joined,
        }; 

        brand_record.details.insert(brand_id, &brandtails);
        
        brand_record.id.insert(requestor, &DEFAULT_BRAND_ID);
        brand_record.id.insert(_new_account, &brand_id);

        Ok(true)
    }

    fn set_id(&mut self, id: BRAND_ID_TYPE, requestor: AccountId)  {
        self.data::<BrandRecords>().id.insert(requestor, &id);
    }

    fn change_optimal_valuation(
        &mut self,
        reward: AccountId,
        new_optimal_valuation: u128,
        auto_resume_conversations: bool
    ) -> Result<bool, ProtocolError> {
        ensure_value_is_not_zero(new_optimal_valuation)?;
        ensure_address_is_not_zero_address(reward)?;
        let requestor = Self::env().caller();
        Self::ensure_is_issuing_brand(self, reward, requestor)?;
        let pool_id = self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
        if pool_id == ZERO_ADDRESS.into() {
            return Err(ProtocolError::RewardHasNoPool);
        }
        APoolRef::change_r_optimal(&pool_id, new_optimal_valuation)?;

        Ok(true)
    }

    fn update_pool_configuration(
        &mut self,
        reward: AccountId,
        editable_pool_config: EditablePoolConfig,
        ignore_default: bool
    ) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(reward)?;
        let requestor = Self::env().caller();
        Self::ensure_is_issuing_brand(self, reward, requestor)?;
        let pool_id = self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
        if pool_id == ZERO_ADDRESS.into() {
            return Err(ProtocolError::RewardHasNoPool);
        }
        APoolRef::change_pool_config_except_r_optimal(
            &pool_id,
            editable_pool_config,
            ignore_default
        )?;
        Ok(true)
    }

    fn activate_open_rewards(&mut self, reward: AccountId) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(reward)?;
        // let requestor = Self::env().caller();
        // Self::ensure_is_issuing_brand(self, reward, requestor)?;
        let pool_id = self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
        if pool_id == ZERO_ADDRESS.into() {
            return Err(ProtocolError::RewardHasNoPool);
        }
        APoolRef::start_open_rewards(&pool_id)?;
        Ok(true)
    }

    fn pause_open_rewards(&mut self, reward: AccountId) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(reward)?;
        // let requestor = Self::env().caller();
        // Self::ensure_is_issuing_brand(self, reward, requestor)?;
        let pool_id = self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
        if pool_id == ZERO_ADDRESS.into() {
            return Err(ProtocolError::RewardHasNoPool);
        }
        APoolRef::pause_open_rewards(&pool_id)?;
        Ok(true)
    }

    fn resume_open_rewards(&mut self, reward: AccountId) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(reward)?;
        // let requestor = Self::env().caller();
        // Self::ensure_is_issuing_brand(self, reward, requestor)?;
        let pool_id = self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
        if pool_id == ZERO_ADDRESS.into() {
            return Err(ProtocolError::RewardHasNoPool);
        }
        APoolRef::resume_open_rewards(&pool_id)?;
        Ok(true)
    }

    fn get_brand_config_by_address (
        &self,
        brand_address: AccountId
    ) -> Result<BrandDetails, ProtocolError> {
        ensure_address_is_not_zero_address(brand_address)?;
        let brand_id = self.data::<BrandRecords>().id.get(&brand_address).unwrap();
        let brand = self.data::<BrandRecords>().details.get(&brand_id).unwrap();
        Ok(brand)
    }

    fn get_brand_config_by_id (
        &self,
        brand_id: BRAND_ID_TYPE
    ) -> GlobalBrandConfig{
        self.data::<BrandRecords>().global_config.get(&brand_id).unwrap()
    }


    fn top_up_pool_balances(
        &mut self,
        reward: AccountId,
        reward_amount: Balance,
        me_amount: Balance
    ) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(reward)?;
        if reward_amount == 0 && me_amount == 0 {
            return Err(ProtocolError::BothDepositsCanNotBeZero);
        }
        let requestor = Self::env().caller();
        let pool_id = self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
        if pool_id == ZERO_ADDRESS.into() {
            return Err(ProtocolError::RewardHasNoPool);
        }
        let me = self.data::<ProtocolRecords>().me;

        if reward_amount > 0 {
            PSP22Ref::transfer_from(&reward, requestor, pool_id, reward_amount, Vec::<u8>::new())?;
        }
        if me_amount > 0 {
            PSP22Ref::transfer_from(&me, requestor, pool_id, reward_amount, Vec::<u8>::new())?;
        }
        Ok(true)
    }

    fn reduce_pool_balances(
        &mut self,
        reward: AccountId,
        position: u128,
        reward_amount: Balance,
        me_amount: Balance
    ) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(reward)?;
        if reward_amount == 0 && me_amount == 0 {
            return Err(ProtocolError::BothWithdrawalsCanNotBeZero);
        }
        let requestor = Self::env().caller();
        Self::ensure_is_issuing_brand(self, reward, requestor)?;
        let pool_id = self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
        if pool_id == ZERO_ADDRESS.into() {
            return Err(ProtocolError::RewardHasNoPool);
        }
        Ok(true)
    }

    fn top_up_treasury_balances(
        &mut self,
        reward: AccountId,
        reward_amount: Balance,
        me_amount: Balance,
        brand: BRAND_ID_TYPE
    ) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(reward)?;
        let requestor = Self::env().caller();
        let treasury = self.data::<ProtocolRecords>().treasury.clone();
        // let brand = Self::get_self_id(self, requestor).unwrap_or_default();
        let me = get_me(self);
        if reward_amount > 0 {
            PSP22Ref::transfer_from(&reward, requestor, treasury, reward_amount, Vec::<u8>::new())?;
        }
        if me_amount > 0 {
            PSP22Ref::transfer_from(&me, requestor, treasury, me_amount, Vec::<u8>::new())?;
        }

        TreasuryRef::deposit_reward_and_or_me(
            &treasury,
            reward,
            reward_amount,
            me_amount,
            brand,
            requestor,
            Default::default()
        )?;
        Ok(true)
    }

    fn withdraw_treasury_balances(
        &mut self,
        reward: AccountId,
        reward_amount: Balance,
        me_amount: Balance,
        to: AccountId,
        brand: BRAND_ID_TYPE
    ) -> Result<bool, ProtocolError> {
        ensure_address_is_not_zero_address(reward)?;
        ensure_address_is_not_zero_address(to)?;
        let requestor = Self::env().caller();
        let treasury = self.data::<ProtocolRecords>().treasury.clone();
        // let brand = Self::get_self_id(self, requestor).unwrap_or_default();
        TreasuryRef::withdraw_reward_and_or_me(
            &treasury,
            reward,
            reward_amount,
            me_amount,
            brand,
            to,
            requestor
        )?;
        Ok(true)
    }

 fn get_self_id<T>(
    instance: &mut T,
    requestor: AccountId
) -> Result<BRAND_ID_TYPE, ProtocolError>
    where T: Storage<BrandRecords>
{
    if instance.data::<BrandRecords>().id.contains(requestor) {
        let id = instance.data::<BrandRecords>().id.get(requestor).unwrap();
        Ok(id)
    } else {
        return Err(ProtocolError::BrandDoesNotExist);
    }
}


fn ensure_is_issuing_brand<T>(
    instance: &mut T,
    reward: AccountId,
    requestor: AccountId
) -> Result<bool, ProtocolError>
    where T: Storage<RewardRecords> + Storage<BrandRecords>
{
    let issuing_brand = instance
        .data::<RewardRecords>()
        .details.get(&reward)
        .unwrap().issuing_brand;

    let requesting_brand = Self::get_self_id(instance, requestor).unwrap();

    if issuing_brand != requesting_brand {
        return Err(ProtocolError::RequestorIsNotIssuingBrand);
    }

    Ok(true)
}

}