/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/governance';
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
	 * countVote
	 *
	 * @param { Array<(number | string | BN)> } proposalId,
	 * @param { ArgumentTypes.AccountId } account,
	 * @param { ArgumentTypes.VoteType } support,
	 * @param { (string | number | BN) } weight,
	*/
	"countVote" (
		proposalId: Array<(number | string | BN)>,
		account: ArgumentTypes.AccountId,
		support: ArgumentTypes.VoteType,
		weight: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "countVote", [proposalId, account, support, weight], __options);
	}

	/**
	 * getVotes
	 *
	 * @param { ArgumentTypes.AccountId } account,
	 * @param { (number | string | BN) } timepoint,
	 * @param { Array<(number | string | BN)> } params,
	*/
	"getVotes" (
		account: ArgumentTypes.AccountId,
		timepoint: (number | string | BN),
		params: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getVotes", [account, timepoint, params], __options);
	}

	/**
	 * hashProposal
	 *
	 * @param { Array<ArgumentTypes.Transaction> } transactions,
	 * @param { Array<(number | string | BN)> } descriptionHash,
	*/
	"hashProposal" (
		transactions: Array<ArgumentTypes.Transaction>,
		descriptionHash: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governor::hashProposal", [transactions, descriptionHash], __options);
	}

	/**
	 * proposalSnapshot
	 *
	 * @param { Array<(number | string | BN)> } proposalId,
	*/
	"proposalSnapshot" (
		proposalId: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governor::proposalSnapshot", [proposalId], __options);
	}

	/**
	 * proposalProposer
	 *
	 * @param { Array<(number | string | BN)> } proposalId,
	*/
	"proposalProposer" (
		proposalId: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governor::proposalProposer", [proposalId], __options);
	}

	/**
	 * execute
	 *
	 * @param { Array<ArgumentTypes.Transaction> } transactions,
	 * @param { Array<(number | string | BN)> } descriptionHash,
	*/
	"execute" (
		transactions: Array<ArgumentTypes.Transaction>,
		descriptionHash: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governor::execute", [transactions, descriptionHash], __options);
	}

	/**
	 * cancel
	 *
	 * @param { Array<ArgumentTypes.Transaction> } transactions,
	 * @param { Array<(number | string | BN)> } descriptionHash,
	*/
	"cancel" (
		transactions: Array<ArgumentTypes.Transaction>,
		descriptionHash: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governor::cancel", [transactions, descriptionHash], __options);
	}

	/**
	 * castVote
	 *
	 * @param { Array<(number | string | BN)> } proposalId,
	 * @param { ArgumentTypes.VoteType } support,
	 * @param { string | null } reason,
	 * @param { Array<(number | string | BN)> | null } params,
	*/
	"castVote" (
		proposalId: Array<(number | string | BN)>,
		support: ArgumentTypes.VoteType,
		reason: string | null,
		params: Array<(number | string | BN)> | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governor::castVote", [proposalId, support, reason, params], __options);
	}

	/**
	 * castVoteWithSignature
	 *
	 * @param { Array<(number | string | BN)> } proposalId,
	 * @param { ArgumentTypes.VoteType } support,
	 * @param { string } reason,
	 * @param { ArgumentTypes.Signature } signature,
	*/
	"castVoteWithSignature" (
		proposalId: Array<(number | string | BN)>,
		support: ArgumentTypes.VoteType,
		reason: string,
		signature: ArgumentTypes.Signature,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governor::castVoteWithSignature", [proposalId, support, reason, signature], __options);
	}

	/**
	 * castVoteWithSignatureAndParams
	 *
	 * @param { Array<(number | string | BN)> } proposalId,
	 * @param { ArgumentTypes.VoteType } support,
	 * @param { string } reason,
	 * @param { ArgumentTypes.Signature } signature,
	 * @param { Array<(number | string | BN)> } params,
	*/
	"castVoteWithSignatureAndParams" (
		proposalId: Array<(number | string | BN)>,
		support: ArgumentTypes.VoteType,
		reason: string,
		signature: ArgumentTypes.Signature,
		params: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governor::castVoteWithSignatureAndParams", [proposalId, support, reason, signature, params], __options);
	}

	/**
	 * getVotesWithParams
	 *
	 * @param { ArgumentTypes.AccountId } account,
	 * @param { (number | string | BN) } timestamp,
	 * @param { Array<(number | string | BN)> } params,
	*/
	"getVotesWithParams" (
		account: ArgumentTypes.AccountId,
		timestamp: (number | string | BN),
		params: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governor::getVotesWithParams", [account, timestamp, params], __options);
	}

	/**
	 * relay
	 *
	 * @param { ArgumentTypes.AccountId } target,
	 * @param { ArgumentTypes.Transaction } transaction,
	*/
	"relay" (
		target: ArgumentTypes.AccountId,
		transaction: ArgumentTypes.Transaction,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governor::relay", [target, transaction], __options);
	}

	/**
	 * proposalDeadline
	 *
	 * @param { Array<(number | string | BN)> } proposalId,
	*/
	"proposalDeadline" (
		proposalId: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governor::proposalDeadline", [proposalId], __options);
	}

	/**
	 * propose
	 *
	 * @param { Array<ArgumentTypes.Transaction> } transactions,
	 * @param { string } description,
	*/
	"propose" (
		transactions: Array<ArgumentTypes.Transaction>,
		description: string,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governor::propose", [transactions, description], __options);
	}

	/**
	 * state
	 *
	 * @param { Array<(number | string | BN)> } proposalId,
	*/
	"state" (
		proposalId: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governor::state", [proposalId], __options);
	}

	/**
	 * votingDelay
	 *
	*/
	"votingDelay" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governorSettings::votingDelay", [], __options);
	}

	/**
	 * setVotingDelay
	 *
	 * @param { (number | string | BN) } newVotingDelay,
	*/
	"setVotingDelay" (
		newVotingDelay: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governorSettings::setVotingDelay", [newVotingDelay], __options);
	}

	/**
	 * proposalThreshold
	 *
	*/
	"proposalThreshold" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governorSettings::proposalThreshold", [], __options);
	}

	/**
	 * setVotingPeriod
	 *
	 * @param { (number | string | BN) } newVotingPeriod,
	*/
	"setVotingPeriod" (
		newVotingPeriod: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governorSettings::setVotingPeriod", [newVotingPeriod], __options);
	}

	/**
	 * votingPeriod
	 *
	*/
	"votingPeriod" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governorSettings::votingPeriod", [], __options);
	}

	/**
	 * setProposalThreshold
	 *
	 * @param { (string | number | BN) } newProposalThreshold,
	*/
	"setProposalThreshold" (
		newProposalThreshold: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governorSettings::setProposalThreshold", [newProposalThreshold], __options);
	}

	/**
	 * quorumNumerator
	 *
	*/
	"quorumNumerator" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "quorum::quorumNumerator", [], __options);
	}

	/**
	 * quorum
	 *
	 * @param { (number | string | BN) } timePoint,
	*/
	"quorum" (
		timePoint: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "quorum::quorum", [timePoint], __options);
	}

	/**
	 * quorumNumeratorAt
	 *
	 * @param { (number | string | BN) } timestamp,
	*/
	"quorumNumeratorAt" (
		timestamp: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "quorum::quorumNumeratorAt", [timestamp], __options);
	}

	/**
	 * quorumDenominator
	 *
	*/
	"quorumDenominator" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "quorum::quorumDenominator", [], __options);
	}

	/**
	 * updateQuorumNumerator
	 *
	 * @param { (string | number | BN) } numerator,
	*/
	"updateQuorumNumerator" (
		numerator: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "quorum::updateQuorumNumerator", [numerator], __options);
	}

	/**
	 * hasVoted
	 *
	 * @param { Array<(number | string | BN)> } proposalId,
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"hasVoted" (
		proposalId: Array<(number | string | BN)>,
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governorCounting::hasVoted", [proposalId, account], __options);
	}

	/**
	 * proposalVotes
	 *
	 * @param { Array<(number | string | BN)> } proposalId,
	*/
	"proposalVotes" (
		proposalId: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "governorCounting::proposalVotes", [proposalId], __options);
	}

}