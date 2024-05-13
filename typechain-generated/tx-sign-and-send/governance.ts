/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/governance';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/governance.json';


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
	* blockTimestamp
	*
	*/
	"blockTimestamp" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "blockTimestamp", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setBlockTimestamp
	*
	* @param { (number | string | BN) } timestamp,
	*/
	"setBlockTimestamp" (
		timestamp: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "setBlockTimestamp", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [timestamp], __options);
	}

	/**
	* increaseBlockTimestamp
	*
	* @param { (number | string | BN) } timestamp,
	*/
	"increaseBlockTimestamp" (
		timestamp: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "increaseBlockTimestamp", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [timestamp], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "countVote", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [proposalId, account, support, weight], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getVotes", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [account, timepoint, params], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governor::hashProposal", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [transactions, descriptionHash], __options);
	}

	/**
	* proposalSnapshot
	*
	* @param { Array<(number | string | BN)> } proposalId,
	*/
	"proposalSnapshot" (
		proposalId: Array<(number | string | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governor::proposalSnapshot", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [proposalId], __options);
	}

	/**
	* proposalProposer
	*
	* @param { Array<(number | string | BN)> } proposalId,
	*/
	"proposalProposer" (
		proposalId: Array<(number | string | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governor::proposalProposer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [proposalId], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governor::execute", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [transactions, descriptionHash], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governor::cancel", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [transactions, descriptionHash], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governor::castVote", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [proposalId, support, reason, params], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governor::castVoteWithSignature", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [proposalId, support, reason, signature], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governor::castVoteWithSignatureAndParams", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [proposalId, support, reason, signature, params], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governor::getVotesWithParams", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [account, timestamp, params], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governor::relay", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [target, transaction], __options);
	}

	/**
	* proposalDeadline
	*
	* @param { Array<(number | string | BN)> } proposalId,
	*/
	"proposalDeadline" (
		proposalId: Array<(number | string | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governor::proposalDeadline", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [proposalId], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governor::propose", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [transactions, description], __options);
	}

	/**
	* state
	*
	* @param { Array<(number | string | BN)> } proposalId,
	*/
	"state" (
		proposalId: Array<(number | string | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governor::state", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [proposalId], __options);
	}

	/**
	* votingDelay
	*
	*/
	"votingDelay" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governorSettings::votingDelay", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setVotingDelay
	*
	* @param { (number | string | BN) } newVotingDelay,
	*/
	"setVotingDelay" (
		newVotingDelay: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governorSettings::setVotingDelay", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newVotingDelay], __options);
	}

	/**
	* proposalThreshold
	*
	*/
	"proposalThreshold" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governorSettings::proposalThreshold", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setVotingPeriod
	*
	* @param { (number | string | BN) } newVotingPeriod,
	*/
	"setVotingPeriod" (
		newVotingPeriod: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governorSettings::setVotingPeriod", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newVotingPeriod], __options);
	}

	/**
	* votingPeriod
	*
	*/
	"votingPeriod" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governorSettings::votingPeriod", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setProposalThreshold
	*
	* @param { (string | number | BN) } newProposalThreshold,
	*/
	"setProposalThreshold" (
		newProposalThreshold: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governorSettings::setProposalThreshold", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newProposalThreshold], __options);
	}

	/**
	* quorumNumerator
	*
	*/
	"quorumNumerator" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "quorum::quorumNumerator", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* quorum
	*
	* @param { (number | string | BN) } timePoint,
	*/
	"quorum" (
		timePoint: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "quorum::quorum", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [timePoint], __options);
	}

	/**
	* quorumNumeratorAt
	*
	* @param { (number | string | BN) } timestamp,
	*/
	"quorumNumeratorAt" (
		timestamp: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "quorum::quorumNumeratorAt", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [timestamp], __options);
	}

	/**
	* quorumDenominator
	*
	*/
	"quorumDenominator" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "quorum::quorumDenominator", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* updateQuorumNumerator
	*
	* @param { (string | number | BN) } numerator,
	*/
	"updateQuorumNumerator" (
		numerator: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "quorum::updateQuorumNumerator", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [numerator], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governorCounting::hasVoted", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [proposalId, account], __options);
	}

	/**
	* proposalVotes
	*
	* @param { Array<(number | string | BN)> } proposalId,
	*/
	"proposalVotes" (
		proposalId: Array<(number | string | BN)>,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governorCounting::proposalVotes", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [proposalId], __options);
	}

}