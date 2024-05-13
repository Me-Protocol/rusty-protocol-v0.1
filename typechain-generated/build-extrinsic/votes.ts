/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/votes';
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
	 * blockTimestamp
	 *
	*/
	"blockTimestamp" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "blockTimestamp", [], __options);
	}

	/**
	 * setBlockTimestamp
	 *
	 * @param { (number | string | BN) } timestamp,
	*/
	"setBlockTimestamp" (
		timestamp: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "setBlockTimestamp", [timestamp], __options);
	}

	/**
	 * increaseBlockTimestamp
	 *
	 * @param { (number | string | BN) } timestamp,
	*/
	"increaseBlockTimestamp" (
		timestamp: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "increaseBlockTimestamp", [timestamp], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22::balanceOf", [owner], __options);
	}

	/**
	 * transfer
	 *
	 * @param { ArgumentTypes.AccountId } to,
	 * @param { (string | number | BN) } value,
	 * @param { Array<(number | string | BN)> } data,
	*/
	"transfer" (
		to: ArgumentTypes.AccountId,
		value: (string | number | BN),
		data: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22::transfer", [to, value, data], __options);
	}

	/**
	 * transferFrom
	 *
	 * @param { ArgumentTypes.AccountId } from,
	 * @param { ArgumentTypes.AccountId } to,
	 * @param { (string | number | BN) } value,
	 * @param { Array<(number | string | BN)> } data,
	*/
	"transferFrom" (
		from: ArgumentTypes.AccountId,
		to: ArgumentTypes.AccountId,
		value: (string | number | BN),
		data: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22::transferFrom", [from, to, value, data], __options);
	}

	/**
	 * allowance
	 *
	 * @param { ArgumentTypes.AccountId } owner,
	 * @param { ArgumentTypes.AccountId } spender,
	*/
	"allowance" (
		owner: ArgumentTypes.AccountId,
		spender: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22::allowance", [owner, spender], __options);
	}

	/**
	 * totalSupply
	 *
	*/
	"totalSupply" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22::totalSupply", [], __options);
	}

	/**
	 * approve
	 *
	 * @param { ArgumentTypes.AccountId } spender,
	 * @param { (string | number | BN) } value,
	*/
	"approve" (
		spender: ArgumentTypes.AccountId,
		value: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22::approve", [spender, value], __options);
	}

	/**
	 * increaseAllowance
	 *
	 * @param { ArgumentTypes.AccountId } spender,
	 * @param { (string | number | BN) } deltaValue,
	*/
	"increaseAllowance" (
		spender: ArgumentTypes.AccountId,
		deltaValue: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22::increaseAllowance", [spender, deltaValue], __options);
	}

	/**
	 * decreaseAllowance
	 *
	 * @param { ArgumentTypes.AccountId } spender,
	 * @param { (string | number | BN) } deltaValue,
	*/
	"decreaseAllowance" (
		spender: ArgumentTypes.AccountId,
		deltaValue: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22::decreaseAllowance", [spender, deltaValue], __options);
	}

	/**
	 * mint
	 *
	 * @param { ArgumentTypes.AccountId } account,
	 * @param { (string | number | BN) } amount,
	*/
	"mint" (
		account: ArgumentTypes.AccountId,
		amount: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22Mintable::mint", [account, amount], __options);
	}

	/**
	 * getVotes
	 *
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"getVotes" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "votes::getVotes", [account], __options);
	}

	/**
	 * delegates
	 *
	 * @param { ArgumentTypes.AccountId } delegator,
	*/
	"delegates" (
		delegator: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "votes::delegates", [delegator], __options);
	}

	/**
	 * delegate
	 *
	 * @param { ArgumentTypes.AccountId } delegatee,
	*/
	"delegate" (
		delegatee: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "votes::delegate", [delegatee], __options);
	}

	/**
	 * getPastVotes
	 *
	 * @param { ArgumentTypes.AccountId } account,
	 * @param { (number | string | BN) } timestamp,
	*/
	"getPastVotes" (
		account: ArgumentTypes.AccountId,
		timestamp: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "votes::getPastVotes", [account, timestamp], __options);
	}

	/**
	 * getPastTotalSupply
	 *
	 * @param { (number | string | BN) } timestamp,
	*/
	"getPastTotalSupply" (
		timestamp: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "votes::getPastTotalSupply", [timestamp], __options);
	}

	/**
	 * delegateBySignature
	 *
	 * @param { ArgumentTypes.AccountId } signer,
	 * @param { ArgumentTypes.AccountId } delegatee,
	 * @param { (number | string | BN) } nonce,
	 * @param { (number | string | BN) } expiry,
	 * @param { ArgumentTypes.Signature } signature,
	*/
	"delegateBySignature" (
		signer: ArgumentTypes.AccountId,
		delegatee: ArgumentTypes.AccountId,
		nonce: (number | string | BN),
		expiry: (number | string | BN),
		signature: ArgumentTypes.Signature,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "votes::delegateBySignature", [signer, delegatee, nonce, expiry, signature], __options);
	}

	/**
	 * numCheckpoints
	 *
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"numCheckpoints" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22Votes::numCheckpoints", [account], __options);
	}

	/**
	 * checkpoints
	 *
	 * @param { ArgumentTypes.AccountId } account,
	 * @param { (number | string | BN) } pos,
	*/
	"checkpoints" (
		account: ArgumentTypes.AccountId,
		pos: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "psp22Votes::checkpoints", [account, pos], __options);
	}

	/**
	 * nonces
	 *
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"nonces" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "nonces::nonces", [account], __options);
	}

}