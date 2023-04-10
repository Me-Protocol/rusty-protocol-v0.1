use openbrush::{contracts::traits::{
    ownable::*,
    psp22::{
        extensions::{
            burnable::*,
            metadata::*,
            mintable::*,
        },
        *,
    },
},
traits::{
    AccountId,
    Balance,
},
    
};

use crate::providers::global::error::*;

#[openbrush::wrapper]
pub type RewardRef = dyn PSP22 + PSP22Mintable + PSP22Burnable + PSP22Metadata + Ownable;

#[openbrush::trait_definition]
pub trait RewardController: PSP22 + PSP22Metadata + Ownable {
    #[ink(message)]
    fn mint_to(&mut self, account: AccountId, amount:Balance) -> Result<(), ProtocolError>;

    #[ink(message)]
    fn burn_rewards(&mut self, amount:Balance) -> Result<(), ProtocolError>;
}