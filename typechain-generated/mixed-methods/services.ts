/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/services';
import type * as ReturnTypes from '../types-returns/services';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import DATA_TYPE_DESCRIPTIONS from '../data/services.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/services.json';


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
	* spendRewardsOnIssuingBrand
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"spendRewardsOnIssuingBrand" (
		reward: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerController::spendRewardsOnIssuingBrand", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, amount], __options);
	}

	/**
	* exchangeBrandRewards
	*
	* @param { ArgumentTypes.AccountId } rewardAtHand,
	* @param { ArgumentTypes.AccountId } targetedReward,
	* @param { (string | number | BN) } amountOfRewardAtHand,
	* @param { (string | number | BN) } expectedAmountOfTargettedReward,
	* @param { ArgumentTypes.AccountId } to,
	* @returns { void }
	*/
	"exchangeBrandRewards" (
		rewardAtHand: ArgumentTypes.AccountId,
		targetedReward: ArgumentTypes.AccountId,
		amountOfRewardAtHand: (string | number | BN),
		expectedAmountOfTargettedReward: (string | number | BN),
		to: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerController::exchangeBrandRewards", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [rewardAtHand, targetedReward, amountOfRewardAtHand, expectedAmountOfTargettedReward, to], __options);
	}

	/**
	* spendRewardsOnOtherBrand
	*
	* @param { ArgumentTypes.AccountId } rewardAtHand,
	* @param { ArgumentTypes.AccountId } targetedReward,
	* @param { (string | number | BN) } amountOfRewardAtHand,
	* @param { (string | number | BN) } expectedAmountOfTargettedReward,
	* @returns { void }
	*/
	"spendRewardsOnOtherBrand" (
		rewardAtHand: ArgumentTypes.AccountId,
		targetedReward: ArgumentTypes.AccountId,
		amountOfRewardAtHand: (string | number | BN),
		expectedAmountOfTargettedReward: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerController::spendRewardsOnOtherBrand", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [rewardAtHand, targetedReward, amountOfRewardAtHand, expectedAmountOfTargettedReward], __options);
	}

	/**
	* registerBrand
	*
	* @param { string | null } brandName,
	* @param { string | null } brandOnlinePresence,
	* @param { ArgumentTypes.AccountId } brandAccount,
	* @param { Array<(number | string | BN)> } brandId,
	* @returns { void }
	*/
	"registerBrand" (
		brandName: string | null,
		brandOnlinePresence: string | null,
		brandAccount: ArgumentTypes.AccountId,
		brandId: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminController::registerBrand", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [brandName, brandOnlinePresence, brandAccount, brandId], __options);
	}

	/**
	* getMeAddress
	*
	* @returns { Result<Result<ReturnTypes.AccountId, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"getMeAddress" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.AccountId, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "adminController::getMeAddress", [], __options, (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* updateTreasuryAddress
	*
	* @param { ArgumentTypes.AccountId } address,
	* @returns { void }
	*/
	"updateTreasuryAddress" (
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminController::updateTreasuryAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [address], __options);
	}

	/**
	* getProtocolRecords
	*
	* @returns { Result<ReturnTypes.EditableProtocolRecords, ReturnTypes.LangError> }
	*/
	"getProtocolRecords" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.EditableProtocolRecords, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "adminController::getProtocolRecords", [], __options, (result) => { return handleReturnType(result, getTypeDescription(32, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getProtocolConfig
	*
	* @returns { Result<ReturnTypes.EditableProtocolConfig, ReturnTypes.LangError> }
	*/
	"getProtocolConfig" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.EditableProtocolConfig, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "adminController::getProtocolConfig", [], __options, (result) => { return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* updateProtocolRecords
	*
	* @param { ArgumentTypes.EditableProtocolRecords } records,
	* @returns { void }
	*/
	"updateProtocolRecords" (
		records: ArgumentTypes.EditableProtocolRecords,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminController::updateProtocolRecords", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [records], __options);
	}

	/**
	* updateProtocolConfigurations
	*
	* @param { ArgumentTypes.EditableProtocolConfig } config,
	* @returns { void }
	*/
	"updateProtocolConfigurations" (
		config: ArgumentTypes.EditableProtocolConfig,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminController::updateProtocolConfigurations", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [config], __options);
	}

	/**
	* topUpTreasuryBalances
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } rewardAmount,
	* @param { (string | number | BN) } meAmount,
	* @param { Array<(number | string | BN)> } brand,
	* @returns { void }
	*/
	"topUpTreasuryBalances" (
		reward: ArgumentTypes.AccountId,
		rewardAmount: (string | number | BN),
		meAmount: (string | number | BN),
		brand: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::topUpTreasuryBalances", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, rewardAmount, meAmount, brand], __options);
	}

	/**
	* updateRewardConfig
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { ArgumentTypes.RewardConfig } rewardConfig,
	* @param { boolean } ignoreDefault,
	* @returns { void }
	*/
	"updateRewardConfig" (
		reward: ArgumentTypes.AccountId,
		rewardConfig: ArgumentTypes.RewardConfig,
		ignoreDefault: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::updateRewardConfig", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, rewardConfig, ignoreDefault], __options);
	}

	/**
	* changeOptimalValuation
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } newOptimalValuation,
	* @param { boolean } autoResumeConversations,
	* @returns { void }
	*/
	"changeOptimalValuation" (
		reward: ArgumentTypes.AccountId,
		newOptimalValuation: (string | number | BN),
		autoResumeConversations: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::changeOptimalValuation", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, newOptimalValuation, autoResumeConversations], __options);
	}

	/**
	* getBrandDetails
	*
	* @param { Array<(number | string | BN)> } brandId,
	* @returns { Result<ReturnTypes.BrandDetails, ReturnTypes.LangError> }
	*/
	"getBrandDetails" (
		brandId: Array<(number | string | BN)>,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.BrandDetails, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "brandController::getBrandDetails", [brandId], __options, (result) => { return handleReturnType(result, getTypeDescription(37, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getRewardDetails
	*
	* @param { ArgumentTypes.AccountId } requestor,
	* @returns { Result<ReturnTypes.RewardDetails, ReturnTypes.LangError> }
	*/
	"getRewardDetails" (
		requestor: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.RewardDetails, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "brandController::getRewardDetails", [requestor], __options, (result) => { return handleReturnType(result, getTypeDescription(39, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* createNewReward
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { string | null } rewardName,
	* @param { string | null } rewardSymbol,
	* @param { string | null } rewardDescriptionLink,
	* @param { (number | string | BN) } rewardType,
	* @param { Array<(number | string | BN)> } brandId,
	* @param { ArgumentTypes.AccountId } requestor,
	* @param { ArgumentTypes.AccountId } poolId,
	* @returns { void }
	*/
	"createNewReward" (
		reward: ArgumentTypes.AccountId,
		rewardName: string | null,
		rewardSymbol: string | null,
		rewardDescriptionLink: string | null,
		rewardType: (number | string | BN),
		brandId: Array<(number | string | BN)>,
		requestor: ArgumentTypes.AccountId,
		poolId: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::createNewReward", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, rewardName, rewardSymbol, rewardDescriptionLink, rewardType, brandId, requestor, poolId], __options);
	}

	/**
	* addLiquidityForOpenRewardsFromTreasury
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } rewardAmount,
	* @param { (string | number | BN) } meAmount,
	* @returns { void }
	*/
	"addLiquidityForOpenRewardsFromTreasury" (
		reward: ArgumentTypes.AccountId,
		rewardAmount: (string | number | BN),
		meAmount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::addLiquidityForOpenRewardsFromTreasury", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, rewardAmount, meAmount], __options);
	}

	/**
	* activateOpenRewards
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @returns { void }
	*/
	"activateOpenRewards" (
		reward: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::activateOpenRewards", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward], __options);
	}

	/**
	* pauseOpenRewards
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @returns { void }
	*/
	"pauseOpenRewards" (
		reward: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::pauseOpenRewards", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward], __options);
	}

	/**
	* integrateExistingReward
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { string | null } rewardDescriptionLink,
	* @param { boolean } readTAndC,
	* @returns { void }
	*/
	"integrateExistingReward" (
		reward: ArgumentTypes.AccountId,
		rewardDescriptionLink: string | null,
		readTAndC: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::integrateExistingReward", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, rewardDescriptionLink, readTAndC], __options);
	}

	/**
	* updatePoolConfiguration
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { ArgumentTypes.EditablePoolConfig } editablePoolConfig,
	* @param { boolean } ignoreDefault,
	* @returns { void }
	*/
	"updatePoolConfiguration" (
		reward: ArgumentTypes.AccountId,
		editablePoolConfig: ArgumentTypes.EditablePoolConfig,
		ignoreDefault: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::updatePoolConfiguration", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, editablePoolConfig, ignoreDefault], __options);
	}

	/**
	* setBountyTriggerLimit
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } triggerLimit,
	* @returns { void }
	*/
	"setBountyTriggerLimit" (
		reward: ArgumentTypes.AccountId,
		triggerLimit: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::setBountyTriggerLimit", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, triggerLimit], __options);
	}

	/**
	* withdrawOpenRewardsLiquidityToTreasury
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { ArgumentTypes.Id } liquidityPosition,
	* @param { (string | number | BN) } rewardAmount,
	* @param { (string | number | BN) } meAmount,
	* @returns { void }
	*/
	"withdrawOpenRewardsLiquidityToTreasury" (
		reward: ArgumentTypes.AccountId,
		liquidityPosition: ArgumentTypes.Id,
		rewardAmount: (string | number | BN),
		meAmount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::withdrawOpenRewardsLiquidityToTreasury", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, liquidityPosition, rewardAmount, meAmount], __options);
	}

	/**
	* getBrandConfigByAddress
	*
	* @param { ArgumentTypes.AccountId } brandAddress,
	* @returns { Result<Result<ReturnTypes.BrandDetails, ReturnTypes.ProtocolError>, ReturnTypes.LangError> }
	*/
	"getBrandConfigByAddress" (
		brandAddress: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.BrandDetails, ReturnTypes.ProtocolError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "brandController::getBrandConfigByAddress", [brandAddress], __options, (result) => { return handleReturnType(result, getTypeDescription(45, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* resumeOpenRewards
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @returns { void }
	*/
	"resumeOpenRewards" (
		reward: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::resumeOpenRewards", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward], __options);
	}

	/**
	* fundBountyPool
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"fundBountyPool" (
		reward: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::fundBountyPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, amount], __options);
	}

	/**
	* withdrawRewardsFromBountyPoolToTreasury
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } amount,
	* @returns { void }
	*/
	"withdrawRewardsFromBountyPoolToTreasury" (
		reward: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::withdrawRewardsFromBountyPoolToTreasury", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, amount], __options);
	}

	/**
	* withdrawTreasuryBalances
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } rewardAmount,
	* @param { (string | number | BN) } meAmount,
	* @param { ArgumentTypes.AccountId } to,
	* @param { Array<(number | string | BN)> } brand,
	* @returns { void }
	*/
	"withdrawTreasuryBalances" (
		reward: ArgumentTypes.AccountId,
		rewardAmount: (string | number | BN),
		meAmount: (string | number | BN),
		to: ArgumentTypes.AccountId,
		brand: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::withdrawTreasuryBalances", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, rewardAmount, meAmount, to, brand], __options);
	}

	/**
	* updateRewardDetails
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { ArgumentTypes.EditableRewardDetails } rewardDetails,
	* @param { boolean } ignoreDefault,
	* @returns { void }
	*/
	"updateRewardDetails" (
		reward: ArgumentTypes.AccountId,
		rewardDetails: ArgumentTypes.EditableRewardDetails,
		ignoreDefault: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::updateRewardDetails", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, rewardDetails, ignoreDefault], __options);
	}

	/**
	* updateBrandConfig
	*
	* @param { ArgumentTypes.GlobalBrandConfig } brandConfig,
	* @param { boolean } ignoreDefault,
	* @returns { void }
	*/
	"updateBrandConfig" (
		brandConfig: ArgumentTypes.GlobalBrandConfig,
		ignoreDefault: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::updateBrandConfig", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [brandConfig, ignoreDefault], __options);
	}

	/**
	* updateROptimal
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } newROptimal,
	* @returns { void }
	*/
	"updateROptimal" (
		reward: ArgumentTypes.AccountId,
		newROptimal: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::updateROptimal", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, newROptimal], __options);
	}

	/**
	* addLiquidityForOpenRewards
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } rewardAmount,
	* @param { (string | number | BN) } meAmount,
	* @returns { void }
	*/
	"addLiquidityForOpenRewards" (
		reward: ArgumentTypes.AccountId,
		rewardAmount: (string | number | BN),
		meAmount: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::addLiquidityForOpenRewards", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, rewardAmount, meAmount], __options);
	}

	/**
	* updateBrandDetails
	*
	* @param { ArgumentTypes.EditableBrandDetails } brandDetails,
	* @param { boolean } ignoreDefault,
	* @returns { void }
	*/
	"updateBrandDetails" (
		brandDetails: ArgumentTypes.EditableBrandDetails,
		ignoreDefault: boolean,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::updateBrandDetails", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [brandDetails, ignoreDefault], __options);
	}

	/**
	* updateBrandDetailsByBrandId
	*
	* @param { ArgumentTypes.BrandDetails } brandDetails,
	* @param { Array<(number | string | BN)> } brandId,
	* @returns { void }
	*/
	"updateBrandDetailsByBrandId" (
		brandDetails: ArgumentTypes.BrandDetails,
		brandId: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::updateBrandDetailsByBrandId", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [brandDetails, brandId], __options);
	}

	/**
	* updateBrandConfigByBrandId
	*
	* @param { ArgumentTypes.GlobalBrandConfig } brandConfig,
	* @param { boolean } ignoreDefault,
	* @param { Array<(number | string | BN)> } brandId,
	* @returns { void }
	*/
	"updateBrandConfigByBrandId" (
		brandConfig: ArgumentTypes.GlobalBrandConfig,
		ignoreDefault: boolean,
		brandId: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::updateBrandConfigByBrandId", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [brandConfig, ignoreDefault, brandId], __options);
	}

	/**
	* changeBrandMainAccount
	*
	* @param { ArgumentTypes.AccountId } newAccount,
	* @param { ArgumentTypes.AccountId } requestor,
	* @returns { void }
	*/
	"changeBrandMainAccount" (
		newAccount: ArgumentTypes.AccountId,
		requestor: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::changeBrandMainAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newAccount, requestor], __options);
	}

	/**
	* getBrandConfigById
	*
	* @param { Array<(number | string | BN)> } brandId,
	* @returns { Result<ReturnTypes.GlobalBrandConfig, ReturnTypes.LangError> }
	*/
	"getBrandConfigById" (
		brandId: Array<(number | string | BN)>,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.GlobalBrandConfig, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "brandController::getBrandConfigById", [brandId], __options, (result) => { return handleReturnType(result, getTypeDescription(50, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::getRoleAdmin", [role], __options, (result) => { return handleReturnType(result, getTypeDescription(51, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "accessControl::hasRole", [role, address], __options, (result) => { return handleReturnType(result, getTypeDescription(53, DATA_TYPE_DESCRIPTIONS)); });
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

}