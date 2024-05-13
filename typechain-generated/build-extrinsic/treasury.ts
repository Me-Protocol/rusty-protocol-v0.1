/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/treasury';
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
	 * depositRewardAndOrMe
	 *
	 * @param { ArgumentTypes.AccountId } reward,
	 * @param { (string | number | BN) } rewardAmount,
	 * @param { (string | number | BN) } meAmount,
	 * @param { Array<(number | string | BN)> } brandId,
	 * @param { ArgumentTypes.AccountId } requestor,
	 * @param { string | null } metadata,
	*/
	"depositRewardAndOrMe" (
		reward: ArgumentTypes.AccountId,
		rewardAmount: (string | number | BN),
		meAmount: (string | number | BN),
		brandId: Array<(number | string | BN)>,
		requestor: ArgumentTypes.AccountId,
		metadata: string | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "treasuryController::depositRewardAndOrMe", [reward, rewardAmount, meAmount, brandId, requestor, metadata], __options);
	}

	/**
	 * receiveCai
	 *
	 * @param { (string | number | BN) } meAmount,
	 * @param { Array<(number | string | BN)> } brandId,
	 * @param { ArgumentTypes.AccountId } requestor,
	 * @param { string | null } metadata,
	*/
	"receiveCai" (
		meAmount: (string | number | BN),
		brandId: Array<(number | string | BN)>,
		requestor: ArgumentTypes.AccountId,
		metadata: string | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "treasuryController::receiveCai", [meAmount, brandId, requestor, metadata], __options);
	}

	/**
	 * payForSomeCosts
	 *
	 * @param { ArgumentTypes.AccountId } reward,
	 * @param { ArgumentTypes.AccountId } poolId,
	 * @param { (string | number | BN) } rewardAmount,
	 * @param { (string | number | BN) } meAmount,
	 * @param { Array<(number | string | BN)> } brandId,
	 * @param { ArgumentTypes.AccountId } requestor,
	 * @param { string | null } metadata,
	*/
	"payForSomeCosts" (
		reward: ArgumentTypes.AccountId,
		poolId: ArgumentTypes.AccountId,
		rewardAmount: (string | number | BN),
		meAmount: (string | number | BN),
		brandId: Array<(number | string | BN)>,
		requestor: ArgumentTypes.AccountId,
		metadata: string | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "treasuryController::payForSomeCosts", [reward, poolId, rewardAmount, meAmount, brandId, requestor, metadata], __options);
	}

	/**
	 * getMeId
	 *
	*/
	"getMeId" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "treasuryController::getMeId", [], __options);
	}

	/**
	 * getRewardNotifyLimit
	 *
	 * @param { ArgumentTypes.AccountId } reward,
	 * @param { ArgumentTypes.AccountId } requestor,
	*/
	"getRewardNotifyLimit" (
		reward: ArgumentTypes.AccountId,
		requestor: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "treasuryController::getRewardNotifyLimit", [reward, requestor], __options);
	}

	/**
	 * getMeNotifyLimit
	 *
	 * @param { ArgumentTypes.AccountId } requestor,
	*/
	"getMeNotifyLimit" (
		requestor: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "treasuryController::getMeNotifyLimit", [requestor], __options);
	}

	/**
	 * setRewardNotifyLimit
	 *
	 * @param { ArgumentTypes.AccountId } reward,
	 * @param { (string | number | BN) } newNotifyLimit,
	 * @param { ArgumentTypes.AccountId } requestor,
	*/
	"setRewardNotifyLimit" (
		reward: ArgumentTypes.AccountId,
		newNotifyLimit: (string | number | BN),
		requestor: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "treasuryController::setRewardNotifyLimit", [reward, newNotifyLimit, requestor], __options);
	}

	/**
	 * topUpPoolWithRewardAndOrMe
	 *
	 * @param { ArgumentTypes.AccountId } reward,
	 * @param { ArgumentTypes.AccountId } poolId,
	 * @param { (string | number | BN) } rewardAmount,
	 * @param { (string | number | BN) } meAmount,
	 * @param { Array<(number | string | BN)> } brandId,
	 * @param { ArgumentTypes.AccountId } requestor,
	 * @param { string | null } metadata,
	*/
	"topUpPoolWithRewardAndOrMe" (
		reward: ArgumentTypes.AccountId,
		poolId: ArgumentTypes.AccountId,
		rewardAmount: (string | number | BN),
		meAmount: (string | number | BN),
		brandId: Array<(number | string | BN)>,
		requestor: ArgumentTypes.AccountId,
		metadata: string | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "treasuryController::topUpPoolWithRewardAndOrMe", [reward, poolId, rewardAmount, meAmount, brandId, requestor, metadata], __options);
	}

	/**
	 * withdrawRewardAndOrMe
	 *
	 * @param { ArgumentTypes.AccountId } reward,
	 * @param { (string | number | BN) } rewardAmount,
	 * @param { (string | number | BN) } meAmount,
	 * @param { Array<(number | string | BN)> } brandId,
	 * @param { ArgumentTypes.AccountId } to,
	 * @param { ArgumentTypes.AccountId } requestor,
	*/
	"withdrawRewardAndOrMe" (
		reward: ArgumentTypes.AccountId,
		rewardAmount: (string | number | BN),
		meAmount: (string | number | BN),
		brandId: Array<(number | string | BN)>,
		to: ArgumentTypes.AccountId,
		requestor: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "treasuryController::withdrawRewardAndOrMe", [reward, rewardAmount, meAmount, brandId, to, requestor], __options);
	}

	/**
	 * setMeNotifyLimit
	 *
	 * @param { (string | number | BN) } newNotifyLimit,
	 * @param { ArgumentTypes.AccountId } requestor,
	*/
	"setMeNotifyLimit" (
		newNotifyLimit: (string | number | BN),
		requestor: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "treasuryController::setMeNotifyLimit", [newNotifyLimit, requestor], __options);
	}

	/**
	 * grantRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId | null } account,
	*/
	"grantRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::grantRole", [role, account], __options);
	}

	/**
	 * getRoleAdmin
	 *
	 * @param { (number | string | BN) } role,
	*/
	"getRoleAdmin" (
		role: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::getRoleAdmin", [role], __options);
	}

	/**
	 * hasRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId | null } address,
	*/
	"hasRole" (
		role: (number | string | BN),
		address: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::hasRole", [role, address], __options);
	}

	/**
	 * revokeRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId | null } account,
	*/
	"revokeRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::revokeRole", [role, account], __options);
	}

	/**
	 * renounceRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId | null } account,
	*/
	"renounceRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::renounceRole", [role, account], __options);
	}

}