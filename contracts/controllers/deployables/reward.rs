use openbrush::{
    contracts::{traits::{
        ownable::*,
        psp22::{ extensions::{ burnable::*, metadata::*, mintable::* }, * },
    }, psp22::PSP22Impl},
    traits::{ AccountId, Balance },
};

use crate::providers::common::errors::*;

#[openbrush::wrapper]
pub type RewardRef = dyn RewardController +
    PSP22 +
    PSP22Mintable +
    PSP22Burnable +
    PSP22Metadata +
    Ownable;

#[openbrush::trait_definition]
pub trait RewardController: PSP22 + PSP22Metadata + PSP22Mintable {
    #[ink(message)]
    fn mint_to(&mut self, account: AccountId, amount: Balance) -> Result<(), ProtocolError>;

    #[ink(message)]
    fn burn_rewards(&mut self, amount: Balance) -> Result<(), ProtocolError>;
}