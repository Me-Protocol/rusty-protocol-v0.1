#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod reward {
    use ink::codegen::{
        EmitEvent,
        Env,
    };
 
    use openbrush::{
        contracts::{
            ownable::*,
            psp22::extensions::{
                mintable::*,
                metadata::*,
                burnable::*,
            },
        },
        modifiers,
        traits::{
            Storage,
            String,
        },
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
   
    impl PSP22 for Reward {}

    impl PSP22Metadata for Reward{}

    impl PSP22Mintable for Reward {}  

    impl Ownable for Reward {}

    impl psp22::Internal for Reward {
        fn _emit_transfer_event(&self, _from: Option<AccountId>, _to: Option<AccountId>, _amount: Balance) {
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
        pub fn new(brand:AccountId, name: Option<String>, symbol: Option<String>, decimal: u8, total_supply: Balance) -> Self {
            let mut instance = Self::default();
            instance.metadata.name = name;
            instance.metadata.symbol = symbol;
            instance.metadata.decimals = decimal;
            instance._init_with_owner(brand);
            assert!(instance._mint_to(brand, total_supply).is_ok());
            instance
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn change_brand_account(&mut self, new_brand_account: AccountId) -> Result<(),  OwnableError> {
            self.transfer_ownership(new_brand_account)?;
            Ok(())
        }

        #[ink(message)]
        pub fn get_brand(&self) -> AccountId {
            self.owner()
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn mint_to(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
            self.mint(account, amount)
        }
      

        ///brands can burn from their own wallet
        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn burn_rewards(&mut self, amount: Balance) -> Result<(), PSP22Error>{
            let owner = self.owner();
             self.burn(owner,amount)
        }
    }
}