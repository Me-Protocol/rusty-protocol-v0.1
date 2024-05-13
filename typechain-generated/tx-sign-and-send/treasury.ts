/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/treasury';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/treasury.json';


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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "treasuryController::depositRewardAndOrMe", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, rewardAmount, meAmount, brandId, requestor, metadata], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "treasuryController::receiveCai", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [meAmount, brandId, requestor, metadata], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "treasuryController::payForSomeCosts", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, poolId, rewardAmount, meAmount, brandId, requestor, metadata], __options);
	}

	/**
	* getMeId
	*
	*/
	"getMeId" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "treasuryController::getMeId", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "treasuryController::getRewardNotifyLimit", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, requestor], __options);
	}

	/**
	* getMeNotifyLimit
	*
	* @param { ArgumentTypes.AccountId } requestor,
	*/
	"getMeNotifyLimit" (
		requestor: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "treasuryController::getMeNotifyLimit", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [requestor], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "treasuryController::setRewardNotifyLimit", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, newNotifyLimit, requestor], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "treasuryController::topUpPoolWithRewardAndOrMe", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, poolId, rewardAmount, meAmount, brandId, requestor, metadata], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "treasuryController::withdrawRewardAndOrMe", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, rewardAmount, meAmount, brandId, to, requestor], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "treasuryController::setMeNotifyLimit", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newNotifyLimit, requestor], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::grantRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, account], __options);
	}

	/**
	* getRoleAdmin
	*
	* @param { (number | string | BN) } role,
	*/
	"getRoleAdmin" (
		role: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::getRoleAdmin", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::hasRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, address], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::revokeRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, account], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::renounceRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, account], __options);
	}

}