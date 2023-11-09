// #![cfg_attr(not(feature = "std"), no_std, no_main)]
// #![feature(min_specialization)]

// #[cfg(test)]
// mod unit_test {
//     use reward::reward::{
//         Reward,
//         Transfer,
//     };

//     use openbrush::{
//         test_utils::*,
//         traits::{
//             AccountId,
//             Balance,
//         },
//     };

//     type Event = <Reward as ::ink::reflect::ContractEventBase>::Type;

//     fn assert_transfer_event(
//         event: &ink::env::test::EmittedEvent,
//         expected_from: Option<AccountId>,
//         expected_to: Option<AccountId>,
//         expected_value: Balance,
//     ) {
//         let decoded_event = <Event as scale::Decode>::decode(&mut &event.data[..])
//             .expect("encountered invalid contract event data buffer");
//         if let Event::Transfer(Transfer { from, to, value }) = decoded_event {
//             assert_eq!(from, expected_from, "encountered invalid Transfer.from");
//             assert_eq!(to, expected_to, "encountered invalid Transfer.to");
//             assert_eq!(value, expected_value, "encountered invalid Trasfer.value");
//         } else {
//             panic!("encountered unexpected event kind: expected a Transfer event")
//         }
//         let expected_topics = vec![
//             encoded_into_hash(&PrefixedValue {
//                 value: b"Reward::Transfer",
//                 prefix: b"",
//             }),
//             encoded_into_hash(&PrefixedValue {
//                 prefix: b"Reward::Transfer::from",
//                 value: &expected_from,
//             }),
//             encoded_into_hash(&PrefixedValue {
//                 prefix: b"Reward::Transfer::to",
//                 value: &expected_to,
//             }),
//             encoded_into_hash(&PrefixedValue {
//                 prefix: b"Reward::Transfer::value",
//                 value: &expected_value,
//             }),
//         ];
//         for (n, (actual_topic, expected_topic)) in
//             event.topics.iter().zip(expected_topics).enumerate()
//         {
//             assert_eq!(
//                 &actual_topic[..],
//                 expected_topic.as_ref(),
//                 "encountered invalid topic at {}",
//                 n
//             );
//         }
//     }

//     #[ink::test]
//     fn new_works() {
//         let accounts = accounts();
//         let a = accounts.bob;
//         Reward::new(a, Some("me".into()), Some("me".into()), 2, 100);
//         let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
//         // assert_eq!(1, emitted_events.len());

//         // assert_transfer_event(&emitted_events[0], None, Some(a), 100);
//     }
// }
