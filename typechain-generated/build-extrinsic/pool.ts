/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/pool';
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
	 * determineNeededRewardAmountGivenMeAmount
	 *
	 * @param { (string | number | BN) } meAmount,
	 * @param { (string | number | BN) } slippageInPrecision,
	*/
	"determineNeededRewardAmountGivenMeAmount" (
		meAmount: (string | number | BN),
		slippageInPrecision: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::determineNeededRewardAmountGivenMeAmount", [meAmount, slippageInPrecision], __options);
	}

	/**
	 * withdrawLiquidity
	 *
	 * @param { ArgumentTypes.Id } position,
	 * @param { (string | number | BN) } poolNumeratorAmount,
	 * @param { (string | number | BN) } poolDivisorAmount,
	 * @param { ArgumentTypes.AccountId } requestor,
	 * @param { ArgumentTypes.AccountId } to,
	*/
	"withdrawLiquidity" (
		position: ArgumentTypes.Id,
		poolNumeratorAmount: (string | number | BN),
		poolDivisorAmount: (string | number | BN),
		requestor: ArgumentTypes.AccountId,
		to: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::withdrawLiquidity", [position, poolNumeratorAmount, poolDivisorAmount, requestor, to], __options);
	}

	/**
	 * getLiquidityRatios
	 *
	*/
	"getLiquidityRatios" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::getLiquidityRatios", [], __options);
	}

	/**
	 * withdrawProtocolMeOffsetWithRewardsIfNeedBe
	 *
	 * @param { (string | number | BN) } meAmountToWithdraw,
	*/
	"withdrawProtocolMeOffsetWithRewardsIfNeedBe" (
		meAmountToWithdraw: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::withdrawProtocolMeOffsetWithRewardsIfNeedBe", [meAmountToWithdraw], __options);
	}

	/**
	 * getPositionData
	 *
	 * @param { (string | number | BN) } position,
	*/
	"getPositionData" (
		position: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::getPositionData", [position], __options);
	}

	/**
	 * getAllPositions
	 *
	 * @param { ArgumentTypes.AccountId } requestor,
	*/
	"getAllPositions" (
		requestor: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::getAllPositions", [requestor], __options);
	}

	/**
	 * getPositionByIndex
	 *
	 * @param { ArgumentTypes.AccountId } requestor,
	 * @param { (string | number | BN) } index,
	*/
	"getPositionByIndex" (
		requestor: ArgumentTypes.AccountId,
		index: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::getPositionByIndex", [requestor, index], __options);
	}

	/**
	 * changeROptimal
	 *
	 * @param { (string | number | BN) } newROptimal,
	*/
	"changeROptimal" (
		newROptimal: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::changeROptimal", [newROptimal], __options);
	}

	/**
	 * getOpenRewardsState
	 *
	*/
	"getOpenRewardsState" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::getOpenRewardsState", [], __options);
	}

	/**
	 * getOpenRewardsConfigurations
	 *
	*/
	"getOpenRewardsConfigurations" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::getOpenRewardsConfigurations", [], __options);
	}

	/**
	 * addProtocolMeOffset
	 *
	 * @param { (string | number | BN) } expectedMeOffset,
	*/
	"addProtocolMeOffset" (
		expectedMeOffset: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::addProtocolMeOffset", [expectedMeOffset], __options);
	}

	/**
	 * pauseOpenRewards
	 *
	*/
	"pauseOpenRewards" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::pauseOpenRewards", [], __options);
	}

	/**
	 * engageIncomingConversation
	 *
	 * @param { (string | number | BN) } expectedRewardAmount,
	 * @param { ArgumentTypes.AccountId } outputRewardReceiver,
	 * @param { (string | number | BN) } slippageInPrecision,
	*/
	"engageIncomingConversation" (
		expectedRewardAmount: (string | number | BN),
		outputRewardReceiver: ArgumentTypes.AccountId,
		slippageInPrecision: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::engageIncomingConversation", [expectedRewardAmount, outputRewardReceiver, slippageInPrecision], __options);
	}

	/**
	 * changePoolConfigExceptROptimal
	 *
	 * @param { ArgumentTypes.EditablePoolConfig } editableConfig,
	 * @param { boolean } ignoreDefault,
	*/
	"changePoolConfigExceptROptimal" (
		editableConfig: ArgumentTypes.EditablePoolConfig,
		ignoreDefault: boolean,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::changePoolConfigExceptROptimal", [editableConfig, ignoreDefault], __options);
	}

	/**
	 * withdrawProtocolMeOffsetOnlyMeTokens
	 *
	 * @param { (string | number | BN) } meAmountToWithdraw,
	*/
	"withdrawProtocolMeOffsetOnlyMeTokens" (
		meAmountToWithdraw: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::withdrawProtocolMeOffsetOnlyMeTokens", [meAmountToWithdraw], __options);
	}

	/**
	 * getROptimal
	 *
	*/
	"getROptimal" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::getROptimal", [], __options);
	}

	/**
	 * recordLiquidityProvided
	 *
	 * @param { (string | number | BN) } poolNumeratorAmount,
	 * @param { (string | number | BN) } poolDivisorAmount,
	 * @param { ArgumentTypes.AccountId } requestor,
	 * @param { ArgumentTypes.AccountId } to,
	*/
	"recordLiquidityProvided" (
		poolNumeratorAmount: (string | number | BN),
		poolDivisorAmount: (string | number | BN),
		requestor: ArgumentTypes.AccountId,
		to: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::recordLiquidityProvided", [poolNumeratorAmount, poolDivisorAmount, requestor, to], __options);
	}

	/**
	 * removeOpenRewardsManager
	 *
	 * @param { ArgumentTypes.AccountId } poolManager,
	*/
	"removeOpenRewardsManager" (
		poolManager: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::removeOpenRewardsManager", [poolManager], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::initiateOutgoingConversation", [rewardAmountIn, expectedOutputRewardAmount, listener, listenerROptimal, requestor, outputRewardReceiver, slippageInPrecision], __options);
	}

	/**
	 * resumeOpenRewards
	 *
	*/
	"resumeOpenRewards" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::resumeOpenRewards", [], __options);
	}

	/**
	 * getBalance
	 *
	 * @param { ArgumentTypes.AccountId } token,
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"getBalance" (
		token: ArgumentTypes.AccountId,
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::getBalance", [token, account], __options);
	}

	/**
	 * withdrawProtocolMeOffsetWithdrawable
	 *
	 * @param { (string | number | BN) } meAmountToWithdraw,
	*/
	"withdrawProtocolMeOffsetWithdrawable" (
		meAmountToWithdraw: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::withdrawProtocolMeOffsetWithdrawable", [meAmountToWithdraw], __options);
	}

	/**
	 * checkOpenRewardsState
	 *
	*/
	"checkOpenRewardsState" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::checkOpenRewardsState", [], __options);
	}

	/**
	 * startOpenRewards
	 *
	*/
	"startOpenRewards" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::startOpenRewards", [], __options);
	}

	/**
	 * forcefullyWithdrawProtocolOffsetMeTokens
	 *
	 * @param { (string | number | BN) } meAmountToWithdraw,
	*/
	"forcefullyWithdrawProtocolOffsetMeTokens" (
		meAmountToWithdraw: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::forcefullyWithdrawProtocolOffsetMeTokens", [meAmountToWithdraw], __options);
	}

	/**
	 * determineOptimalNeededMeAmountGivenRewardAmount
	 *
	 * @param { (string | number | BN) } rewardAmount,
	*/
	"determineOptimalNeededMeAmountGivenRewardAmount" (
		rewardAmount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::determineOptimalNeededMeAmountGivenRewardAmount", [rewardAmount], __options);
	}

	/**
	 * getLiquidityIds
	 *
	*/
	"getLiquidityIds" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::getLiquidityIds", [], __options);
	}

	/**
	 * checkIfIsOpenRewardsManager
	 *
	 * @param { ArgumentTypes.AccountId } poolManager,
	*/
	"checkIfIsOpenRewardsManager" (
		poolManager: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::checkIfIsOpenRewardsManager", [poolManager], __options);
	}

	/**
	 * addOpenRewardsManager
	 *
	 * @param { ArgumentTypes.AccountId } newPoolManager,
	*/
	"addOpenRewardsManager" (
		newPoolManager: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "poolController::addOpenRewardsManager", [newPoolManager], __options);
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

	/**
	 * collectionId
	 *
	*/
	"collectionId" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34::collectionId", [], __options);
	}

	/**
	 * balanceOf
	 *
	 * @param { ArgumentTypes.AccountId } owner,
	*/
	"balanceOf" (
		owner: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34::balanceOf", [owner], __options);
	}

	/**
	 * approve
	 *
	 * @param { ArgumentTypes.AccountId } operator,
	 * @param { ArgumentTypes.Id | null } id,
	 * @param { boolean } approved,
	*/
	"approve" (
		operator: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id | null,
		approved: boolean,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34::approve", [operator, id, approved], __options);
	}

	/**
	 * transfer
	 *
	 * @param { ArgumentTypes.AccountId } to,
	 * @param { ArgumentTypes.Id } id,
	 * @param { Array<(number | string | BN)> } data,
	*/
	"transfer" (
		to: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		data: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34::transfer", [to, id, data], __options);
	}

	/**
	 * allowance
	 *
	 * @param { ArgumentTypes.AccountId } owner,
	 * @param { ArgumentTypes.AccountId } operator,
	 * @param { ArgumentTypes.Id | null } id,
	*/
	"allowance" (
		owner: ArgumentTypes.AccountId,
		operator: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34::allowance", [owner, operator, id], __options);
	}

	/**
	 * ownerOf
	 *
	 * @param { ArgumentTypes.Id } id,
	*/
	"ownerOf" (
		id: ArgumentTypes.Id,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34::ownerOf", [id], __options);
	}

	/**
	 * totalSupply
	 *
	*/
	"totalSupply" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34::totalSupply", [], __options);
	}

	/**
	 * ownersTokenByIndex
	 *
	 * @param { ArgumentTypes.AccountId } owner,
	 * @param { (string | number | BN) } index,
	*/
	"ownersTokenByIndex" (
		owner: ArgumentTypes.AccountId,
		index: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34Enumerable::ownersTokenByIndex", [owner, index], __options);
	}

	/**
	 * tokenByIndex
	 *
	 * @param { (string | number | BN) } index,
	*/
	"tokenByIndex" (
		index: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34Enumerable::tokenByIndex", [index], __options);
	}

	/**
	 * mint
	 *
	 * @param { ArgumentTypes.AccountId } account,
	 * @param { ArgumentTypes.Id } id,
	*/
	"mint" (
		account: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34Mintable::mint", [account, id], __options);
	}

	/**
	 * burn
	 *
	 * @param { ArgumentTypes.AccountId } account,
	 * @param { ArgumentTypes.Id } id,
	*/
	"burn" (
		account: ArgumentTypes.AccountId,
		id: ArgumentTypes.Id,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp34Burnable::burn", [account, id], __options);
	}

}