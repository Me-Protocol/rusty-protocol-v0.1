/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/oracle';
import type BN from 'bn.js';
import type { ApiPromise } from '@polkadot/api';



export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __apiPromise: ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		apiPromise: ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__apiPromise = apiPromise;
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "determineNeededRewardBGivenRewardA", [rewardA, rewardB, amount], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "determineMeAndRewardBalanceInAPool", [pool, reward, meToken], __options);
	}

	/**
	 * getAllBrands
	 *
	 * @param { ArgumentTypes.AccountId } protocol,
	*/
	"getAllBrands" (
		protocol: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getAllBrands", [protocol], __options);
	}

}