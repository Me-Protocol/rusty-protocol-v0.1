import type BN from 'bn.js';
import type {ReturnNumber} from '@727-ventures/typechain-types';

export type AccountId = string | number[]

export type Checkpoint = {
	key: number,
	value: ReturnNumber
}

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export interface PSP22Error {
	custom ? : string,
	insufficientBalance ? : null,
	insufficientAllowance ? : null,
	recipientIsNotSet ? : null,
	senderIsNotSet ? : null,
	safeTransferCheckFailed ? : string,
	permitInvalidSignature ? : null,
	permitExpired ? : null,
	noncesError ? : NoncesError
}

export class PSP22ErrorBuilder {
	static Custom(value: string): PSP22Error {
		return {
			custom: value,
		};
	}
	static InsufficientBalance(): PSP22Error {
		return {
			insufficientBalance: null,
		};
	}
	static InsufficientAllowance(): PSP22Error {
		return {
			insufficientAllowance: null,
		};
	}
	static RecipientIsNotSet(): PSP22Error {
		return {
			recipientIsNotSet: null,
		};
	}
	static SenderIsNotSet(): PSP22Error {
		return {
			senderIsNotSet: null,
		};
	}
	static SafeTransferCheckFailed(value: string): PSP22Error {
		return {
			safeTransferCheckFailed: value,
		};
	}
	static PermitInvalidSignature(): PSP22Error {
		return {
			permitInvalidSignature: null,
		};
	}
	static PermitExpired(): PSP22Error {
		return {
			permitExpired: null,
		};
	}
	static NoncesError(value: NoncesError): PSP22Error {
		return {
			noncesError: value,
		};
	}
}

export interface NoncesError {
	invalidAccountNonce ? : AccountId,
	nonceOverflow ? : null
}

export class NoncesErrorBuilder {
	static InvalidAccountNonce(value: AccountId): NoncesError {
		return {
			invalidAccountNonce: value,
		};
	}
	static NonceOverflow(): NoncesError {
		return {
			nonceOverflow: null,
		};
	}
}

export interface GovernanceError {
	tokenNotSet ? : null,
	invalidQuorumFraction ? : null,
	alreadyCastVote ? : null,
	disabledDeposit ? : null,
	onlyProposer ? : null,
	onlyExecutor ? : null,
	nonexistentProposal ? : null,
	unexpectedProposalState ? : null,
	invalidVotingPeriod ? : null,
	insufficientProposerVotes ? : null,
	invalidVoteType ? : null,
	invalidSignature ? : null,
	proposerRestricted ? : null,
	invalidDestination ? : null,
	zeroSnapshot ? : null,
	deadlineOverflow ? : null,
	zeroProposalLength ? : null,
	proposalNotFound ? : null,
	invalidInput ? : null,
	underlyingTransactionReverted ? : null,
	proposalAlreadyExists ? : null,
	errorParsingDescription ? : null,
	futureLookup ? : null,
	expiredSignature ? : null,
	cryptoError ? : CryptoError,
	noncesError ? : NoncesError,
	executionFailed ? : null,
	checkpointsError ? : CheckpointsError,
	indexOutOfRange ? : null,
	overflow ? : null
}

export class GovernanceErrorBuilder {
	static TokenNotSet(): GovernanceError {
		return {
			tokenNotSet: null,
		};
	}
	static InvalidQuorumFraction(): GovernanceError {
		return {
			invalidQuorumFraction: null,
		};
	}
	static AlreadyCastVote(): GovernanceError {
		return {
			alreadyCastVote: null,
		};
	}
	static DisabledDeposit(): GovernanceError {
		return {
			disabledDeposit: null,
		};
	}
	static OnlyProposer(): GovernanceError {
		return {
			onlyProposer: null,
		};
	}
	static OnlyExecutor(): GovernanceError {
		return {
			onlyExecutor: null,
		};
	}
	static NonexistentProposal(): GovernanceError {
		return {
			nonexistentProposal: null,
		};
	}
	static UnexpectedProposalState(): GovernanceError {
		return {
			unexpectedProposalState: null,
		};
	}
	static InvalidVotingPeriod(): GovernanceError {
		return {
			invalidVotingPeriod: null,
		};
	}
	static InsufficientProposerVotes(): GovernanceError {
		return {
			insufficientProposerVotes: null,
		};
	}
	static InvalidVoteType(): GovernanceError {
		return {
			invalidVoteType: null,
		};
	}
	static InvalidSignature(): GovernanceError {
		return {
			invalidSignature: null,
		};
	}
	static ProposerRestricted(): GovernanceError {
		return {
			proposerRestricted: null,
		};
	}
	static InvalidDestination(): GovernanceError {
		return {
			invalidDestination: null,
		};
	}
	static ZeroSnapshot(): GovernanceError {
		return {
			zeroSnapshot: null,
		};
	}
	static DeadlineOverflow(): GovernanceError {
		return {
			deadlineOverflow: null,
		};
	}
	static ZeroProposalLength(): GovernanceError {
		return {
			zeroProposalLength: null,
		};
	}
	static ProposalNotFound(): GovernanceError {
		return {
			proposalNotFound: null,
		};
	}
	static InvalidInput(): GovernanceError {
		return {
			invalidInput: null,
		};
	}
	static UnderlyingTransactionReverted(): GovernanceError {
		return {
			underlyingTransactionReverted: null,
		};
	}
	static ProposalAlreadyExists(): GovernanceError {
		return {
			proposalAlreadyExists: null,
		};
	}
	static ErrorParsingDescription(): GovernanceError {
		return {
			errorParsingDescription: null,
		};
	}
	static FutureLookup(): GovernanceError {
		return {
			futureLookup: null,
		};
	}
	static ExpiredSignature(): GovernanceError {
		return {
			expiredSignature: null,
		};
	}
	static CryptoError(value: CryptoError): GovernanceError {
		return {
			cryptoError: value,
		};
	}
	static NoncesError(value: NoncesError): GovernanceError {
		return {
			noncesError: value,
		};
	}
	static ExecutionFailed(): GovernanceError {
		return {
			executionFailed: null,
		};
	}
	static CheckpointsError(value: CheckpointsError): GovernanceError {
		return {
			checkpointsError: value,
		};
	}
	static IndexOutOfRange(): GovernanceError {
		return {
			indexOutOfRange: null,
		};
	}
	static Overflow(): GovernanceError {
		return {
			overflow: null,
		};
	}
}

export interface CryptoError {
	ecdsaRecoverFailed ? : null,
	ecdsaToEthAddressFailed ? : null,
	other ? : string
}

export class CryptoErrorBuilder {
	static EcdsaRecoverFailed(): CryptoError {
		return {
			ecdsaRecoverFailed: null,
		};
	}
	static EcdsaToEthAddressFailed(): CryptoError {
		return {
			ecdsaToEthAddressFailed: null,
		};
	}
	static Other(value: string): CryptoError {
		return {
			other: value,
		};
	}
}

export enum CheckpointsError {
	unorderedInsertion = 'UnorderedInsertion'
}

export interface Signature {
	ecdsa ? : Array<number>
}

export class SignatureBuilder {
	static ECDSA(value: Array<number>): Signature {
		return {
			ecdsa: value,
		};
	}
}

