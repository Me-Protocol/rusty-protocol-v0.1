/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/services';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/services.json';


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
	* exchangeBrandRewards
	*
	* @param { ArgumentTypes.AccountId } rewardAtHand,
	* @param { ArgumentTypes.AccountId } targetedReward,
	* @param { (string | number | BN) } amountOfRewardAtHand,
	* @param { (string | number | BN) } expectedAmountOfTargettedReward,
	* @param { ArgumentTypes.AccountId } to,
	*/
	"exchangeBrandRewards" (
		rewardAtHand: ArgumentTypes.AccountId,
		targetedReward: ArgumentTypes.AccountId,
		amountOfRewardAtHand: (string | number | BN),
		expectedAmountOfTargettedReward: (string | number | BN),
		to: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerController::exchangeBrandRewards", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [rewardAtHand, targetedReward, amountOfRewardAtHand, expectedAmountOfTargettedReward, to], __options);
	}

	/**
	* spendRewardsOnIssuingBrand
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } amount,
	*/
	"spendRewardsOnIssuingBrand" (
		reward: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerController::spendRewardsOnIssuingBrand", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, amount], __options);
	}

	/**
	* spendRewardsOnOtherBrand
	*
	* @param { ArgumentTypes.AccountId } rewardAtHand,
	* @param { ArgumentTypes.AccountId } targetedReward,
	* @param { (string | number | BN) } amountOfRewardAtHand,
	* @param { (string | number | BN) } expectedAmountOfTargettedReward,
	*/
	"spendRewardsOnOtherBrand" (
		rewardAtHand: ArgumentTypes.AccountId,
		targetedReward: ArgumentTypes.AccountId,
		amountOfRewardAtHand: (string | number | BN),
		expectedAmountOfTargettedReward: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerController::spendRewardsOnOtherBrand", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [rewardAtHand, targetedReward, amountOfRewardAtHand, expectedAmountOfTargettedReward], __options);
	}

	/**
	* updateProtocolRecords
	*
	* @param { ArgumentTypes.EditableProtocolRecords } records,
	*/
	"updateProtocolRecords" (
		records: ArgumentTypes.EditableProtocolRecords,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminController::updateProtocolRecords", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [records], __options);
	}

	/**
	* updateTreasuryAddress
	*
	* @param { ArgumentTypes.AccountId } address,
	*/
	"updateTreasuryAddress" (
		address: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminController::updateTreasuryAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [address], __options);
	}

	/**
	* registerBrand
	*
	* @param { string | null } brandName,
	* @param { string | null } brandOnlinePresence,
	* @param { ArgumentTypes.AccountId } brandAccount,
	* @param { Array<(number | string | BN)> } brandId,
	*/
	"registerBrand" (
		brandName: string | null,
		brandOnlinePresence: string | null,
		brandAccount: ArgumentTypes.AccountId,
		brandId: Array<(number | string | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminController::registerBrand", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [brandName, brandOnlinePresence, brandAccount, brandId], __options);
	}

	/**
	* getMeAddress
	*
	*/
	"getMeAddress" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminController::getMeAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getProtocolConfig
	*
	*/
	"getProtocolConfig" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminController::getProtocolConfig", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* updateProtocolConfigurations
	*
	* @param { ArgumentTypes.EditableProtocolConfig } config,
	*/
	"updateProtocolConfigurations" (
		config: ArgumentTypes.EditableProtocolConfig,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminController::updateProtocolConfigurations", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [config], __options);
	}

	/**
	* getProtocolRecords
	*
	*/
	"getProtocolRecords" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "adminController::getProtocolRecords", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* withdrawOpenRewardsLiquidityToTreasury
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { ArgumentTypes.Id } liquidityPosition,
	* @param { (string | number | BN) } rewardAmount,
	* @param { (string | number | BN) } meAmount,
	*/
	"withdrawOpenRewardsLiquidityToTreasury" (
		reward: ArgumentTypes.AccountId,
		liquidityPosition: ArgumentTypes.Id,
		rewardAmount: (string | number | BN),
		meAmount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::withdrawOpenRewardsLiquidityToTreasury", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, liquidityPosition, rewardAmount, meAmount], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::createNewReward", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, rewardName, rewardSymbol, rewardDescriptionLink, rewardType, brandId, requestor, poolId], __options);
	}

	/**
	* addNumber
	*
	* @param { (number | string | BN) } number,
	*/
	"addNumber" (
		number: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::addNumber", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [number], __options);
	}

	/**
	* changeOptimalValuation
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } newOptimalValuation,
	* @param { boolean } autoResumeConversations,
	*/
	"changeOptimalValuation" (
		reward: ArgumentTypes.AccountId,
		newOptimalValuation: (string | number | BN),
		autoResumeConversations: boolean,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::changeOptimalValuation", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, newOptimalValuation, autoResumeConversations], __options);
	}

	/**
	* activateOpenRewards
	*
	* @param { ArgumentTypes.AccountId } reward,
	*/
	"activateOpenRewards" (
		reward: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::activateOpenRewards", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward], __options);
	}

	/**
	* updateBrandDetailsByBrandId
	*
	* @param { ArgumentTypes.BrandDetails } brandDetails,
	* @param { Array<(number | string | BN)> } brandId,
	*/
	"updateBrandDetailsByBrandId" (
		brandDetails: ArgumentTypes.BrandDetails,
		brandId: Array<(number | string | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::updateBrandDetailsByBrandId", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [brandDetails, brandId], __options);
	}

	/**
	* updateRewardDetails
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { ArgumentTypes.EditableRewardDetails } rewardDetails,
	* @param { boolean } ignoreDefault,
	*/
	"updateRewardDetails" (
		reward: ArgumentTypes.AccountId,
		rewardDetails: ArgumentTypes.EditableRewardDetails,
		ignoreDefault: boolean,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::updateRewardDetails", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, rewardDetails, ignoreDefault], __options);
	}

	/**
	* getNumber
	*
	*/
	"getNumber" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::getNumber", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* updateBrandConfigByBrandId
	*
	* @param { ArgumentTypes.GlobalBrandConfig } brandConfig,
	* @param { boolean } ignoreDefault,
	* @param { Array<(number | string | BN)> } brandId,
	*/
	"updateBrandConfigByBrandId" (
		brandConfig: ArgumentTypes.GlobalBrandConfig,
		ignoreDefault: boolean,
		brandId: Array<(number | string | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::updateBrandConfigByBrandId", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [brandConfig, ignoreDefault, brandId], __options);
	}

	/**
	* setBountyTriggerLimit
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } triggerLimit,
	*/
	"setBountyTriggerLimit" (
		reward: ArgumentTypes.AccountId,
		triggerLimit: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::setBountyTriggerLimit", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, triggerLimit], __options);
	}

	/**
	* withdrawRewardsFromBountyPoolToTreasury
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } amount,
	*/
	"withdrawRewardsFromBountyPoolToTreasury" (
		reward: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::withdrawRewardsFromBountyPoolToTreasury", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, amount], __options);
	}

	/**
	* integrateExistingReward
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { string | null } rewardDescriptionLink,
	* @param { boolean } readTAndC,
	*/
	"integrateExistingReward" (
		reward: ArgumentTypes.AccountId,
		rewardDescriptionLink: string | null,
		readTAndC: boolean,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::integrateExistingReward", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, rewardDescriptionLink, readTAndC], __options);
	}

	/**
	* changeBrandMainAccount
	*
	* @param { ArgumentTypes.AccountId } newAccount,
	* @param { ArgumentTypes.AccountId } requestor,
	*/
	"changeBrandMainAccount" (
		newAccount: ArgumentTypes.AccountId,
		requestor: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::changeBrandMainAccount", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newAccount, requestor], __options);
	}

	/**
	* getBrandConfigById
	*
	* @param { Array<(number | string | BN)> } brandId,
	*/
	"getBrandConfigById" (
		brandId: Array<(number | string | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::getBrandConfigById", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [brandId], __options);
	}

	/**
	* updateBrandConfig
	*
	* @param { ArgumentTypes.GlobalBrandConfig } brandConfig,
	* @param { boolean } ignoreDefault,
	*/
	"updateBrandConfig" (
		brandConfig: ArgumentTypes.GlobalBrandConfig,
		ignoreDefault: boolean,
		__options ? : GasLimit,
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
	*/
	"updateROptimal" (
		reward: ArgumentTypes.AccountId,
		newROptimal: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::updateROptimal", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, newROptimal], __options);
	}

	/**
	* addLiquidityForOpenRewardsFromTreasury
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } rewardAmount,
	* @param { (string | number | BN) } meAmount,
	*/
	"addLiquidityForOpenRewardsFromTreasury" (
		reward: ArgumentTypes.AccountId,
		rewardAmount: (string | number | BN),
		meAmount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::addLiquidityForOpenRewardsFromTreasury", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, rewardAmount, meAmount], __options);
	}

	/**
	* pauseOpenRewards
	*
	* @param { ArgumentTypes.AccountId } reward,
	*/
	"pauseOpenRewards" (
		reward: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::pauseOpenRewards", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward], __options);
	}

	/**
	* withdrawTreasuryBalances
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } rewardAmount,
	* @param { (string | number | BN) } meAmount,
	* @param { ArgumentTypes.AccountId } to,
	* @param { Array<(number | string | BN)> } brand,
	*/
	"withdrawTreasuryBalances" (
		reward: ArgumentTypes.AccountId,
		rewardAmount: (string | number | BN),
		meAmount: (string | number | BN),
		to: ArgumentTypes.AccountId,
		brand: Array<(number | string | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::withdrawTreasuryBalances", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, rewardAmount, meAmount, to, brand], __options);
	}

	/**
	* getBrandDetails
	*
	* @param { Array<(number | string | BN)> } brandId,
	*/
	"getBrandDetails" (
		brandId: Array<(number | string | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::getBrandDetails", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [brandId], __options);
	}

	/**
	* updateBrandDetails
	*
	* @param { ArgumentTypes.EditableBrandDetails } brandDetails,
	* @param { boolean } ignoreDefault,
	*/
	"updateBrandDetails" (
		brandDetails: ArgumentTypes.EditableBrandDetails,
		ignoreDefault: boolean,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::updateBrandDetails", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [brandDetails, ignoreDefault], __options);
	}

	/**
	* getRewardDetails
	*
	* @param { ArgumentTypes.AccountId } requestor,
	*/
	"getRewardDetails" (
		requestor: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::getRewardDetails", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [requestor], __options);
	}

	/**
	* addLiquidityForOpenRewards
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } rewardAmount,
	* @param { (string | number | BN) } meAmount,
	*/
	"addLiquidityForOpenRewards" (
		reward: ArgumentTypes.AccountId,
		rewardAmount: (string | number | BN),
		meAmount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::addLiquidityForOpenRewards", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, rewardAmount, meAmount], __options);
	}

	/**
	* updateRewardConfig
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { ArgumentTypes.RewardConfig } rewardConfig,
	* @param { boolean } ignoreDefault,
	*/
	"updateRewardConfig" (
		reward: ArgumentTypes.AccountId,
		rewardConfig: ArgumentTypes.RewardConfig,
		ignoreDefault: boolean,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::updateRewardConfig", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, rewardConfig, ignoreDefault], __options);
	}

	/**
	* getBrandConfigByAddress
	*
	* @param { ArgumentTypes.AccountId } brandAddress,
	*/
	"getBrandConfigByAddress" (
		brandAddress: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::getBrandConfigByAddress", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [brandAddress], __options);
	}

	/**
	* updatePoolConfiguration
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { ArgumentTypes.EditablePoolConfig } editablePoolConfig,
	* @param { boolean } ignoreDefault,
	*/
	"updatePoolConfiguration" (
		reward: ArgumentTypes.AccountId,
		editablePoolConfig: ArgumentTypes.EditablePoolConfig,
		ignoreDefault: boolean,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::updatePoolConfiguration", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, editablePoolConfig, ignoreDefault], __options);
	}

	/**
	* resumeOpenRewards
	*
	* @param { ArgumentTypes.AccountId } reward,
	*/
	"resumeOpenRewards" (
		reward: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::resumeOpenRewards", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward], __options);
	}

	/**
	* getAllBrands
	*
	*/
	"getAllBrands" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::getAllBrands", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* fundBountyPool
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } amount,
	*/
	"fundBountyPool" (
		reward: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::fundBountyPool", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, amount], __options);
	}

	/**
	* topUpTreasuryBalances
	*
	* @param { ArgumentTypes.AccountId } reward,
	* @param { (string | number | BN) } rewardAmount,
	* @param { (string | number | BN) } meAmount,
	* @param { Array<(number | string | BN)> } brand,
	*/
	"topUpTreasuryBalances" (
		reward: ArgumentTypes.AccountId,
		rewardAmount: (string | number | BN),
		meAmount: (string | number | BN),
		brand: Array<(number | string | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "brandController::topUpTreasuryBalances", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [reward, rewardAmount, meAmount, brand], __options);
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

}