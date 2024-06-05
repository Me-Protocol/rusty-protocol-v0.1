/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/oracle';
import type * as ReturnTypes from '../types-returns/oracle';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/oracle.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __apiPromise: ApiPromise;
	readonly __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		nativeApi : ApiPromise,
		callerAddress : string,
	) {
		this.__nativeContract = nativeContract;
		this.__callerAddress = callerAddress;
		this.__apiPromise = nativeApi;
	}

	/**
	* determineNeededRewardBGivenRewardA
	*
	* @param { ArgumentTypes.AccountId } rewardA,
	* @param { ArgumentTypes.AccountId } rewardB,
	* @param { (string | number | BN) } amount,
	* @returns { Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"determineNeededRewardBGivenRewardA" (
		rewardA: ArgumentTypes.AccountId,
		rewardB: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "determineNeededRewardBGivenRewardA", [rewardA, rewardB, amount], __options , (result) => { return handleReturnType(result, getTypeDescription(8, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* determineMeAndRewardBalanceInAPool
	*
	* @param { ArgumentTypes.AccountId } pool,
	* @param { ArgumentTypes.AccountId } reward,
	* @param { ArgumentTypes.AccountId } meToken,
	* @returns { Result<[ReturnNumber, ReturnNumber], ReturnTypes.LangError> }
	*/
	"determineMeAndRewardBalanceInAPool" (
		pool: ArgumentTypes.AccountId,
		reward: ArgumentTypes.AccountId,
		meToken: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<[ReturnNumber, ReturnNumber], ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "determineMeAndRewardBalanceInAPool", [pool, reward, meToken], __options , (result) => { return handleReturnType(result, getTypeDescription(20, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getAllBrands
	*
	* @param { ArgumentTypes.AccountId } protocol,
	* @returns { Result<Array<Array<number>>, ReturnTypes.LangError> }
	*/
	"getAllBrands" (
		protocol: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Array<Array<number>>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getAllBrands", [protocol], __options , (result) => { return handleReturnType(result, getTypeDescription(22, DATA_TYPE_DESCRIPTIONS)); });
	}

}