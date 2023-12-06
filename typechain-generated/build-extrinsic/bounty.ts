/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/bounty';
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
	 * withdrawBounty
	 *
	 * @param { ArgumentTypes.AccountId } reward,
	 * @param { (string | number | BN) } amount,
	 * @param { ArgumentTypes.AccountId } requestor,
	 * @param { ArgumentTypes.AccountId } to,
	*/
	"withdrawBounty" (
		reward: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		requestor: ArgumentTypes.AccountId,
		to: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "bountyController::withdrawBounty", [reward, amount, requestor, to], __options);
	}

	/**
	 * setTriggerLimit
	 *
	 * @param { ArgumentTypes.AccountId } reward,
	 * @param { (string | number | BN) } newTriggerLimit,
	 * @param { ArgumentTypes.AccountId } requestor,
	*/
	"setTriggerLimit" (
		reward: ArgumentTypes.AccountId,
		newTriggerLimit: (string | number | BN),
		requestor: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "bountyController::setTriggerLimit", [reward, newTriggerLimit, requestor], __options);
	}

	/**
	 * getTriggerLimit
	 *
	 * @param { ArgumentTypes.AccountId } reward,
	 * @param { ArgumentTypes.AccountId } requestor,
	*/
	"getTriggerLimit" (
		reward: ArgumentTypes.AccountId,
		requestor: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "bountyController::getTriggerLimit", [reward, requestor], __options);
	}

	/**
	 * depositBounty
	 *
	 * @param { ArgumentTypes.AccountId } reward,
	 * @param { (string | number | BN) } amount,
	 * @param { ArgumentTypes.AccountId } requestor,
	*/
	"depositBounty" (
		reward: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		requestor: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "bountyController::depositBounty", [reward, amount, requestor], __options);
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

}