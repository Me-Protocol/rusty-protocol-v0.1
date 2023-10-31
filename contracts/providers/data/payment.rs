use openbrush::{ traits::{ AccountId, Balance, Storage } };
use ink::{ storage::{ Mapping, traits::StorageLayout } };
use crate::providers::common::{ database::*, types::* };

pub const ZERO_ADDRESS: [u8; 32] = [0u8; 32];


#[derive(Debug)]
#[openbrush::storage_item(PAYMENT)]
pub struct PaymentStorage {
    pub active: bool,
    pub me_id: AccountId,
    pub protocol_me_balance: Balance,
    pub brand_me_balances: Mapping<BRAND_ID_TYPE, Balance>,
}

impl  Default for PaymentStorage {
    fn default() -> Self {
        Self { 
            active: Default::default(),
            me_id: ZERO_ADDRESS.into(), 
            protocol_me_balance: Default::default(), 
            brand_me_balances: Mapping::default(),
        }
    }
}

pub fn get_active<T>(instance: &mut T) -> bool where T: Storage<PaymentStorage> {
    instance.data::<PaymentStorage>().active
}

pub fn update_active<T>(instance: &mut T, active: bool)  where T: Storage<PaymentStorage> {
    instance.data::<PaymentStorage>().active = active;
}

pub fn get_me<T>(instance: &mut T) -> AccountId where T: Storage<PaymentStorage> {
    instance.data::<PaymentStorage>().me_id
}

pub fn update_me_id<T>(instance: &mut T, new_me_id: AccountId) where T: Storage<PaymentStorage> {
    instance.data::<PaymentStorage>().me_id = new_me_id;
}

pub fn get_protocol_me_balance<T>(instance: &mut T) -> Balance where T: Storage<PaymentStorage> {
    instance.data::<PaymentStorage>().protocol_me_balance
}

pub fn update_protocol_me_balance<T>(instance: &mut T, protocol_me_balance: Balance) where T: Storage<PaymentStorage> {
    instance.data::<PaymentStorage>().protocol_me_balance = protocol_me_balance;
}

pub fn update_brand_me_balances<T>(
    instance: &mut T,
    brand_id: BRAND_ID_TYPE,
    new_brand_me_balance: Balance
)
    where T: Storage<PaymentStorage>
{
    instance.data::<PaymentStorage>().brand_me_balances.insert(&brand_id, &new_brand_me_balance);
}

pub fn get_treasury_me_balance_for_brand<T>(instance: &mut T, brand: BRAND_ID_TYPE) -> Balance
    where T: Storage<PaymentStorage>
{
    instance.data::<PaymentStorage>().brand_me_balances.get(&brand).unwrap_or_default()
}

