/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/pool';
import type * as ReturnTypes from '../types-returns/pool';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/pool.json';


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
	* engageIncomingConversation
	*
	* @param { (string | number | BN) } expectedRewardAmount,
	* @param { ArgumentTypes.AccountId } outputRewardReceiver,
	* @param { (string | number | BN) } slippageInPrecision,
	* @returns { Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"engageIncomingConversation" (
		expectedRewardAmount: (string | number | BN),
		outputRewardReceiver: ArgumentTypes.AccountId,
		slippageInPrecision: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::engageIncomingConversation", [expectedRewardAmount, outputRewardReceiver, slippageInPrecision], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* addOpenRewardsManager
	*
	* @param { ArgumentTypes.AccountId } newPoolManager,
	* @returns { Result<Result<null, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"addOpenRewardsManager" (
		newPoolManager: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::addOpenRewardsManager", [newPoolManager], __options , (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getAllPositions
	*
	* @param { ArgumentTypes.AccountId } requestor,
	* @returns { Result<Result<Array<ReturnTypes.Id>, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"getAllPositions" (
		requestor: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Id>, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::getAllPositions", [requestor], __options , (result) => { return handleReturnType(result, getTypeDescription(26, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* withdrawProtocolMeOffsetWithdrawable
	*
	* @param { (string | number | BN) } meAmountToWithdraw,
	* @returns { Result<Result<boolean, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"withdrawProtocolMeOffsetWithdrawable" (
		meAmountToWithdraw: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<boolean, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::withdrawProtocolMeOffsetWithdrawable", [meAmountToWithdraw], __options , (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getPositionData
	*
	* @param { (string | number | BN) } position,
	* @returns { Result<Result<[ReturnNumber, ReturnNumber], ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"getPositionData" (
		position: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<[ReturnNumber, ReturnNumber], ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::getPositionData", [position], __options , (result) => { return handleReturnType(result, getTypeDescription(32, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* changeROptimal
	*
	* @param { (string | number | BN) } newROptimal,
	* @returns { Result<Result<boolean, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"changeROptimal" (
		newROptimal: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<boolean, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::changeROptimal", [newROptimal], __options , (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getLiquidityRatios
	*
	* @returns { Result<[ReturnNumber, ReturnNumber], ReturnTypes.LangError> }
	*/
	"getLiquidityRatios" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<[ReturnNumber, ReturnNumber], ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::getLiquidityRatios", [], __options , (result) => { return handleReturnType(result, getTypeDescription(35, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getROptimal
	*
	* @returns { Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"getROptimal" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::getROptimal", [], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* resumeOpenRewards
	*
	* @returns { Result<Result<boolean, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"resumeOpenRewards" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<boolean, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::resumeOpenRewards", [], __options , (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* checkIfIsOpenRewardsManager
	*
	* @param { ArgumentTypes.AccountId } poolManager,
	* @returns { Result<Result<boolean, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"checkIfIsOpenRewardsManager" (
		poolManager: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<boolean, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::checkIfIsOpenRewardsManager", [poolManager], __options , (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* determineNeededRewardAmountGivenMeAmount
	*
	* @param { (string | number | BN) } meAmount,
	* @param { (string | number | BN) } slippageInPrecision,
	* @returns { Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"determineNeededRewardAmountGivenMeAmount" (
		meAmount: (string | number | BN),
		slippageInPrecision: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::determineNeededRewardAmountGivenMeAmount", [meAmount, slippageInPrecision], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getOpenRewardsConfigurations
	*
	* @returns { Result<[ReturnNumber, ReturnNumber, ReturnNumber, ReturnNumber, ReturnNumber, ReturnNumber, ReturnNumber, boolean], ReturnTypes.LangError> }
	*/
	"getOpenRewardsConfigurations" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<[ReturnNumber, ReturnNumber, ReturnNumber, ReturnNumber, ReturnNumber, ReturnNumber, ReturnNumber, boolean], ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::getOpenRewardsConfigurations", [], __options , (result) => { return handleReturnType(result, getTypeDescription(36, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getPositionByIndex
	*
	* @param { ArgumentTypes.AccountId } requestor,
	* @param { (string | number | BN) } index,
	* @returns { Result<Result<ReturnTypes.Id, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"getPositionByIndex" (
		requestor: ArgumentTypes.AccountId,
		index: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Id, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::getPositionByIndex", [requestor, index], __options , (result) => { return handleReturnType(result, getTypeDescription(38, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* determineOptimalNeededMeAmountGivenRewardAmount
	*
	* @param { (string | number | BN) } rewardAmount,
	* @returns { Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"determineOptimalNeededMeAmountGivenRewardAmount" (
		rewardAmount: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::determineOptimalNeededMeAmountGivenRewardAmount", [rewardAmount], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getOpenRewardsState
	*
	* @returns { Result<[boolean, boolean, boolean, ReturnTypes.AccountId, ReturnTypes.AccountId, ReturnTypes.AccountId, ReturnNumber, ReturnNumber, ReturnNumber, number], ReturnTypes.LangError> }
	*/
	"getOpenRewardsState" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<[boolean, boolean, boolean, ReturnTypes.AccountId, ReturnTypes.AccountId, ReturnTypes.AccountId, ReturnNumber, ReturnNumber, ReturnNumber, number], ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::getOpenRewardsState", [], __options , (result) => { return handleReturnType(result, getTypeDescription(40, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getLiquidityIds
	*
	* @returns { Result<[ReturnTypes.AccountId, ReturnTypes.AccountId, ReturnTypes.AccountId], ReturnTypes.LangError> }
	*/
	"getLiquidityIds" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<[ReturnTypes.AccountId, ReturnTypes.AccountId, ReturnTypes.AccountId], ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::getLiquidityIds", [], __options , (result) => { return handleReturnType(result, getTypeDescription(42, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getBalance
	*
	* @param { ArgumentTypes.AccountId } token,
	* @param { ArgumentTypes.AccountId } account,
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"getBalance" (
		token: ArgumentTypes.AccountId,
		account: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::getBalance", [token, account], __options , (result) => { return handleReturnType(result, getTypeDescription(44, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* startOpenRewards
	*
	* @returns { Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"startOpenRewards" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::startOpenRewards", [], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* forcefullyWithdrawProtocolOffsetMeTokens
	*
	* @param { (string | number | BN) } meAmountToWithdraw,
	* @returns { Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"forcefullyWithdrawProtocolOffsetMeTokens" (
		meAmountToWithdraw: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::forcefullyWithdrawProtocolOffsetMeTokens", [meAmountToWithdraw], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* initiateOutgoingConversation
	*
	* @param { (string | number | BN) } rewardAmountIn,
	* @param { (string | number | BN) } expectedOutputRewardAmount,
	* @param { ArgumentTypes.AccountId } listener,
	* @param { (string | number | BN) } listenerROptimal,
	* @param { ArgumentTypes.AccountId } requestor,
	* @param { ArgumentTypes.AccountId } outputRewardReceiver,
	* @param { (string | number | BN) } slippageInPrecision,
	* @returns { Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"initiateOutgoingConversation" (
		rewardAmountIn: (string | number | BN),
		expectedOutputRewardAmount: (string | number | BN),
		listener: ArgumentTypes.AccountId,
		listenerROptimal: (string | number | BN),
		requestor: ArgumentTypes.AccountId,
		outputRewardReceiver: ArgumentTypes.AccountId,
		slippageInPrecision: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::initiateOutgoingConversation", [rewardAmountIn, expectedOutputRewardAmount, listener, listenerROptimal, requestor, outputRewardReceiver, slippageInPrecision], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* withdrawProtocolMeOffsetOnlyMeTokens
	*
	* @param { (string | number | BN) } meAmountToWithdraw,
	* @returns { Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"withdrawProtocolMeOffsetOnlyMeTokens" (
		meAmountToWithdraw: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::withdrawProtocolMeOffsetOnlyMeTokens", [meAmountToWithdraw], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* withdrawProtocolMeOffsetWithRewardsIfNeedBe
	*
	* @param { (string | number | BN) } meAmountToWithdraw,
	* @returns { Result<Result<[ReturnNumber, ReturnNumber], ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"withdrawProtocolMeOffsetWithRewardsIfNeedBe" (
		meAmountToWithdraw: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<[ReturnNumber, ReturnNumber], ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::withdrawProtocolMeOffsetWithRewardsIfNeedBe", [meAmountToWithdraw], __options , (result) => { return handleReturnType(result, getTypeDescription(32, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* addProtocolMeOffset
	*
	* @param { (string | number | BN) } expectedMeOffset,
	* @returns { Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"addProtocolMeOffset" (
		expectedMeOffset: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::addProtocolMeOffset", [expectedMeOffset], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* removeOpenRewardsManager
	*
	* @param { ArgumentTypes.AccountId } poolManager,
	* @returns { Result<Result<null, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"removeOpenRewardsManager" (
		poolManager: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::removeOpenRewardsManager", [poolManager], __options , (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* changePoolConfigExceptROptimal
	*
	* @param { ArgumentTypes.EditablePoolConfig } editableConfig,
	* @param { boolean } ignoreDefault,
	* @returns { Result<Result<boolean, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"changePoolConfigExceptROptimal" (
		editableConfig: ArgumentTypes.EditablePoolConfig,
		ignoreDefault: boolean,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<boolean, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::changePoolConfigExceptROptimal", [editableConfig, ignoreDefault], __options , (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* recordLiquidityProvided
	*
	* @param { (string | number | BN) } poolNumeratorAmount,
	* @param { (string | number | BN) } poolDivisorAmount,
	* @param { ArgumentTypes.AccountId } requestor,
	* @param { ArgumentTypes.AccountId } to,
	* @returns { Result<Result<null, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"recordLiquidityProvided" (
		poolNumeratorAmount: (string | number | BN),
		poolDivisorAmount: (string | number | BN),
		requestor: ArgumentTypes.AccountId,
		to: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::recordLiquidityProvided", [poolNumeratorAmount, poolDivisorAmount, requestor, to], __options , (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* pauseOpenRewards
	*
	* @returns { Result<Result<boolean, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"pauseOpenRewards" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<boolean, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::pauseOpenRewards", [], __options , (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* withdrawLiquidity
	*
	* @param { ArgumentTypes.Id } position,
	* @param { (string | number | BN) } poolNumeratorAmount,
	* @param { (string | number | BN) } poolDivisorAmount,
	* @param { ArgumentTypes.AccountId } requestor,
	* @param { ArgumentTypes.AccountId } to,
	* @returns { Result<Result<null, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"withdrawLiquidity" (
		position: ArgumentTypes.Id,
		poolNumeratorAmount: (string | number | BN),
		poolDivisorAmount: (string | number | BN),
		requestor: ArgumentTypes.AccountId,
		to: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::withdrawLiquidity", [position, poolNumeratorAmount, poolDivisorAmount, requestor, to], __options , (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* checkOpenRewardsState
	*
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"checkOpenRewardsState" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::checkOpenRewardsState", [], __options , (result) => { return handleReturnType(result, getTypeDescription(46, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getRoleAdmin
	*
	* @param { (number | string | BN) } role,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getRoleAdmin" (
		role: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::getRoleAdmin", [role], __options , (result) => { return handleReturnType(result, getTypeDescription(47, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* hasRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } address,
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"hasRole" (
		role: (number | string | BN),
		address: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::hasRole", [role, address], __options , (result) => { return handleReturnType(result, getTypeDescription(46, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* renounceRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } account,
	* @returns { Result<Result<null, ReturnTypes.AccessControlError>, ReturnTypes.LangError> }
	*/
	"renounceRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.AccessControlError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::renounceRole", [role, account], __options , (result) => { return handleReturnType(result, getTypeDescription(49, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* revokeRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } account,
	* @returns { Result<Result<null, ReturnTypes.AccessControlError>, ReturnTypes.LangError> }
	*/
	"revokeRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.AccessControlError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::revokeRole", [role, account], __options , (result) => { return handleReturnType(result, getTypeDescription(49, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* grantRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } account,
	* @returns { Result<Result<null, ReturnTypes.AccessControlError>, ReturnTypes.LangError> }
	*/
	"grantRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.AccessControlError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::grantRole", [role, account], __options , (result) => { return handleReturnType(result, getTypeDescription(49, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* collectionId
	*
	* @returns { Result<ReturnTypes.Id, ReturnTypes.LangError> }
	*/
	"collectionId" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.Id, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::collectionId", [], __options , (result) => { return handleReturnType(result, getTypeDescription(51, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* balanceOf
	*
	* @param { ArgumentTypes.AccountId } owner,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"balanceOf" (
		owner: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::balanceOf", [owner], __options , (result) => { return handleReturnType(result, getTypeDescription(47, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* ownerOf
	*
	* @param { ArgumentTypes.Id } id,
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"ownerOf" (
		id: ArgumentTypes.Id,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::ownerOf", [id], __options , (result) => { return handleReturnType(result, getTypeDescription(52, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* allowance
	*
	* @param { ArgumentTypes.AccountId } owner,
	* @param { ArgumentTypes.AccountId } operator,
	* @param { ArgumentTypes.Id | null } id,
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"allowance" (
		owner: ArgumentTypes.AccountId,
		operator: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::allowance", [owner, operator, id], __options , (result) => { return handleReturnType(result, getTypeDescription(46, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* transfer
	*
	* @param { ArgumentTypes.AccountId } to,
	* @param { ArgumentTypes.Id } id,
	* @param { Array<(number | string | BN)> } data,
	* @returns { Result<Result<null, ReturnTypes.PSP34Error>, ReturnTypes.LangError> }
	*/
	"transfer" (
		to: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		data: Array<(number | string | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.PSP34Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::transfer", [to, id, data], __options , (result) => { return handleReturnType(result, getTypeDescription(54, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* totalSupply
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalSupply" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::totalSupply", [], __options , (result) => { return handleReturnType(result, getTypeDescription(44, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* approve
	*
	* @param { ArgumentTypes.AccountId } operator,
	* @param { ArgumentTypes.Id | null } id,
	* @param { boolean } approved,
	* @returns { Result<Result<null, ReturnTypes.PSP34Error>, ReturnTypes.LangError> }
	*/
	"approve" (
		operator: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id | null,
		approved: boolean,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.PSP34Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::approve", [operator, id, approved], __options , (result) => { return handleReturnType(result, getTypeDescription(54, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* ownersTokenByIndex
	*
	* @param { ArgumentTypes.AccountId } owner,
	* @param { (string | number | BN) } index,
	* @returns { Result<Result<ReturnTypes.Id, ReturnTypes.PSP34Error>, ReturnTypes.LangError> }
	*/
	"ownersTokenByIndex" (
		owner: ArgumentTypes.AccountId,
		index: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Id, ReturnTypes.PSP34Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Enumerable::ownersTokenByIndex", [owner, index], __options , (result) => { return handleReturnType(result, getTypeDescription(56, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* tokenByIndex
	*
	* @param { (string | number | BN) } index,
	* @returns { Result<Result<ReturnTypes.Id, ReturnTypes.PSP34Error>, ReturnTypes.LangError> }
	*/
	"tokenByIndex" (
		index: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Id, ReturnTypes.PSP34Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Enumerable::tokenByIndex", [index], __options , (result) => { return handleReturnType(result, getTypeDescription(56, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* mint
	*
	* @param { ArgumentTypes.AccountId } account,
	* @param { ArgumentTypes.Id } id,
	* @returns { Result<Result<null, ReturnTypes.PSP34Error>, ReturnTypes.LangError> }
	*/
	"mint" (
		account: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.PSP34Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Mintable::mint", [account, id], __options , (result) => { return handleReturnType(result, getTypeDescription(54, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* burn
	*
	* @param { ArgumentTypes.AccountId } account,
	* @param { ArgumentTypes.Id } id,
	* @returns { Result<Result<null, ReturnTypes.PSP34Error>, ReturnTypes.LangError> }
	*/
	"burn" (
		account: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.PSP34Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Burnable::burn", [account, id], __options , (result) => { return handleReturnType(result, getTypeDescription(54, DATA_TYPE_DESCRIPTIONS)); });
	}

}