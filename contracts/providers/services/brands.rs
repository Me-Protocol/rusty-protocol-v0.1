
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
    traits::{ Balance, Storage, String },
};
use scale::KeyedVec;

pub trait BrandImpl: Storage<BrandRecords> +
        Storage<RewardRecords> +
        Storage<access_control::Data> +
        Storage<ProtocolRecords>
{
     fn register(
        &mut self,
        name: Option<String>,                                              
        online_presence: Option<String>,
        requestor: AccountId,
        brand_id: BRAND_ID_TYPE
    ) -> Result<(), ProtocolError> {

        let mut details = BrandDetails::default();
        let config = GlobalBrandConfig::default();

        details.name = name.clone();
        details.online_presence = online_presence.clone();
        details.main_account = requestor;
        details.date_joined = Self::env().block_timestamp();
    
        ensure_brand_is_not_empty(brand_id);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        self.data::<BrandRecords>().exists.insert(brand_id, &true);
        self.data::<BrandRecords>().details.insert(brand_id, &details);
        self.data::<BrandRecords>().global_config.insert(brand_id, &config);
        self.data::<BrandRecords>().id.insert(requestor, &brand_id);

        Ok(())
    }

    // fn create_new_reward(&mut self, reward_name: Option<String>, reward_symbol: Option<String>, reward_description_link:Option<String>, reward_type:u8, initial_reward_supply:Balance, use_global_config:bool, requestor: AccountId) -> Result<bool, ProtocolError>{

    //     if reward_name == None {return Err(ProtocolError::RewardNameCannotBeEmpty)}
    //     if reward_symbol == None {return Err(ProtocolError::RewardSymbolCannotBeEmpty)}
    //     ensure_address_is_not_zero_address(requestor);
    //     ensure_value_is_not_zero(reward_type.into());

    //    let mut reward_details: RewardDetails = Default::default();
    //    let mut reward_config: RewardConfig = Default::default();
    //    reward_details.name = reward_name;
    //    reward_details.symbol = reward_symbol;
    //    reward_details.description_link = reward_description_link;
    //    reward_details.r_type = reward_type;
    //    if reward_type == FUNGIBLE_REWARD{
    //     RewardRef::new()
    //    }

    //     Ok(true)
    // }

    fn update_brand_details(
        &mut self,
        brand_details: EditableBrandDetails,
        ignore_default: bool
    ) -> Result<bool, ProtocolError> {
        let requestor = Self::env().caller();
        let brand_id = Self::get_self_id(self, requestor).unwrap();
        let _ = ensure_brand_is_not_empty(brand_id);
        let mut details: BrandDetails = self.data::<BrandRecords>().details.get(brand_id).unwrap();

        // Todo:: Add role Guard
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

    fn update_brand_details_by_brand_id(
        &mut self,
        brand_details: EditableBrandDetails,
        ignore_default: bool,
        brand_id: BRAND_ID_TYPE
    ) -> Result<bool, ProtocolError> {
        let _ = ensure_brand_is_not_empty(brand_id);
        let mut details: BrandDetails = self.data::<BrandRecords>().details.get(brand_id).unwrap();

        // Todo:: Add role Guard
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




    fn update_brand_config(
        &mut self,
        brand_config: GlobalBrandConfig,
        ignore_default: bool
    ) -> Result<bool, ProtocolError> {
        let requestor = Self::env().caller();

         // Todo:: Add role Guard

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

    fn update_brand_config_by_brand_id(
        &mut self,
        brand_config: GlobalBrandConfig,
        ignore_default: bool,
        brand_id: BRAND_ID_TYPE
    ) -> Result<bool, ProtocolError> {

        let _ = ensure_brand_is_not_empty(brand_id);
        
          // Todo:: Add role Guard
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


//     // to consider
//     fn update_reward_details(
//         &mut self,
//         reward: AccountId,
//         reward_details: EditableRewardDetails,
//         ignore_default: bool
//     ) -> Result<bool, ProtocolError> {
//         let requestor = Self::env().caller();
//         ensure_address_is_not_zero_address(reward)?;
//         ensure_is_issuing_brand(self, reward, requestor)?;
//         let mut details = self.data::<RewardRecords>().details.get(&reward).unwrap();
//         if !ignore_default {
//             details.description_link = reward_details.description_link;
//             details.name = reward_details.name;
//             details.symbol = reward_details.symbol;
//         } else {
//             if reward_details.description_link != Default::default() {
//                 details.description_link = reward_details.description_link;
//             }
//             if reward_details.name != Default::default() {
//                 details.name = reward_details.name;
//             }
//             if reward_details.symbol != Default::default() {
//                 details.symbol = reward_details.symbol;
//             }
//         }
//         self.data::<RewardRecords>().details.insert(reward, &details);

//         Ok(true)
//     }

//     fn add_bounty_manager(
//         &mut self,
//         reward: AccountId,
//         bounty_manager: AccountId
//     ) -> Result<bool, ProtocolError> {
//         ensure_address_is_not_zero_address(reward)?;
//         ensure_address_is_not_zero_address(bounty_manager)?;
//         let requestor = Self::env().caller();
//         ensure_is_issuing_brand(self, reward, requestor)?;
//         if self.data::<access_control::Data>().has_role(BOUNTY_MANAGER, bounty_manager) {
//             return Err(ProtocolError::AccountAlreadyABountyManager);
//         }
//         self.data::<access_control::Data>().grant_role(BOUNTY_MANAGER, bounty_manager)?;
//         Ok(true)
//     }

//     fn remove_bounty_manager(
//         &mut self,
//         reward: AccountId,
//         bounty_manager: AccountId
//     ) -> Result<bool, ProtocolError> {
//         let requestor = Self::env().caller();
//         ensure_address_is_not_zero_address(bounty_manager)?;
//         ensure_address_is_not_zero_address(reward)?;
//         ensure_is_issuing_brand(self, reward, requestor)?;
//         if !self.data::<access_control::Data>().has_role(BOUNTY_MANAGER, bounty_manager) {
//             return Err(ProtocolError::AccountIsNotABountyManager);
//         }
//         self.data::<access_control::Data>().revoke_role(BOUNTY_MANAGER, bounty_manager)?;
//         Ok(true)
//     }

//     fn add_pool_manager(
//         &mut self,
//         reward: AccountId,
//         pool_manager: AccountId
//     ) -> Result<bool, ProtocolError> {
//         ensure_address_is_not_zero_address(pool_manager)?;
//         ensure_address_is_not_zero_address(reward)?;
//         let requestor = Self::env().caller();
//         ensure_is_issuing_brand(self, reward, requestor)?;
//         let pool_id = self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
//         if pool_id == ZERO_ADDRESS.into() {
//             return Err(ProtocolError::RewardHasNoPool);
//         }
//         APoolRef::add_pool_manager(&pool_id, pool_manager)?;
//         Ok(true)
//     }

//     fn remove_pool_manager(
//         &mut self,
//         reward: AccountId,
//         pool_manager: AccountId
//     ) -> Result<bool, ProtocolError> {
//         ensure_address_is_not_zero_address(pool_manager)?;
//         ensure_address_is_not_zero_address(reward)?;
//         let requestor = Self::env().caller();
//         ensure_is_issuing_brand(self, reward, requestor)?;
//         let pool_id = self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
//         if pool_id == ZERO_ADDRESS.into() {
//             return Err(ProtocolError::RewardHasNoPool);
//         }
//         APoolRef::remove_pool_manager(&pool_id, pool_manager)?;
//         Ok(true)
//     }

//     fn set_bounty_trigger_limit(
//         &mut self,
//         reward: AccountId,
//         trigger_limit: Balance
//     ) -> Result<bool, ProtocolError> {
//         ensure_address_is_not_zero_address(reward)?;
//         ensure_value_is_not_zero(trigger_limit)?;
//         let bounty = get_bount_id(self);
//         let requestor = Self::env().caller();
//         BountyRef::set_trigger_limit(&bounty, reward, trigger_limit, requestor)?;
//         Ok(true)
//     }

//     fn fund_bounty_pool(
//         &mut self,
//         reward: AccountId,
//         amount: Balance
//     ) -> Result<bool, ProtocolError> {
//         ensure_address_is_not_zero_address(reward)?;
//         ensure_value_is_not_zero(amount)?;
//         let bounty = get_bount_id(self);
//         let requestor = Self::env().caller();
//         BountyRef::deposit_bounty(&bounty, reward, amount, requestor)?;
//         Ok(true)
//     }

//     fn integrate_existing_reward(
//         &mut self,
//         reward: AccountId,
//         reward_description_link: Option<String>,
//         read_t_and_c: bool
//     ) -> Result<bool, ProtocolError> {
//         if !read_t_and_c {
//             return Err(ProtocolError::PleaseReadTandC);
//         }
//         let reward_name = PSP22MetadataRef::token_name(&reward);
//         let reward_symbol = PSP22MetadataRef::token_symbol(&reward);
//         if reward_name == None {
//             return Err(ProtocolError::RewardNameCannotBeEmpty);
//         }
//         if reward_symbol == None {
//             return Err(ProtocolError::RewardSymbolCannotBeEmpty);
//         }
//         let requestor = Self::env().caller();
//         let brand_id = get_self_id(self, requestor).unwrap();
//         if brand_id == DEFAULT_BRAND_ID {
//             return Err(ProtocolError::BrandDoesNotExist);
//         }

//         let mut details: RewardDetails = Default::default();
//         let config: RewardConfig = Default::default();

//         details.name = reward_name;
//         details.symbol = reward_symbol;
//         details.description_link = reward_description_link;

//         details.contract_address = reward;
//         details.issuing_brand = brand_id;
//         details.date_created = Self::env().block_timestamp().into();

//         self.data::<RewardRecords>().details.insert(reward, &details);
//         self.data::<RewardRecords>().config.insert(reward, &config);

//         Ok(true)
//     }

//     // #[ink(message)]
//     // fn create_a_type_a_pool(&mut self, reward_address: AccountId, initial_reward_deposit:Balance, initial_me_deposit: Balance,  pool_config: PoolSetUpConfig,  use_global_config:bool, auto_start_conversations:bool) -> Result<bool, ProtocolError>;

//     fn change_optimal_valuation(
//         &mut self,
//         reward: AccountId,
//         new_optimal_valuation: u128,
//         auto_resume_conversations: bool
//     ) -> Result<bool, ProtocolError> {
//         ensure_value_is_not_zero(new_optimal_valuation)?;
//         ensure_address_is_not_zero_address(reward)?;
//         let requestor = Self::env().caller();
//         ensure_is_issuing_brand(self, reward, requestor)?;
//         let pool_id = self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
//         if pool_id == ZERO_ADDRESS.into() {
//             return Err(ProtocolError::RewardHasNoPool);
//         }
//         APoolRef::change_r_optimal(&pool_id, new_optimal_valuation)?;
//         if auto_resume_conversations {
//             APoolRef::resume_conversations(&pool_id, requestor)?;
//         }

//         Ok(true)
//     }

//     fn update_pool_configuration(
//         &mut self,
//         reward: AccountId,
//         editable_pool_config: EditablePoolConfig,
//         ignore_default: bool
//     ) -> Result<bool, ProtocolError> {
//         ensure_address_is_not_zero_address(reward)?;
//         let requestor = Self::env().caller();
//         ensure_is_issuing_brand(self, reward, requestor)?;
//         let pool_id = self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
//         if pool_id == ZERO_ADDRESS.into() {
//             return Err(ProtocolError::RewardHasNoPool);
//         }
//         APoolRef::change_pool_config_except_r_optimal(
//             &pool_id,
//             editable_pool_config,
//             ignore_default
//         )?;
//         Ok(true)
//     }

//     fn activate_open_rewards(&mut self, reward: AccountId) -> Result<bool, ProtocolError> {
//         ensure_address_is_not_zero_address(reward)?;
//         let requestor = Self::env().caller();
//         ensure_is_issuing_brand(self, reward, requestor)?;
//         let pool_id = self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
//         if pool_id == ZERO_ADDRESS.into() {
//             return Err(ProtocolError::RewardHasNoPool);
//         }
//         // APoolRef::start_allowing_conversations(&reward, requestor)?;
//         Ok(true)
//     }

//     fn pause_open_rewards(&mut self, reward: AccountId) -> Result<bool, ProtocolError> {
//         ensure_address_is_not_zero_address(reward)?;
//         let requestor = Self::env().caller();
//         ensure_is_issuing_brand(self, reward, requestor)?;
//         let pool_id = self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
//         if pool_id == ZERO_ADDRESS.into() {
//             return Err(ProtocolError::RewardHasNoPool);
//         }
//         APoolRef::pause_conversations(&reward, requestor)?;
//         Ok(true)
//     }

//     fn resume_open_rewards(&mut self, reward: AccountId) -> Result<bool, ProtocolError> {
//         ensure_address_is_not_zero_address(reward)?;
//         let requestor = Self::env().caller();
//         ensure_is_issuing_brand(self, reward, requestor)?;
//         let pool_id = self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
//         if pool_id == ZERO_ADDRESS.into() {
//             return Err(ProtocolError::RewardHasNoPool);
//         }
//         APoolRef::resume_conversations(&reward, requestor)?;
//         Ok(true)
//     }

//     fn top_up_pool_balances(
//         &mut self,
//         reward: AccountId,
//         reward_amount: Balance,
//         me_amount: Balance
//     ) -> Result<bool, ProtocolError> {
//         ensure_address_is_not_zero_address(reward)?;
//         if reward_amount == 0 && me_amount == 0 {
//             return Err(ProtocolError::BothDepositsCanNotBeZero);
//         }
//         let requestor = Self::env().caller();
//         ensure_is_issuing_brand(self, reward, requestor)?;
//         let pool_id = self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
//         if pool_id == ZERO_ADDRESS.into() {
//             return Err(ProtocolError::RewardHasNoPool);
//         }
//         let me = self.data::<ProtocolRecords>().me;

//         if reward_amount > 0 {
//             PSP22Ref::transfer_from(&reward, requestor, pool_id, reward_amount, Vec::<u8>::new())?;
//         }
//         if me_amount > 0 {
//             PSP22Ref::transfer_from(&me, requestor, pool_id, reward_amount, Vec::<u8>::new())?;
//         }
//         Ok(true)
//     }

//     fn reduce_pool_balances(
//         &mut self,
//         reward: AccountId,
//         position: u128,
//         reward_amount: Balance,
//         me_amount: Balance
//     ) -> Result<bool, ProtocolError> {
//         ensure_address_is_not_zero_address(reward)?;
//         if reward_amount == 0 && me_amount == 0 {
//             return Err(ProtocolError::BothWithdrawalsCanNotBeZero);
//         }
//         let requestor = Self::env().caller();
//         ensure_is_issuing_brand(self, reward, requestor)?;
//         let pool_id = self.data::<RewardRecords>().details.get(&reward).unwrap().pool_id;
//         if pool_id == ZERO_ADDRESS.into() {
//             return Err(ProtocolError::RewardHasNoPool);
//         }
//         APoolRef::withdraw_assets_from_position(
//             &pool_id,
//             position,
//             reward_amount,
//             me_amount,
//             requestor,
//             requestor
//         )?;
//         Ok(true)
//     }

//     fn top_up_treasury_balances(
//         &mut self,
//         reward: AccountId,
//         reward_amount: Balance,
//         me_amount: Balance
//     ) -> Result<bool, ProtocolError> {
//         ensure_address_is_not_zero_address(reward)?;
//         let requestor = Self::env().caller();
//         let treasury = self.data::<ProtocolRecords>().treasury.clone();
//         let brand = get_self_id(self, requestor).unwrap_or_default();
//         let me = get_me(self);
//         if reward_amount > 0 {
//             PSP22Ref::transfer_from(&reward, requestor, treasury, reward_amount, Vec::<u8>::new())?;
//         }
//         if me_amount > 0 {
//             PSP22Ref::transfer_from(&me, requestor, treasury, me_amount, Vec::<u8>::new())?;
//         }

//         TreasuryRef::deposit_reward_and_or_me(
//             &treasury,
//             reward,
//             reward_amount,
//             me_amount,
//             brand,
//             requestor,
//             Default::default()
//         )?;
//         Ok(true)
//     }

//     fn withdraw_treasury_balances(
//         &mut self,
//         reward: AccountId,
//         reward_amount: Balance,
//         me_amount: Balance,
//         to: AccountId
//     ) -> Result<bool, ProtocolError> {
//         ensure_address_is_not_zero_address(reward)?;
//         let requestor = Self::env().caller();
//         let treasury = self.data::<ProtocolRecords>().treasury.clone();
//         let brand = get_self_id(self, requestor).unwrap_or_default();
//         TreasuryRef::withdraw_reward_and_or_me(
//             &treasury,
//             reward,
//             reward_amount,
//             me_amount,
//             brand,
//             to,
//             requestor
//         )?;
//         Ok(true)
//     }
// }

// pub fn generate_string_id(mut input: String, seed: u64) -> BRAND_ID_TYPE {
//     // input = concatenate_bytes_and_u64(input, seed);
//     let mut id: BRAND_ID_TYPE = [0; 10];
//     // let mut output = <Keccak256 as HashOutput>::Type::default();
//     // Keccak256::hash(input.as_slice(), &mut output);
//     // id.copy_from_slice(&output[..10]);
//     id
// }

// pub fn concatenate_bytes_and_u64(bytes: Vec<u8>, num: u64) -> Vec<u8> {
//     let num_bytes: [u8; 8] = num.to_le_bytes();
//     let mut concatenated: Vec<u8> = Vec::new();
//     concatenated.extend_from_slice(&bytes);
//     concatenated.extend_from_slice(&num_bytes);
//     concatenated
// }

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