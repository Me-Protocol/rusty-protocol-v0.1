use openbrush::{ traits::{ AccountId, Balance, Storage } };
use ink::{ storage::{ Mapping, traits::StorageLayout } };
use crate::providers::common::{ database::*, types::* };

pub const ZERO_ADDRESS: [u8; 32] = [0u8; 32];

#[derive(Debug)]
#[openbrush::storage_item(TREASURY_RECORD)]
pub struct TreasuryRecord {
    pub me_id: AccountId,
    pub reward_notify_limits: Mapping<AccountId, u128>,
    pub reward_balances: Mapping<AccountId, u128>,
    pub me_notify_limit: u128,
    pub me_balances: Mapping<BRAND_ID_TYPE, Balance>,
    pub cai_earned: Mapping<BRAND_ID_TYPE, Balance>,
    pub total_expenses: Mapping<BRAND_ID_TYPE, Balance>,
}

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo, StorageLayout))]
pub struct EditableTreasuryRecords {
    pub me_id: AccountId,
    pub me_notify_limit: u128,
}

impl Default for TreasuryRecord {
    fn default() -> Self {
        Self {
            me_id: ZERO_ADDRESS.into(),
            reward_notify_limits: Default::default(),
            reward_balances: Mapping::default(),
            me_notify_limit: Default::default(),
            me_balances: Mapping::default(),
            cai_earned: Mapping::default(),
            total_expenses: Mapping::default(),
        }
    }
}

pub fn get_reward_notify_limit<T>(instance: &mut T, reward: AccountId) -> Balance
    where T: Storage<TreasuryRecord>
{
    instance.data::<TreasuryRecord>().reward_notify_limits.get(&reward).unwrap_or_default()
}

pub fn update_reward_notify_limit<T>(instance: &mut T, reward: AccountId, new_notify_limit: Balance)
    where T: Storage<TreasuryRecord>
{
    instance.data::<TreasuryRecord>().reward_notify_limits.insert(&reward, &new_notify_limit);
}

pub fn get_me_notify_limit<T>(instance: &mut T) -> Balance where T: Storage<TreasuryRecord> {
    instance.data::<TreasuryRecord>().me_notify_limit
}

pub fn update_me_notify_limit<T>(instance: &mut T, new_notify_limit: Balance)
    where T: Storage<TreasuryRecord>
{
    instance.data::<TreasuryRecord>().me_notify_limit = new_notify_limit;
}

pub fn get_treasury_reward_balance<T>(instance: &mut T, reward: AccountId) -> Balance
    where T: Storage<TreasuryRecord>
{
    instance.data::<TreasuryRecord>().reward_balances.get(&reward).unwrap_or_default()
}

pub fn update_treasury_reward_balance<T>(
    instance: &mut T,
    reward: AccountId,
    new_treasury_balance: Balance
)
    where T: Storage<TreasuryRecord>
{
    instance.data::<TreasuryRecord>().reward_balances.insert(&reward, &new_treasury_balance);
}

pub fn get_treasury_me_balance_for_brand<T>(instance: &mut T, brand: BRAND_ID_TYPE) -> Balance
    where T: Storage<TreasuryRecord>
{
    instance.data::<TreasuryRecord>().me_balances.get(&brand).unwrap_or_default()
}

pub fn update_treasury_me_balance_for_brand<T>(
    instance: &mut T,
    brand: BRAND_ID_TYPE,
    new_me_balance: Balance
)
    where T: Storage<TreasuryRecord>
{
    instance.data::<TreasuryRecord>().me_balances.insert(&brand, &new_me_balance);
}

pub fn get_cai_earned_by_brand<T>(instance: &mut T, brand: BRAND_ID_TYPE) -> Balance
    where T: Storage<TreasuryRecord>
{
    instance.data::<TreasuryRecord>().cai_earned.get(&brand).unwrap_or_default()
}

pub fn update_cai_earned_brand<T>(instance: &mut T, brand: BRAND_ID_TYPE, new_cai_earned: Balance)
    where T: Storage<TreasuryRecord>
{
    instance.data::<TreasuryRecord>().cai_earned.insert(&brand, &new_cai_earned);
}

pub fn get_total_treasury_expenses_for_brand<T>(instance: &mut T, brand: BRAND_ID_TYPE) -> Balance
    where T: Storage<TreasuryRecord>
{
    instance.data::<TreasuryRecord>().total_expenses.get(&brand).unwrap_or_default()
}

pub fn update_total_treasury_expenses_for_brand<T>(
    instance: &mut T,
    brand: BRAND_ID_TYPE,
    total_expenses: Balance
)
    where T: Storage<TreasuryRecord>
{
    instance.data::<TreasuryRecord>().total_expenses.insert(&brand, &total_expenses);
}

pub fn get_me<T>(instance: &mut T) -> AccountId where T: Storage<TreasuryRecord> {
    instance.data::<TreasuryRecord>().me_id
}

pub fn update_me_id<T>(instance: &mut T, new_me_id: AccountId) where T: Storage<TreasuryRecord> {
    instance.data::<TreasuryRecord>().me_id = new_me_id;
}

pub fn update_editable_treasury_records<T>(instance: &mut T, new_editable_record: EditableTreasuryRecords) where T: Storage<TreasuryRecord> {
      update_me_id(instance, new_editable_record.me_id);
      update_me_notify_limit(instance, new_editable_record.me_notify_limit);
}