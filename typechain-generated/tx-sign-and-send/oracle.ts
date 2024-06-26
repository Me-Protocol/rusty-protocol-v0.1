/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/oracle';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/oracle.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __keyringPair : KeyringPair;
	readonly __apiPromise: ApiPromise;

	constructor(
		apiPromise: ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
	}

	/**
	* determineNeededRewardBGivenRewardA
	*
	* @param { ArgumentTypes.AccountId } rewardA,
	* @param { ArgumentTypes.AccountId } rewardB,
	* @param { (string | number | BN) } amount,
	*/
	"determineNeededRewardBGivenRewardA" (
		rewardA: ArgumentTypes.AccountId,
		rewardB: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "determineNeededRewardBGivenRewardA", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [rewardA, rewardB, amount], __options);
	}

	/**
	* determineMeAndRewardBalanceInAPool
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { ArgumentTypes.AccountId } reward,
	* @param { ArgumentTypes.AccountId } meToken,
	*/
	"determineMeAndRewardBalanceInAPool" (
		pool: ArgumentTypes.AccountId,
		reward: ArgumentTypes.AccountId,
		meToken: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "determineMeAndRewardBalanceInAPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [pool, reward, meToken], __options);
	}

	/**
	* getAllBrands
	*
	* @param { ArgumentTypes.AccountId } protocol,
	*/
	"getAllBrands" (
		protocol: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getAllBrands", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [protocol], __options);
	}

}