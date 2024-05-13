#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::contract]
pub mod receiver {
    #[ink(storage)]
    pub struct Receiver {
        pub some_value: u32,
    }

    impl Receiver {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self { some_value: 0 }
        }
        #[ink(constructor)]
        pub fn default() -> Self {
            Self::new()
        }

        #[ink(message)]
        pub fn recieve(&mut self) -> u32 {
            self.some_value = self.some_value + 1;
            self.some_value
        }
    }
}
