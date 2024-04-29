/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/pool';
import type * as ReturnTypes from '../types-returns/pool';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import DATA_TYPE_DESCRIPTIONS from '../data/pool.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/pool.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __keyringPair : KeyringPair;
	readonly __callerAddress : string;
	readonly __apiPromise: ApiPromise;

	constructor(
		apiPromise : ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
		this.__callerAddress = keyringPair.address;
	}

	/**
	* determineNeededRewardAmountGivenMeAmount
	*
	* @param { (string | number | BN) } meAmount,
	* @param { (string | number | BN) } slippageInPrecision,
	* @returns { void }
	*/
	"determineNeededRewardAmountGivenMeAmount" (
		meAmount: (string | number | BN),
		slippageInPrecision: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::determineNeededRewardAmountGivenMeAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [meAmount, slippageInPrecision], __options);
	}

	/**
	* withdrawLiquidity
	*
	* @param { ArgumentTypes.Id } position,
	* @param { (string | number | BN) } poolNumeratorAmount,
	* @param { (string | number | BN) } poolDivisorAmount,
	* @param { ArgumentTypes.AccountId } requestor,
	* @param { ArgumentTypes.AccountId } to,
	* @returns { void }
	*/
	"withdrawLiquidity" (
		position: ArgumentTypes.Id,
		poolNumeratorAmount: (string | number | BN),
		poolDivisorAmount: (string | number | BN),
		requestor: ArgumentTypes.AccountId,
		to: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::withdrawLiquidity", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [position, poolNumeratorAmount, poolDivisorAmount, requestor, to], __options);
	}

	/**
	* getLiquidityRatios
	*
	* @returns { Result<[ReturnNumber, ReturnNumber], ReturnTypes.LangError> }
	*/
	"getLiquidityRatios" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<[ReturnNumber, ReturnNumber], ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::getLiquidityRatios", [], __options, (result) => { return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* withdrawProtocolMeOffsetWithRewardsIfNeedBe
	*
	* @param { (string | number | BN) } meAmountToWithdraw,
	* @returns { void }
	*/
	"withdrawProtocolMeOffsetWithRewardsIfNeedBe" (
		meAmountToWithdraw: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::withdrawProtocolMeOffsetWithRewardsIfNeedBe", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [meAmountToWithdraw], __options);
	}

	/**
	* getPositionData
	*
	* @param { (string | number | BN) } position,
	* @returns { Result<Result<[ReturnNumber, ReturnNumber], ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"getPositionData" (
		position: (string | number | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<[ReturnNumber, ReturnNumber], ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::getPositionData", [position], __options, (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getAllPositions
	*
	* @param { ArgumentTypes.AccountId } requestor,
	* @returns { Result<Result<Array<ReturnTypes.Id>, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"getAllPositions" (
		requestor: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Id>, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::getAllPositions", [requestor], __options, (result) => { return handleReturnType(result, getTypeDescription(31, DATA_TYPE_DESCRIPTIONS)); });
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
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Id, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::getPositionByIndex", [requestor, index], __options, (result) => { return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* changeROptimal
	*
	* @param { (string | number | BN) } newROptimal,
	* @returns { void }
	*/
	"changeROptimal" (
		newROptimal: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::changeROptimal", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newROptimal], __options);
	}

	/**
	* getOpenRewardsState
	*
	* @returns { Result<[boolean, boolean, boolean, ReturnTypes.AccountId, ReturnTypes.AccountId, ReturnTypes.AccountId, ReturnNumber, ReturnNumber, ReturnNumber, number], ReturnTypes.LangError> }
	*/
	"getOpenRewardsState" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<[boolean, boolean, boolean, ReturnTypes.AccountId, ReturnTypes.AccountId, ReturnTypes.AccountId, ReturnNumber, ReturnNumber, ReturnNumber, number], ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::getOpenRewardsState", [], __options, (result) => { return handleReturnType(result, getTypeDescription(38, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getOpenRewardsConfigurations
	*
	* @returns { Result<[ReturnNumber, ReturnNumber, ReturnNumber, ReturnNumber, ReturnNumber, ReturnNumber, ReturnNumber, boolean], ReturnTypes.LangError> }
	*/
	"getOpenRewardsConfigurations" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<[ReturnNumber, ReturnNumber, ReturnNumber, ReturnNumber, ReturnNumber, ReturnNumber, ReturnNumber, boolean], ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::getOpenRewardsConfigurations", [], __options, (result) => { return handleReturnType(result, getTypeDescription(40, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* addProtocolMeOffset
	*
	* @param { (string | number | BN) } expectedMeOffset,
	* @returns { void }
	*/
	"addProtocolMeOffset" (
		expectedMeOffset: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::addProtocolMeOffset", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [expectedMeOffset], __options);
	}

	/**
	* pauseOpenRewards
	*
	* @returns { void }
	*/
	"pauseOpenRewards" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::pauseOpenRewards", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* engageIncomingConversation
	*
	* @param { (string | number | BN) } expectedRewardAmount,
	* @param { ArgumentTypes.AccountId } outputRewardReceiver,
	* @param { (string | number | BN) } slippageInPrecision,
	* @returns { void }
	*/
	"engageIncomingConversation" (
		expectedRewardAmount: (string | number | BN),
		outputRewardReceiver: ArgumentTypes.AccountId,
		slippageInPrecision: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::engageIncomingConversation", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [expectedRewardAmount, outputRewardReceiver, slippageInPrecision], __options);
	}

	/**
	* changePoolConfigExceptROptimal
	*
	* @param { ArgumentTypes.EditablePoolConfig } editableConfig,
	* @param { boolean } ignoreDefault,
	* @returns { void }
	*/
	"changePoolConfigExceptROptimal" (
		editableConfig: ArgumentTypes.EditablePoolConfig,
		ignoreDefault: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::changePoolConfigExceptROptimal", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [editableConfig, ignoreDefault], __options);
	}

	/**
	* withdrawProtocolMeOffsetOnlyMeTokens
	*
	* @param { (string | number | BN) } meAmountToWithdraw,
	* @returns { void }
	*/
	"withdrawProtocolMeOffsetOnlyMeTokens" (
		meAmountToWithdraw: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::withdrawProtocolMeOffsetOnlyMeTokens", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [meAmountToWithdraw], __options);
	}

	/**
	* getROptimal
	*
	* @returns { void }
	*/
	"getROptimal" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::getROptimal", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* recordLiquidityProvided
	*
	* @param { (string | number | BN) } poolNumeratorAmount,
	* @param { (string | number | BN) } poolDivisorAmount,
	* @param { ArgumentTypes.AccountId } requestor,
	* @param { ArgumentTypes.AccountId } to,
	* @returns { void }
	*/
	"recordLiquidityProvided" (
		poolNumeratorAmount: (string | number | BN),
		poolDivisorAmount: (string | number | BN),
		requestor: ArgumentTypes.AccountId,
		to: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::recordLiquidityProvided", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [poolNumeratorAmount, poolDivisorAmount, requestor, to], __options);
	}

	/**
	* removeOpenRewardsManager
	*
	* @param { ArgumentTypes.AccountId } poolManager,
	* @returns { void }
	*/
	"removeOpenRewardsManager" (
		poolManager: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::removeOpenRewardsManager", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [poolManager], __options);
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
	* @returns { void }
	*/
	"initiateOutgoingConversation" (
		rewardAmountIn: (string | number | BN),
		expectedOutputRewardAmount: (string | number | BN),
		listener: ArgumentTypes.AccountId,
		listenerROptimal: (string | number | BN),
		requestor: ArgumentTypes.AccountId,
		outputRewardReceiver: ArgumentTypes.AccountId,
		slippageInPrecision: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::initiateOutgoingConversation", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [rewardAmountIn, expectedOutputRewardAmount, listener, listenerROptimal, requestor, outputRewardReceiver, slippageInPrecision], __options);
	}

	/**
	* resumeOpenRewards
	*
	* @returns { void }
	*/
	"resumeOpenRewards" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::resumeOpenRewards", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
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
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::getBalance", [token, account], __options, (result) => { return handleReturnType(result, getTypeDescription(43, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* withdrawProtocolMeOffsetWithdrawable
	*
	* @param { (string | number | BN) } meAmountToWithdraw,
	* @returns { void }
	*/
	"withdrawProtocolMeOffsetWithdrawable" (
		meAmountToWithdraw: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::withdrawProtocolMeOffsetWithdrawable", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [meAmountToWithdraw], __options);
	}

	/**
	* checkOpenRewardsState
	*
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"checkOpenRewardsState" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::checkOpenRewardsState", [], __options, (result) => { return handleReturnType(result, getTypeDescription(44, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* startOpenRewards
	*
	* @returns { void }
	*/
	"startOpenRewards" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::startOpenRewards", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* forcefullyWithdrawProtocolOffsetMeTokens
	*
	* @param { (string | number | BN) } meAmountToWithdraw,
	* @returns { void }
	*/
	"forcefullyWithdrawProtocolOffsetMeTokens" (
		meAmountToWithdraw: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::forcefullyWithdrawProtocolOffsetMeTokens", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [meAmountToWithdraw], __options);
	}

	/**
	* determineOptimalNeededMeAmountGivenRewardAmount
	*
	* @param { (string | number | BN) } rewardAmount,
	* @returns { void }
	*/
	"determineOptimalNeededMeAmountGivenRewardAmount" (
		rewardAmount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::determineOptimalNeededMeAmountGivenRewardAmount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [rewardAmount], __options);
	}

	/**
	* getLiquidityIds
	*
	* @returns { Result<[ReturnTypes.AccountId, ReturnTypes.AccountId, ReturnTypes.AccountId], ReturnTypes.LangError> }
	*/
	"getLiquidityIds" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<[ReturnTypes.AccountId, ReturnTypes.AccountId, ReturnTypes.AccountId], ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::getLiquidityIds", [], __options, (result) => { return handleReturnType(result, getTypeDescription(45, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* checkIfIsOpenRewardsManager
	*
	* @param { ArgumentTypes.AccountId } poolManager,
	* @returns { Result<Result<boolean, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"checkIfIsOpenRewardsManager" (
		poolManager: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<boolean, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "poolController::checkIfIsOpenRewardsManager", [poolManager], __options, (result) => { return handleReturnType(result, getTypeDescription(36, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* addOpenRewardsManager
	*
	* @param { ArgumentTypes.AccountId } newPoolManager,
	* @returns { void }
	*/
	"addOpenRewardsManager" (
		newPoolManager: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "poolController::addOpenRewardsManager", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newPoolManager], __options);
	}

	/**
	* grantRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } account,
	* @returns { void }
	*/
	"grantRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::grantRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, account], __options);
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
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::hasRole", [role, address], __options, (result) => { return handleReturnType(result, getTypeDescription(44, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getRoleAdmin
	*
	* @param { (number | string | BN) } role,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getRoleAdmin" (
		role: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::getRoleAdmin", [role], __options, (result) => { return handleReturnType(result, getTypeDescription(50, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* revokeRole
	*
	* @param { (number | string | BN) } role,
	* @param { ArgumentTypes.AccountId | null } account,
	* @returns { void }
	*/
	"revokeRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
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
	* @returns { void }
	*/
	"renounceRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "accessControl::renounceRole", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [role, account], __options);
	}

	/**
	* collectionId
	*
	* @returns { Result<ReturnTypes.Id, ReturnTypes.LangError> }
	*/
	"collectionId" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.Id, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::collectionId", [], __options, (result) => { return handleReturnType(result, getTypeDescription(51, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* balanceOf
	*
	* @param { ArgumentTypes.AccountId } owner,
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"balanceOf" (
		owner: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::balanceOf", [owner], __options, (result) => { return handleReturnType(result, getTypeDescription(50, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* approve
	*
	* @param { ArgumentTypes.AccountId } operator,
	* @param { ArgumentTypes.Id | null } id,
	* @param { boolean } approved,
	* @returns { void }
	*/
	"approve" (
		operator: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id | null,
		approved: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::approve", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [operator, id, approved], __options);
	}

	/**
	* transfer
	*
	* @param { ArgumentTypes.AccountId } to,
	* @param { ArgumentTypes.Id } id,
	* @param { Array<(number | string | BN)> } data,
	* @returns { void }
	*/
	"transfer" (
		to: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		data: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34::transfer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [to, id, data], __options);
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
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::allowance", [owner, operator, id], __options, (result) => { return handleReturnType(result, getTypeDescription(44, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* ownerOf
	*
	* @param { ArgumentTypes.Id } id,
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"ownerOf" (
		id: ArgumentTypes.Id,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::ownerOf", [id], __options, (result) => { return handleReturnType(result, getTypeDescription(55, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* totalSupply
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"totalSupply" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34::totalSupply", [], __options, (result) => { return handleReturnType(result, getTypeDescription(43, DATA_TYPE_DESCRIPTIONS)); });
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
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Id, ReturnTypes.PSP34Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Enumerable::ownersTokenByIndex", [owner, index], __options, (result) => { return handleReturnType(result, getTypeDescription(56, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* tokenByIndex
	*
	* @param { (string | number | BN) } index,
	* @returns { Result<Result<ReturnTypes.Id, ReturnTypes.PSP34Error>, ReturnTypes.LangError> }
	*/
	"tokenByIndex" (
		index: (string | number | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Id, ReturnTypes.PSP34Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "psp34Enumerable::tokenByIndex", [index], __options, (result) => { return handleReturnType(result, getTypeDescription(56, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* mint
	*
	* @param { ArgumentTypes.AccountId } account,
	* @param { ArgumentTypes.Id } id,
	* @returns { void }
	*/
	"mint" (
		account: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34Mintable::mint", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [account, id], __options);
	}

	/**
	* burn
	*
	* @param { ArgumentTypes.AccountId } account,
	* @param { ArgumentTypes.Id } id,
	* @returns { void }
	*/
	"burn" (
		account: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "psp34Burnable::burn", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [account, id], __options);
	}

}