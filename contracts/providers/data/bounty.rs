use openbrush::{ traits::{ AccountId, Balance, ZERO_ADDRESS, Storage } };
use ink::{ storage::{ Mapping } };
use crate::providers::common::database::*;

#[derive(Debug)]
#[openbrush::upgradeable_storage(BOUNTY_RECORD)]
pub struct BountyRecord {
    pub me_id: AccountId,
    pub total_number_of_bounty_rewards: u128,
    pub exists: Mapping<AccountId, bool>,
    pub trigger_limits: Mapping<AccountId, u128>,
    pub balance: Mapping<AccountId, u128>,
}

impl Default for BountyRecord {
    fn default() -> Self {
        Self {
            me_id: ZERO_ADDRESS.into(),
            total_number_of_bounty_rewards: Default::default(),
            exists: Mapping::default(),
            trigger_limits: Default::default(),
            balance: Mapping::default(),
        }
    }
}

pub fn get_bounty_balance<T>(instance: &mut T, reward: AccountId) -> Balance
    where T: Storage<BountyRecord>
{
    instance.data::<BountyRecord>().balance.get(&reward).unwrap_or_default()
}

pub fn get_total_number_of_bounty_rewards<T>(instance: &mut T) -> u128
    where T: Storage<BountyRecord>
{
    instance.data::<BountyRecord>().total_number_of_bounty_rewards
}

pub fn update_total_number_of_bounty_rewards<T>(
    instance: &mut T,
    new_total_number_of_bounty_rewards: u128
)
    where T: Storage<BountyRecord>
{
    instance.data::<BountyRecord>().total_number_of_bounty_rewards =
        new_total_number_of_bounty_rewards;
}

pub fn get_trigger_limit<T>(instance: &mut T, reward: AccountId) -> Balance
    where T: Storage<BountyRecord>
{
    instance.data::<BountyRecord>().trigger_limits.get(&reward).unwrap_or_default()
}

pub fn update_trigger_limit<T>(instance: &mut T, reward: AccountId, new_trigger_limit: Balance)
    where T: Storage<BountyRecord>
{
    instance.data::<BountyRecord>().trigger_limits.insert(&reward, &new_trigger_limit);
}

pub fn update_bounty_balance<T>(instance: &mut T, reward: AccountId, current_balance: Balance)
    where T: Storage<BountyRecord>
{
    instance.data::<BountyRecord>().balance.insert(&reward, &current_balance);
}

pub fn reward_is_bounty_reward<T>(instance: &mut T, reward: AccountId) -> bool
    where T: Storage<BountyRecord>
{
    instance.data::<BountyRecord>().exists.get(&reward).unwrap_or_default()
}

pub fn recognise_reward_as_bounty_reward<T>(instance: &mut T, reward: AccountId)
    where T: Storage<BountyRecord>
{
    instance.data::<BountyRecord>().exists.insert(&reward, &true);
}

pub fn get_me_id<T>(instance: &mut T) -> AccountId where T: Storage<BountyRecord> {
    instance.data::<BountyRecord>().me_id
}

pub fn update_me_id<T>(instance: &mut T, new_me_id: AccountId) where T: Storage<BountyRecord> {
    instance.data::<BountyRecord>().me_id = new_me_id;
}