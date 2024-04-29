/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/services';
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
	 * spendRewardsOnIssuingBrand
	 *
	 * @param { ArgumentTypes.AccountId } reward,
	 * @param { (string | number | BN) } amount,
	*/
	"spendRewardsOnIssuingBrand" (
		reward: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "customerController::spendRewardsOnIssuingBrand", [reward, amount], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "customerController::exchangeBrandRewards", [rewardAtHand, targetedReward, amountOfRewardAtHand, expectedAmountOfTargettedReward, to], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "customerController::spendRewardsOnOtherBrand", [rewardAtHand, targetedReward, amountOfRewardAtHand, expectedAmountOfTargettedReward], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "adminController::registerBrand", [brandName, brandOnlinePresence, brandAccount, brandId], __options);
	}

	/**
	 * getMeAddress
	 *
	*/
	"getMeAddress" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "adminController::getMeAddress", [], __options);
	}

	/**
	 * updateTreasuryAddress
	 *
	 * @param { ArgumentTypes.AccountId } address,
	*/
	"updateTreasuryAddress" (
		address: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "adminController::updateTreasuryAddress", [address], __options);
	}

	/**
	 * getProtocolRecords
	 *
	*/
	"getProtocolRecords" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "adminController::getProtocolRecords", [], __options);
	}

	/**
	 * getProtocolConfig
	 *
	*/
	"getProtocolConfig" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "adminController::getProtocolConfig", [], __options);
	}

	/**
	 * updateProtocolRecords
	 *
	 * @param { ArgumentTypes.EditableProtocolRecords } records,
	*/
	"updateProtocolRecords" (
		records: ArgumentTypes.EditableProtocolRecords,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "adminController::updateProtocolRecords", [records], __options);
	}

	/**
	 * updateProtocolConfigurations
	 *
	 * @param { ArgumentTypes.EditableProtocolConfig } config,
	*/
	"updateProtocolConfigurations" (
		config: ArgumentTypes.EditableProtocolConfig,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "adminController::updateProtocolConfigurations", [config], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::topUpTreasuryBalances", [reward, rewardAmount, meAmount, brand], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::updateRewardConfig", [reward, rewardConfig, ignoreDefault], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::changeOptimalValuation", [reward, newOptimalValuation, autoResumeConversations], __options);
	}

	/**
	 * getBrandDetails
	 *
	 * @param { Array<(number | string | BN)> } brandId,
	*/
	"getBrandDetails" (
		brandId: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::getBrandDetails", [brandId], __options);
	}

	/**
	 * getRewardDetails
	 *
	 * @param { ArgumentTypes.AccountId } requestor,
	*/
	"getRewardDetails" (
		requestor: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::getRewardDetails", [requestor], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::createNewReward", [reward, rewardName, rewardSymbol, rewardDescriptionLink, rewardType, brandId, requestor, poolId], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::addLiquidityForOpenRewardsFromTreasury", [reward, rewardAmount, meAmount], __options);
	}

	/**
	 * activateOpenRewards
	 *
	 * @param { ArgumentTypes.AccountId } reward,
	*/
	"activateOpenRewards" (
		reward: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::activateOpenRewards", [reward], __options);
	}

	/**
	 * pauseOpenRewards
	 *
	 * @param { ArgumentTypes.AccountId } reward,
	*/
	"pauseOpenRewards" (
		reward: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::pauseOpenRewards", [reward], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::integrateExistingReward", [reward, rewardDescriptionLink, readTAndC], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::updatePoolConfiguration", [reward, editablePoolConfig, ignoreDefault], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::setBountyTriggerLimit", [reward, triggerLimit], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::withdrawOpenRewardsLiquidityToTreasury", [reward, liquidityPosition, rewardAmount, meAmount], __options);
	}

	/**
	 * getBrandConfigByAddress
	 *
	 * @param { ArgumentTypes.AccountId } brandAddress,
	*/
	"getBrandConfigByAddress" (
		brandAddress: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::getBrandConfigByAddress", [brandAddress], __options);
	}

	/**
	 * resumeOpenRewards
	 *
	 * @param { ArgumentTypes.AccountId } reward,
	*/
	"resumeOpenRewards" (
		reward: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::resumeOpenRewards", [reward], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::fundBountyPool", [reward, amount], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::withdrawRewardsFromBountyPoolToTreasury", [reward, amount], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::withdrawTreasuryBalances", [reward, rewardAmount, meAmount, to, brand], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::updateRewardDetails", [reward, rewardDetails, ignoreDefault], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::updateBrandConfig", [brandConfig, ignoreDefault], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::updateROptimal", [reward, newROptimal], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::addLiquidityForOpenRewards", [reward, rewardAmount, meAmount], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::updateBrandDetails", [brandDetails, ignoreDefault], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::updateBrandDetailsByBrandId", [brandDetails, brandId], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::updateBrandConfigByBrandId", [brandConfig, ignoreDefault, brandId], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::changeBrandMainAccount", [newAccount, requestor], __options);
	}

	/**
	 * getBrandConfigById
	 *
	 * @param { Array<(number | string | BN)> } brandId,
	*/
	"getBrandConfigById" (
		brandId: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "brandController::getBrandConfigById", [brandId], __options);
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