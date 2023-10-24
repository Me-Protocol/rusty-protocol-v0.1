#![cfg_attr(not(feature = "std"), no_std, no_main)]
#![no_main]
#![feature(min_specialization)]



#[openbrush::implementation(PSP22, Ownable, PSP22Metadata, PSP22Mintable)]
#[openbrush::contract]
pub mod reward {
    use ink::codegen::{ EmitEvent, Env };
    use global::{ controllers::deployables::reward::*, providers::common::errors::* };

    use openbrush::{
        contracts::{ ownable::{*, OwnableImpl}, psp22::{extensions::{ mintable::*, metadata::*, burnable::* }, self}, access_control::Internal },
        modifiers,
        traits::{ Storage, String },
    };

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Reward {
        #[storage_field]
        psp22: psp22::Data,
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        metadata: metadata::Data,
    }

    #[ink(event)]
    pub struct Transfer {
        #[ink(topic)]
        pub from: Option<AccountId>,
        #[ink(topic)]
        pub to: Option<AccountId>,
        pub value: Balance,
    }

    #[ink(event)]
    pub struct Approval {
        #[ink(topic)]
        owner: AccountId,
        #[ink(topic)]
        spender: AccountId,
        value: Balance,
    }


    impl RewardController for Reward {
        #[ink(message)]
        #[modifiers(only_owner)]
        default fn mint_to(&mut self, account: AccountId, amount: Balance) -> Result<(), ProtocolError> {
            psp22::InternalImpl::_mint_to(self, account, amount)?;
            Ok(())
        }

        ///brands can burn from their own wallet
        #[ink(message)]
        #[modifiers(only_owner)]
        default fn burn_rewards(&mut self, amount: Balance) -> Result<(), ProtocolError> {
            let owner = OwnableImpl::owner(self);
            psp22::InternalImpl::_burn_from(self, owner.unwrap(), amount)?;
            Ok(())
        }
    }


    impl Reward {
        fn _emit_transfer_event(
            &self,
            _from: Option<AccountId>,
            _to: Option<AccountId>,
            _amount: Balance
        ) {
            self.env().emit_event(Transfer {
                from: _from,
                to: _to,
                value: _amount,
            });
        }

        fn _emit_approval_event(&self, _owner: AccountId, _spender: AccountId, _amount: Balance) {
            self.env().emit_event(Approval {
                owner: _owner,
                spender: _spender,
                value: _amount,
            });
        }
    }

    impl Reward {
        #[ink(constructor)]
        pub fn new(
            brand: AccountId,
            name: Option<String>,
            symbol: Option<String>,
            decimal: u8,
            total_supply: Balance
        ) -> Self {
            let mut instance = Self::default();
            instance.metadata.name.set(&name);
            instance.metadata.symbol.set(&symbol);
            instance.metadata.decimals.set(&decimal);
            ownable::InternalImpl::_init_with_owner(&mut instance, brand);
            assert!(psp22::InternalImpl::_mint_to(&mut instance, brand, total_supply).is_ok());
            instance
        }
    }
}
