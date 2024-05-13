/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/governance';
import type * as ReturnTypes from '../types-returns/governance';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import DATA_TYPE_DESCRIPTIONS from '../data/governance.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/governance.json';


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
	* blockTimestamp
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"blockTimestamp" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "blockTimestamp", [], __options, (result) => { return handleReturnType(result, getTypeDescription(15, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setBlockTimestamp
	*
	* @param { (number | string | BN) } timestamp,
	* @returns { void }
	*/
	"setBlockTimestamp" (
		timestamp: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "setBlockTimestamp", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [timestamp], __options);
	}

	/**
	* increaseBlockTimestamp
	*
	* @param { (number | string | BN) } timestamp,
	* @returns { void }
	*/
	"increaseBlockTimestamp" (
		timestamp: (number | string | BN),
		__options: GasLimit,
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
	* @returns { void }
	*/
	"countVote" (
		proposalId: Array<(number | string | BN)>,
		account: ArgumentTypes.AccountId,
		support: ArgumentTypes.VoteType,
		weight: (string | number | BN),
		__options: GasLimit,
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
	* @returns { void }
	*/
	"getVotes" (
		account: ArgumentTypes.AccountId,
		timepoint: (number | string | BN),
		params: Array<(number | string | BN)>,
		__options: GasLimit,
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
	* @returns { Result<Result<Array<number>, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"hashProposal" (
		transactions: Array<ArgumentTypes.Transaction>,
		descriptionHash: Array<(number | string | BN)>,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<number>, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governor::hashProposal", [transactions, descriptionHash], __options, (result) => { return handleReturnType(result, getTypeDescription(26, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* proposalSnapshot
	*
	* @param { Array<(number | string | BN)> } proposalId,
	* @returns { Result<Result<number, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"proposalSnapshot" (
		proposalId: Array<(number | string | BN)>,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governor::proposalSnapshot", [proposalId], __options, (result) => { return handleReturnType(result, getTypeDescription(28, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* proposalProposer
	*
	* @param { Array<(number | string | BN)> } proposalId,
	* @returns { Result<Result<ReturnTypes.AccountId, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"proposalProposer" (
		proposalId: Array<(number | string | BN)>,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.AccountId, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governor::proposalProposer", [proposalId], __options, (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* execute
	*
	* @param { Array<ArgumentTypes.Transaction> } transactions,
	* @param { Array<(number | string | BN)> } descriptionHash,
	* @returns { void }
	*/
	"execute" (
		transactions: Array<ArgumentTypes.Transaction>,
		descriptionHash: Array<(number | string | BN)>,
		__options: GasLimit,
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
	* @returns { void }
	*/
	"cancel" (
		transactions: Array<ArgumentTypes.Transaction>,
		descriptionHash: Array<(number | string | BN)>,
		__options: GasLimit,
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
	* @returns { void }
	*/
	"castVote" (
		proposalId: Array<(number | string | BN)>,
		support: ArgumentTypes.VoteType,
		reason: string | null,
		params: Array<(number | string | BN)> | null,
		__options: GasLimit,
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
	* @returns { void }
	*/
	"castVoteWithSignature" (
		proposalId: Array<(number | string | BN)>,
		support: ArgumentTypes.VoteType,
		reason: string,
		signature: ArgumentTypes.Signature,
		__options: GasLimit,
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
	* @returns { void }
	*/
	"castVoteWithSignatureAndParams" (
		proposalId: Array<(number | string | BN)>,
		support: ArgumentTypes.VoteType,
		reason: string,
		signature: ArgumentTypes.Signature,
		params: Array<(number | string | BN)>,
		__options: GasLimit,
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
	* @returns { void }
	*/
	"getVotesWithParams" (
		account: ArgumentTypes.AccountId,
		timestamp: (number | string | BN),
		params: Array<(number | string | BN)>,
		__options: GasLimit,
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
	* @returns { void }
	*/
	"relay" (
		target: ArgumentTypes.AccountId,
		transaction: ArgumentTypes.Transaction,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governor::relay", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [target, transaction], __options);
	}

	/**
	* proposalDeadline
	*
	* @param { Array<(number | string | BN)> } proposalId,
	* @returns { Result<Result<number, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"proposalDeadline" (
		proposalId: Array<(number | string | BN)>,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governor::proposalDeadline", [proposalId], __options, (result) => { return handleReturnType(result, getTypeDescription(28, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* propose
	*
	* @param { Array<ArgumentTypes.Transaction> } transactions,
	* @param { string } description,
	* @returns { void }
	*/
	"propose" (
		transactions: Array<ArgumentTypes.Transaction>,
		description: string,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governor::propose", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [transactions, description], __options);
	}

	/**
	* state
	*
	* @param { Array<(number | string | BN)> } proposalId,
	* @returns { Result<Result<ReturnTypes.ProposalState, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"state" (
		proposalId: Array<(number | string | BN)>,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.ProposalState, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governor::state", [proposalId], __options, (result) => { return handleReturnType(result, getTypeDescription(36, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* votingDelay
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"votingDelay" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governorSettings::votingDelay", [], __options, (result) => { return handleReturnType(result, getTypeDescription(15, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setVotingDelay
	*
	* @param { (number | string | BN) } newVotingDelay,
	* @returns { void }
	*/
	"setVotingDelay" (
		newVotingDelay: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governorSettings::setVotingDelay", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newVotingDelay], __options);
	}

	/**
	* proposalThreshold
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"proposalThreshold" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governorSettings::proposalThreshold", [], __options, (result) => { return handleReturnType(result, getTypeDescription(39, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setVotingPeriod
	*
	* @param { (number | string | BN) } newVotingPeriod,
	* @returns { void }
	*/
	"setVotingPeriod" (
		newVotingPeriod: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governorSettings::setVotingPeriod", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newVotingPeriod], __options);
	}

	/**
	* votingPeriod
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"votingPeriod" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governorSettings::votingPeriod", [], __options, (result) => { return handleReturnType(result, getTypeDescription(15, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setProposalThreshold
	*
	* @param { (string | number | BN) } newProposalThreshold,
	* @returns { void }
	*/
	"setProposalThreshold" (
		newProposalThreshold: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "governorSettings::setProposalThreshold", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newProposalThreshold], __options);
	}

	/**
	* quorumNumerator
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"quorumNumerator" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "quorum::quorumNumerator", [], __options, (result) => { return handleReturnType(result, getTypeDescription(39, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* quorum
	*
	* @param { (number | string | BN) } timePoint,
	* @returns { Result<Result<ReturnNumber, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"quorum" (
		timePoint: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "quorum::quorum", [timePoint], __options, (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* quorumNumeratorAt
	*
	* @param { (number | string | BN) } timestamp,
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"quorumNumeratorAt" (
		timestamp: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "quorum::quorumNumeratorAt", [timestamp], __options, (result) => { return handleReturnType(result, getTypeDescription(39, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* quorumDenominator
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"quorumDenominator" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "quorum::quorumDenominator", [], __options, (result) => { return handleReturnType(result, getTypeDescription(39, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* updateQuorumNumerator
	*
	* @param { (string | number | BN) } numerator,
	* @returns { void }
	*/
	"updateQuorumNumerator" (
		numerator: (string | number | BN),
		__options: GasLimit,
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
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"hasVoted" (
		proposalId: Array<(number | string | BN)>,
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governorCounting::hasVoted", [proposalId, account], __options, (result) => { return handleReturnType(result, getTypeDescription(40, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* proposalVotes
	*
	* @param { Array<(number | string | BN)> } proposalId,
	* @returns { Result<Result<ReturnTypes.ProposalVote, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"proposalVotes" (
		proposalId: Array<(number | string | BN)>,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.ProposalVote, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governorCounting::proposalVotes", [proposalId], __options, (result) => { return handleReturnType(result, getTypeDescription(42, DATA_TYPE_DESCRIPTIONS)); });
	}

}