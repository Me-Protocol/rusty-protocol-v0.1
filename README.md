# rusty-protocol-v0.1
the rust based implementation of the me protocol



 # Pool Contract Documentation

 ## Introduction

 The Pool contract represents a critical component of the Me Protocol ecosystem. It operates as an Automated Market Maker (AMM) with a unique approach to liquidity provisioning. The Pool contract serves as a bridge between various reward tokens and the native Me token within the Me Protocol.

 ## Project Structure

 The Pool contract is organized into several key components:

 1. **Implemented Traits as Interfaces:** These interfaces are defined within the "controllers" folder and are named "a_pool" inside the "deployables" folder.

 2. **Contract Storage Structure:** The contract employs two primary storage structures: `PoolState` and `PoolConfig`. Both structures can be found within the "data" folder, under the "a_pool" file.

 3. **Contract Implementations:** The contract implementations are encapsulated in the "PoolImpl" trait, residing in the "providers" folder with the file name "a_pool".

 ## Contract Overview

 The Pool contract draws inspiration from traditional AMMs but introduces unique functionalities tailored to the Me Protocol ecosystem. It embodies the following traits and functionalities from the OpenBrush framework:

 - **Access Control**: Ensures that access and authorization to various contract functions are correctly managed.

 - **PSP34**: Akin to the functionality of the well-known ERC-721 standard, PSP34 mints tokens as a representation of positions held within the pool. Liquidity providers receive these tokens, serving as their position in the pool.

 ## Pool Operation Flow

 ### Starting and Managing the Pool

 1. **start_open_rewards**: This function initializes the pool, but it can only be activated once both the reward token and Me token have been deposited. Starting the pool allows for conversations, effectively enabling token swaps within the pool.

 2. **pause_open_rewards**: Pauses the pool, temporarily disabling swapping operations with other pools.

 3. **resume_open_rewards**: Resumes the pool, allowing normal operation to continue.

 4. **check_open_rewards_state**: Checks the current state of the pool, determining whether it is paused or actively participating in conversations.

 ### Liquidity and Position Management

 - **get_liquidity_ratios**: Provides the liquidity ratio between the Me token and the reward token within the pool.

 - **withdraw_liquidity**: Enables liquidity providers to withdraw their assets from the pool.

 - **record_liquidity_provided**: Records the liquidity provided into the pool, creating positions and issuing PSP34 tokens to liquidity providers.

 ### Initiating Conversations

 - **initiate_outgoing_conversation**: This function serves as the entry point for inter-pool conversations. It facilitates the swapping of tokens between different pools, enhancing the overall liquidity provision in the Me Protocol.

 ## Conclusion

 The Pool contract is a fundamental component of the Me Protocol, facilitating the seamless exchange of various reward tokens and the Me token. Its unique approach to AMM operations makes it an essential element within the ecosystem.

 For a deeper understanding of the contract's inner workings, please refer to the official documentation or the MY AI, Inc. documentation to explore the mathematical formulas and unique mechanisms that drive this innovative pool contract.




 # Treasury Contract Documentation

 ## Introduction

 The Treasury contract is a central component of the Me Protocol ecosystem. It functions as a ledger that tracks all tokens owned by business owners. Any tokens sent to or withdrawn from pools by business owners are meticulously accounted for in the treasury.

 ## Treasury Flow

 The Treasury contract is responsible for managing various aspects of token flows within the Me Protocol:

 ### 1. Depositing Reward and Me Tokens

 - **deposit_reward_and_or_me**: This function is called after a pair of reward and Me tokens has been deposited into the treasury. It serves as the record-keeping mechanism for these deposited tokens.

 ### 2. Withdrawing Reward and Me Tokens

 - **withdraw_reward_and_or_me**: This function is responsible for withdrawing both the reward token and the Me token, providing flexibility for token management.

 ### 3. Covering Protocol Costs

 - **pay_for_some_costs**: Business owners can use this function to cover specific costs incurred within the protocol.

 ### 4. Topping Up Pools with Tokens

 - **top_up_pool_with_reward_and_or_me**: This function is used to add more Me tokens and reward tokens to the treasury. It is a vital aspect of liquidity provisioning within the Me Protocol.

 ### 5. Setting Reward Notification Limits

 - **set_reward_notify_limit**: This function is employed to configure reward notification limits, ensuring effective communication and monitoring of reward-related activities.

 ## Conclusion

 The Treasury contract plays a pivotal role in ensuring the transparent and accountable management of tokens within the Me Protocol. By recording all token movements and providing essential functions for depositing, withdrawing, and maintaining token liquidity, it serves as a foundational element of the Me Protocol ecosystem.

 For in-depth insights into the inner workings of the contract and its role within the protocol, refer to the official documentation or MY AI, Inc.'s comprehensive resources.


# Bounty Contract Documentation

## Introduction

