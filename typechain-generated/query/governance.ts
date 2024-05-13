/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/governance';
import type * as ReturnTypes from '../types-returns/governance';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/governance.json';


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
	* blockTimestamp
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"blockTimestamp" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "blockTimestamp", [], __options , (result) => { return handleReturnType(result, getTypeDescription(15, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setBlockTimestamp
	*
	* @param { (number | string | BN) } timestamp,
	* @returns { Result<null, ReturnTypes.LangError> }
	*/
	"setBlockTimestamp" (
		timestamp: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "setBlockTimestamp", [timestamp], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* increaseBlockTimestamp
	*
	* @param { (number | string | BN) } timestamp,
	* @returns { Result<null, ReturnTypes.LangError> }
	*/
	"increaseBlockTimestamp" (
		timestamp: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "increaseBlockTimestamp", [timestamp], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* countVote
	*
	* @param { Array<(number | string | BN)> } proposalId,
	* @param { ArgumentTypes.AccountId } account,
	* @param { ArgumentTypes.VoteType } support,
	* @param { (string | number | BN) } weight,
	* @returns { Result<Result<null, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"countVote" (
		proposalId: Array<(number | string | BN)>,
		account: ArgumentTypes.AccountId,
		support: ArgumentTypes.VoteType,
		weight: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "countVote", [proposalId, account, support, weight], __options , (result) => { return handleReturnType(result, getTypeDescription(17, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getVotes
	*
	* @param { ArgumentTypes.AccountId } account,
	* @param { (number | string | BN) } timepoint,
	* @param { Array<(number | string | BN)> } params,
	* @returns { Result<Result<ReturnNumber, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"getVotes" (
		account: ArgumentTypes.AccountId,
		timepoint: (number | string | BN),
		params: Array<(number | string | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getVotes", [account, timepoint, params], __options , (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
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
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<number>, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governor::hashProposal", [transactions, descriptionHash], __options , (result) => { return handleReturnType(result, getTypeDescription(26, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* proposalSnapshot
	*
	* @param { Array<(number | string | BN)> } proposalId,
	* @returns { Result<Result<number, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"proposalSnapshot" (
		proposalId: Array<(number | string | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governor::proposalSnapshot", [proposalId], __options , (result) => { return handleReturnType(result, getTypeDescription(28, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* proposalProposer
	*
	* @param { Array<(number | string | BN)> } proposalId,
	* @returns { Result<Result<ReturnTypes.AccountId, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"proposalProposer" (
		proposalId: Array<(number | string | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.AccountId, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governor::proposalProposer", [proposalId], __options , (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* execute
	*
	* @param { Array<ArgumentTypes.Transaction> } transactions,
	* @param { Array<(number | string | BN)> } descriptionHash,
	* @returns { Result<Result<Array<number>, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"execute" (
		transactions: Array<ArgumentTypes.Transaction>,
		descriptionHash: Array<(number | string | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<number>, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governor::execute", [transactions, descriptionHash], __options , (result) => { return handleReturnType(result, getTypeDescription(26, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* cancel
	*
	* @param { Array<ArgumentTypes.Transaction> } transactions,
	* @param { Array<(number | string | BN)> } descriptionHash,
	* @returns { Result<Result<Array<number>, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"cancel" (
		transactions: Array<ArgumentTypes.Transaction>,
		descriptionHash: Array<(number | string | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<number>, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governor::cancel", [transactions, descriptionHash], __options , (result) => { return handleReturnType(result, getTypeDescription(26, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* castVote
	*
	* @param { Array<(number | string | BN)> } proposalId,
	* @param { ArgumentTypes.VoteType } support,
	* @param { string | null } reason,
	* @param { Array<(number | string | BN)> | null } params,
	* @returns { Result<Result<ReturnNumber, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"castVote" (
		proposalId: Array<(number | string | BN)>,
		support: ArgumentTypes.VoteType,
		reason: string | null,
		params: Array<(number | string | BN)> | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governor::castVote", [proposalId, support, reason, params], __options , (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* castVoteWithSignature
	*
	* @param { Array<(number | string | BN)> } proposalId,
	* @param { ArgumentTypes.VoteType } support,
	* @param { string } reason,
	* @param { ArgumentTypes.Signature } signature,
	* @returns { Result<Result<ReturnNumber, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"castVoteWithSignature" (
		proposalId: Array<(number | string | BN)>,
		support: ArgumentTypes.VoteType,
		reason: string,
		signature: ArgumentTypes.Signature,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governor::castVoteWithSignature", [proposalId, support, reason, signature], __options , (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* castVoteWithSignatureAndParams
	*
	* @param { Array<(number | string | BN)> } proposalId,
	* @param { ArgumentTypes.VoteType } support,
	* @param { string } reason,
	* @param { ArgumentTypes.Signature } signature,
	* @param { Array<(number | string | BN)> } params,
	* @returns { Result<Result<ReturnNumber, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"castVoteWithSignatureAndParams" (
		proposalId: Array<(number | string | BN)>,
		support: ArgumentTypes.VoteType,
		reason: string,
		signature: ArgumentTypes.Signature,
		params: Array<(number | string | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governor::castVoteWithSignatureAndParams", [proposalId, support, reason, signature, params], __options , (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getVotesWithParams
	*
	* @param { ArgumentTypes.AccountId } account,
	* @param { (number | string | BN) } timestamp,
	* @param { Array<(number | string | BN)> } params,
	* @returns { Result<Result<ReturnNumber, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"getVotesWithParams" (
		account: ArgumentTypes.AccountId,
		timestamp: (number | string | BN),
		params: Array<(number | string | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governor::getVotesWithParams", [account, timestamp, params], __options , (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* relay
	*
	* @param { ArgumentTypes.AccountId } target,
	* @param { ArgumentTypes.Transaction } transaction,
	* @returns { Result<Result<null, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"relay" (
		target: ArgumentTypes.AccountId,
		transaction: ArgumentTypes.Transaction,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governor::relay", [target, transaction], __options , (result) => { return handleReturnType(result, getTypeDescription(17, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* proposalDeadline
	*
	* @param { Array<(number | string | BN)> } proposalId,
	* @returns { Result<Result<number, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"proposalDeadline" (
		proposalId: Array<(number | string | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governor::proposalDeadline", [proposalId], __options , (result) => { return handleReturnType(result, getTypeDescription(28, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* propose
	*
	* @param { Array<ArgumentTypes.Transaction> } transactions,
	* @param { string } description,
	* @returns { Result<Result<Array<number>, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"propose" (
		transactions: Array<ArgumentTypes.Transaction>,
		description: string,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<number>, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governor::propose", [transactions, description], __options , (result) => { return handleReturnType(result, getTypeDescription(26, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* state
	*
	* @param { Array<(number | string | BN)> } proposalId,
	* @returns { Result<Result<ReturnTypes.ProposalState, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"state" (
		proposalId: Array<(number | string | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.ProposalState, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governor::state", [proposalId], __options , (result) => { return handleReturnType(result, getTypeDescription(36, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* votingDelay
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"votingDelay" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governorSettings::votingDelay", [], __options , (result) => { return handleReturnType(result, getTypeDescription(15, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setVotingDelay
	*
	* @param { (number | string | BN) } newVotingDelay,
	* @returns { Result<Result<null, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"setVotingDelay" (
		newVotingDelay: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governorSettings::setVotingDelay", [newVotingDelay], __options , (result) => { return handleReturnType(result, getTypeDescription(17, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* proposalThreshold
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"proposalThreshold" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governorSettings::proposalThreshold", [], __options , (result) => { return handleReturnType(result, getTypeDescription(39, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setVotingPeriod
	*
	* @param { (number | string | BN) } newVotingPeriod,
	* @returns { Result<Result<null, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"setVotingPeriod" (
		newVotingPeriod: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governorSettings::setVotingPeriod", [newVotingPeriod], __options , (result) => { return handleReturnType(result, getTypeDescription(17, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* votingPeriod
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"votingPeriod" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governorSettings::votingPeriod", [], __options , (result) => { return handleReturnType(result, getTypeDescription(15, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setProposalThreshold
	*
	* @param { (string | number | BN) } newProposalThreshold,
	* @returns { Result<Result<null, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"setProposalThreshold" (
		newProposalThreshold: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governorSettings::setProposalThreshold", [newProposalThreshold], __options , (result) => { return handleReturnType(result, getTypeDescription(17, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* quorumNumerator
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"quorumNumerator" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "quorum::quorumNumerator", [], __options , (result) => { return handleReturnType(result, getTypeDescription(39, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* quorum
	*
	* @param { (number | string | BN) } timePoint,
	* @returns { Result<Result<ReturnNumber, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"quorum" (
		timePoint: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnNumber, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "quorum::quorum", [timePoint], __options , (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* quorumNumeratorAt
	*
	* @param { (number | string | BN) } timestamp,
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"quorumNumeratorAt" (
		timestamp: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "quorum::quorumNumeratorAt", [timestamp], __options , (result) => { return handleReturnType(result, getTypeDescription(39, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* quorumDenominator
	*
	* @returns { Result<ReturnNumber, ReturnTypes.LangError> }
	*/
	"quorumDenominator" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "quorum::quorumDenominator", [], __options , (result) => { return handleReturnType(result, getTypeDescription(39, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* updateQuorumNumerator
	*
	* @param { (string | number | BN) } numerator,
	* @returns { Result<Result<null, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"updateQuorumNumerator" (
		numerator: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "quorum::updateQuorumNumerator", [numerator], __options , (result) => { return handleReturnType(result, getTypeDescription(17, DATA_TYPE_DESCRIPTIONS)); });
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
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governorCounting::hasVoted", [proposalId, account], __options , (result) => { return handleReturnType(result, getTypeDescription(40, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* proposalVotes
	*
	* @param { Array<(number | string | BN)> } proposalId,
	* @returns { Result<Result<ReturnTypes.ProposalVote, ReturnTypes.GovernanceError>, ReturnTypes.LangError> }
	*/
	"proposalVotes" (
		proposalId: Array<(number | string | BN)>,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.ProposalVote, ReturnTypes.GovernanceError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "governorCounting::proposalVotes", [proposalId], __options , (result) => { return handleReturnType(result, getTypeDescription(42, DATA_TYPE_DESCRIPTIONS)); });
	}

}