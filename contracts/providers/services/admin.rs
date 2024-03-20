
use crate::providers::common::roleguard::RecordStorage;
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

pub trait AdminController:
        Storage<BrandRecords> +
        Storage<RewardRecords> +
        Storage<access_control::Data> +
        Storage<ProtocolRecords> +
        Storage<ProtocolConfig> +
        Storage<RecordStorage>
{

    




}