The Bounty contract serves as the central hub for storing rewards that are meant to be distributed to users after they have successfully completed specific tasks within the Me Protocol ecosystem.

## Bounty Flow

The Bounty contract primarily manages the following functionalities:

1. **Depositing Bounty Rewards**
   - **deposit_bounty**: This function is used to record and store deposited rewards within the Bounty contract.

2. **Withdrawing Bounty Rewards**
   - **withdraw_bounty**: Business owners or administrators can withdraw bounty rewards from the contract.

3. **Setting Trigger Limits**
   - **set_trigger_limit**: This function allows the configuration of a trigger limit that specifies when the bounty rewards will be distributed to users who have successfully fulfilled certain tasks.

4. **Retrieving Trigger Limits**
   - **get_trigger_limit**: You can use this function to retrieve the currently set trigger limit, providing insights into when users can expect to receive their bounty rewards.

## Conclusion

The Bounty contract plays a vital role in the Me Protocol ecosystem by facilitating the transparent distribution of rewards to users. As users complete specific tasks, the Bounty contract records and manages these rewards, ensuring a seamless process for the entire ecosystem.

For more comprehensive information on the Bounty contract and its functionalities, please refer to the official documentation or MY AI, Inc.'s educational materials.

# Payment Contract Documentation

## Introduction

The Payment contract serves as a fundamental component of the Me Protocol, offering a range of features and functions aimed at facilitating transactions between brands and other users. The core functionality of the Payment contract includes:

1. **Brand Deposits:** Enabling brands to deposit and acquire shares in the Payment contract.
2. **Payment for Services:** Allowing brands to use their deposited shares to pay for various services within the Me Protocol.
3. **Withdrawals:** Brands can withdraw their shares from the Payment contract, providing a flexible approach to managing their holdings.
4. **Admin Withdrawals:** Admins have the capability to withdraw payments for services rendered within the Me Protocol.

## Payment Flow

The Payment contract implements a set of methods to manage these functionalities:

1. **Brand Deposit of Me Tokens**
   - **brand_deposit_me**: This function facilitates the deposit of Me tokens into the Payment contract, allowing brands to acquire shares.

2. **Brand Payment for Services**
   - **brand_service_payment**: Brands can use this function to pay for services with their Me token shares.

3. **Brand Withdrawal of Me Tokens**
   - **brand_withdraw_me**: Brands can withdraw Me tokens from the contract after successful transactions or service payments.

4. **Retrieving Brand Me Token Balance**
   - **brand_me_balance**: This function provides the current Me token balance of a brand within the Payment contract.

5. **Protocol Withdrawal of Me Tokens**
   - **protocol_withdraw_me**: Admins or protocol-level users can withdraw Me tokens from the Payment contract.

6. **Retrieving Protocol Me Token Balance**
   - **protocol_me_balance**: This function returns the current Me token balance at the protocol level.

7. **Setting Up Payment Contract**
   - **set_up_payment**: Admins can configure the Me token contract for the Payment contract.

8. **Retrieving Me Token Address**
   - **get_me_id**: This function allows users to retrieve the address of the Me token contract.

## Conclusion

The Payment contract is a crucial element of the Me Protocol, serving as the gateway for brands to engage in transactions and payments. Brands can deposit, use, and withdraw their Me token shares, while administrators can manage payments for services. The Payment contract plays a pivotal role in ensuring a smooth and secure payment process within the Me Protocol ecosystem.

For detailed information on the Payment contract and its functions, refer to the official documentation or educational materials provided by MY AI, Inc.


# Oracle Contract Documentation

## Introduction

The Oracle contract is a critical component of the Me Protocol, dedicated to a singular function that plays a vital role in ensuring smooth cross-pool interactions. This function is designed to obtain the equivalent value of a reward token from one pool to another. Just like a conventional price oracle, the Oracle contract excels in calculating the corresponding amount of reward between two pools: Pool A and Pool B.

## Oracle Functionality

The Oracle contract implements a single function:

1. **Determine Needed Reward B Given Reward A**
   - **Function Name:** `determine_needed_reward_b_given_reward_a`
   - **Parameters:**
     - `reward_a`: The AccountId of the source pool (Pool A).
     - `reward_b`: The AccountId of the destination pool (Pool B).
     - `amount`: The specified amount in Me tokens.
   - **Return Type:** A `u128` value representing the required amount of the target reward token (Reward B).
   - **Error Handling:** The function returns a `Result` that includes the calculated amount or an error if the operation encounters any issues.

## Conclusion

The Oracle contract serves as a crucial bridge for Me Protocol users, enabling them to seamlessly determine the equivalent value of reward tokens when moving assets between different pools. The Oracle function, `determine_needed_reward_b_given_reward_a`, ensures efficient and accurate conversions, making it an essential tool for users operating within the Me Protocol ecosystem.

For comprehensive information regarding the Oracle contract and its function, please refer to the official documentation or educational resources provided by MY AI, Inc.
