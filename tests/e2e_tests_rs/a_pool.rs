#![cfg_attr(not(feature = "std"), no_std, no_main)]
#![no_main]
#![feature(min_specialization)]

#[cfg(all(test, feature = "e2e-tests"))]
mod pool_e2e_tests {
    use pool::pool::*;
    use reward::reward::{
                Reward,
                Transfer,};
        
    use global::{ providers::data::a_pool::*, controllers::deployables::a_pool::* };

    use openbrush::{ test_utils::*, traits::{ AccountId, Balance } };
    // use super::*;
    use ink_e2e::build_message;

    type E2EResult<T> = std::result::Result<T, Box<dyn std::error::Error>>;

    #[ink_e2e::test]
    async fn constructor(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
        // given
        let constructor = APoolRef::new(&ink_e2e::alice(),
        &ink_e2e::bob(),
        &ink_e2e::bob(),
                    PoolSetUpConfig {
                        r_optimal: 0,
                        maximum_r_limit: 12000000,
                        minimum_reward_amount_for_conversation: 1,
                        minimum_me_amount_for_conversation: 1,
                        notify_reward_amount: 1,
                        notify_me_amount: 1,
                        default_slippage_in_precision: 1,
                        allow_internal_swap: false,
                    }
                );
        let contract_acc_id = client
            .instantiate("flipper", &ink_e2e::alice(), constructor, 0, None)
            .await
            .expect("instantiate failed")
            .account_id;

        let get = build_message::<FlipperRef>(contract_acc_id.clone())
            .call(|flipper| flipper.get());
        let get_res = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
        assert!(matches!(get_res.return_value(), false));

        // when
        let flip = build_message::<FlipperRef>(contract_acc_id.clone())
            .call(|flipper| flipper.flip());
        let _flip_res = client
            .call(&ink_e2e::bob(), flip, 0, None)
            .await
            .expect("flip failed");

        // then
        let get = build_message::<FlipperRef>(contract_acc_id.clone())
            .call(|flipper| flipper.get());
        let get_res = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
        assert!(matches!(get_res.return_value(), true));

        Ok(())
    }

    #[ink_e2e::test]
    async fn default_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
        // given
        let constructor = FlipperRef::new_default();

        // when
        let contract_acc_id = client
            .instantiate("flipper", &ink_e2e::bob(), constructor, 0, None)
            .await
            .expect("instantiate failed")
            .account_id;

        // then
        let get = build_message::<FlipperRef>(contract_acc_id.clone())
            .call(|flipper| flipper.get());
        let get_res = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
        assert!(matches!(get_res.return_value(), false));

        Ok(())
    }
}
