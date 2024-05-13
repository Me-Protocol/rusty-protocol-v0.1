import type BN from 'bn.js';

export type AccountId = string | number[]

export type AccessData = {
	adminAccessKey: (number | string | BN),
	members: BTreeMap
}

export type BTreeMap = Array<[AccountId, boolean]>;

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export interface ProtocolError {
	psp22Error ? : PSP22Error,
	psp34Error ? : PSP34Error,
	accessControlError ? : AccessControlError,
	reentrancyGuardError ? : ReentrancyGuardError,
	ownableError ? : OwnableError,
	pausableError ? : PausableError,
	zeroAddressNotAllowed ? : null,
	zeroNotAllowed ? : null,
	emptyStringNotAllowed ? : null,
	conversationsNotStarted ? : null,
	conversationsAlreadyStarted ? : null,
	openRewardsNotStarted ? : null,
	openRewardsAlreadyStarted ? : null,
	poolAlreadyInActive ? : null,
	pairInstantiationFailed ? : null,
	poolIsActive ? : null,
	topUpToPayForService ? : null,
	poolNotActive ? : null,
	poolAlreadyActive ? : null,
	conversationsShouldBeStartedAtOptimalRatioOrLess ? : null,
	accountAlreadyPoolManager ? : null,
	emptyBrand ? : null,
	accountIsNotAPoolManager ? : null,
	conversationWillCausePoolToGoOutOfRag ? : null,
	requestIsNotWithInAccuracyRange ? : null,
	requestorIsNotOwnerOfThePosition ? : null,
	insufficientPositionBalance ? : null,
	actionWillTakePoolMeTokensBelowConversationLimit ? : null,
	actionWillTakePoolRewardsBelowConversationLimit ? : null,
	protocolOffsetMustBeConsidered ? : null,
	seedsAreTooMuch ? : null,
	accountDoesNotHaveAccess ? : null,
	accessKeyAlreadyExistsPleaseChangeInstead ? : null,
	accountAlreadyHasAccess ? : null,
	requestorIsNotAdminForThisAccessKey ? : null,
	canNotWithdrawZeroAssetsFromThePool ? : null,
	accountIsNotAuthorizedToMakeThisRequest ? : null,
	depositedRewardAmountIsNotTheSameAsStatedAmount ? : null,
	insufficientRewardAmountDepositedForConversation ? : null,
	expectedRewardAmountExceedsActuallyObtainableRewardsAmount ? : null,
	crossBrandConversationFailed ? : null,
	expectedProtocolMeOffsetExceedsActualMeOffset ? : null,
	poolIsCurrentlyBelowConversationLimit ? : null,
	optimalRewardRatioCanNotBeZero ? : null,
	maximumRewardRatioCanNotBeLessThanTheOptimalRatio ? : null,
	poolRatioDuringResetOfOptimalRatioCanNotBeGreaterThanTheOptimalRatio ? : null,
	invalidPositionIndex ? : null,
	requestorHasNoPosition ? : null,
	positionsAreMoreThanTwentyTryToGetThenOneAfterAnother ? : null,
	failedToGenerateId ? : null,
	rewardNameCannotBeEmpty ? : null,
	rewardSymbolCannotBeEmpty ? : null,
	brandDoesNotExist ? : null,
	requestorIsNotIssuingBrand ? : null,
	accountAlreadyABountyManager ? : null,
	accountIsNotABountyManager ? : null,
	youCannotWithdrawWhatYouDontHave ? : null,
	paymentBalanceIsZero ? : null,
	rewardHasNoPool ? : null,
	pleaseReadTandC ? : null,
	bothDepositsCanNotBeZero ? : null,
	bothWithdrawalsCanNotBeZero ? : null,
	bountyDepositNotRecognized ? : null,
	paymentCanNotBeZero ? : null,
	rewardIsNotBountyReward ? : null,
	insufficientBountyReward ? : null,
	brandCanNotBeEmpty ? : null,
	treasuryDepositNotRecognized ? : null,
	insufficientTreasuryRewardBalance ? : null,
	insufficientTreasuryMeBalance ? : null,
	requestIsNotWithinSlippageRange ? : null,
	rewardIsNotOpened ? : null,
	tragetedRewardIsNotOpened ? : null,
	requestorHasNotLiquidityInPool ? : null
}

export class ProtocolErrorBuilder {
	static PSP22Error(value: PSP22Error): ProtocolError {
		return {
			psp22Error: value,
		};
	}
	static PSP34Error(value: PSP34Error): ProtocolError {
		return {
			psp34Error: value,
		};
	}
	static AccessControlError(value: AccessControlError): ProtocolError {
		return {
			accessControlError: value,
		};
	}
	static ReentrancyGuardError(value: ReentrancyGuardError): ProtocolError {
		return {
			reentrancyGuardError: value,
		};
	}
	static OwnableError(value: OwnableError): ProtocolError {
		return {
			ownableError: value,
		};
	}
	static PausableError(value: PausableError): ProtocolError {
		return {
			pausableError: value,
		};
	}
	static ZeroAddressNotAllowed(): ProtocolError {
		return {
			zeroAddressNotAllowed: null,
		};
	}
	static ZeroNotAllowed(): ProtocolError {
		return {
			zeroNotAllowed: null,
		};
	}
	static EmptyStringNotAllowed(): ProtocolError {
		return {
			emptyStringNotAllowed: null,
		};
	}
	static ConversationsNotStarted(): ProtocolError {
		return {
			conversationsNotStarted: null,
		};
	}
	static ConversationsAlreadyStarted(): ProtocolError {
		return {
			conversationsAlreadyStarted: null,
		};
	}
	static OpenRewardsNotStarted(): ProtocolError {
		return {
			openRewardsNotStarted: null,
		};
	}
	static OpenRewardsAlreadyStarted(): ProtocolError {
		return {
			openRewardsAlreadyStarted: null,
		};
	}
	static PoolAlreadyInActive(): ProtocolError {
		return {
			poolAlreadyInActive: null,
		};
	}
	static PairInstantiationFailed(): ProtocolError {
		return {
			pairInstantiationFailed: null,
		};
	}
	static PoolIsActive(): ProtocolError {
		return {
			poolIsActive: null,
		};
	}
	static TopUpToPayForService(): ProtocolError {
		return {
			topUpToPayForService: null,
		};
	}
	static PoolNotActive(): ProtocolError {
		return {
			poolNotActive: null,
		};
	}
	static PoolAlreadyActive(): ProtocolError {
		return {
			poolAlreadyActive: null,
		};
	}
	static ConversationsShouldBeStartedAtOptimalRatioOrLess(): ProtocolError {
		return {
			conversationsShouldBeStartedAtOptimalRatioOrLess: null,
		};
	}
	static AccountAlreadyPoolManager(): ProtocolError {
		return {
			accountAlreadyPoolManager: null,
		};
	}
	static EmptyBrand(): ProtocolError {
		return {
			emptyBrand: null,
		};
	}
	static AccountIsNotAPoolManager(): ProtocolError {
		return {
			accountIsNotAPoolManager: null,
		};
	}
	static ConversationWillCausePoolToGoOutOfRag(): ProtocolError {
		return {
			conversationWillCausePoolToGoOutOfRag: null,
		};
	}
	static RequestIsNotWithInAccuracyRange(): ProtocolError {
		return {
			requestIsNotWithInAccuracyRange: null,
		};
	}
	static RequestorIsNotOwnerOfThePosition(): ProtocolError {
		return {
			requestorIsNotOwnerOfThePosition: null,
		};
	}
	static InsufficientPositionBalance(): ProtocolError {
		return {
			insufficientPositionBalance: null,
		};
	}
	static ActionWillTakePoolMeTokensBelowConversationLimit(): ProtocolError {
		return {
			actionWillTakePoolMeTokensBelowConversationLimit: null,
		};
	}
	static ActionWillTakePoolRewardsBelowConversationLimit(): ProtocolError {
		return {
			actionWillTakePoolRewardsBelowConversationLimit: null,
		};
	}
	static ProtocolOffsetMustBeConsidered(): ProtocolError {
		return {
			protocolOffsetMustBeConsidered: null,
		};
	}
	static SeedsAreTooMuch(): ProtocolError {
		return {
			seedsAreTooMuch: null,
		};
	}
	static AccountDoesNotHaveAccess(): ProtocolError {
		return {
			accountDoesNotHaveAccess: null,
		};
	}
	static AccessKeyAlreadyExistsPleaseChangeInstead(): ProtocolError {
		return {
			accessKeyAlreadyExistsPleaseChangeInstead: null,
		};
	}
	static AccountAlreadyHasAccess(): ProtocolError {
		return {
			accountAlreadyHasAccess: null,
		};
	}
	static RequestorIsNotAdminForThisAccessKey(): ProtocolError {
		return {
			requestorIsNotAdminForThisAccessKey: null,
		};
	}
	static CanNotWithdrawZeroAssetsFromThePool(): ProtocolError {
		return {
			canNotWithdrawZeroAssetsFromThePool: null,
		};
	}
	static AccountIsNotAuthorizedToMakeThisRequest(): ProtocolError {
		return {
			accountIsNotAuthorizedToMakeThisRequest: null,
		};
	}
	static DepositedRewardAmountIsNotTheSameAsStatedAmount(): ProtocolError {
		return {
			depositedRewardAmountIsNotTheSameAsStatedAmount: null,
		};
	}
	static InsufficientRewardAmountDepositedForConversation(): ProtocolError {
		return {
			insufficientRewardAmountDepositedForConversation: null,
		};
	}
	static ExpectedRewardAmountExceedsActuallyObtainableRewardsAmount(): ProtocolError {
		return {
			expectedRewardAmountExceedsActuallyObtainableRewardsAmount: null,
		};
	}
	static CrossBrandConversationFailed(): ProtocolError {
		return {
			crossBrandConversationFailed: null,
		};
	}
	static ExpectedProtocolMeOffsetExceedsActualMeOffset(): ProtocolError {
		return {
			expectedProtocolMeOffsetExceedsActualMeOffset: null,
		};
	}
	static PoolIsCurrentlyBelowConversationLimit(): ProtocolError {
		return {
			poolIsCurrentlyBelowConversationLimit: null,
		};
	}
	static OptimalRewardRatioCanNotBeZero(): ProtocolError {
		return {
			optimalRewardRatioCanNotBeZero: null,
		};
	}
	static MaximumRewardRatioCanNotBeLessThanTheOptimalRatio(): ProtocolError {
		return {
			maximumRewardRatioCanNotBeLessThanTheOptimalRatio: null,
		};
	}
	static PoolRatioDuringResetOfOptimalRatioCanNotBeGreaterThanTheOptimalRatio(): ProtocolError {
		return {
			poolRatioDuringResetOfOptimalRatioCanNotBeGreaterThanTheOptimalRatio: null,
		};
	}
	static InvalidPositionIndex(): ProtocolError {
		return {
			invalidPositionIndex: null,
		};
	}
	static RequestorHasNoPosition(): ProtocolError {
		return {
			requestorHasNoPosition: null,
		};
	}
	static PositionsAreMoreThanTwentyTryToGetThenOneAfterAnother(): ProtocolError {
		return {
			positionsAreMoreThanTwentyTryToGetThenOneAfterAnother: null,
		};
	}
	static FailedToGenerateId(): ProtocolError {
		return {
			failedToGenerateId: null,
		};
	}
	static RewardNameCannotBeEmpty(): ProtocolError {
		return {
			rewardNameCannotBeEmpty: null,
		};
	}
	static RewardSymbolCannotBeEmpty(): ProtocolError {
		return {
			rewardSymbolCannotBeEmpty: null,
		};
	}
	static BrandDoesNotExist(): ProtocolError {
		return {
			brandDoesNotExist: null,
		};
	}
	static RequestorIsNotIssuingBrand(): ProtocolError {
		return {
			requestorIsNotIssuingBrand: null,
		};
	}
	static AccountAlreadyABountyManager(): ProtocolError {
		return {
			accountAlreadyABountyManager: null,
		};
	}
	static AccountIsNotABountyManager(): ProtocolError {
		return {
			accountIsNotABountyManager: null,
		};
	}
	static YouCannotWithdrawWhatYouDontHave(): ProtocolError {
		return {
			youCannotWithdrawWhatYouDontHave: null,
		};
	}
	static PaymentBalanceIsZero(): ProtocolError {
		return {
			paymentBalanceIsZero: null,
		};
	}
	static RewardHasNoPool(): ProtocolError {
		return {
			rewardHasNoPool: null,
		};
	}
	static PleaseReadTandC(): ProtocolError {
		return {
			pleaseReadTandC: null,
		};
	}
	static BothDepositsCanNotBeZero(): ProtocolError {
		return {
			bothDepositsCanNotBeZero: null,
		};
	}
	static BothWithdrawalsCanNotBeZero(): ProtocolError {
		return {
			bothWithdrawalsCanNotBeZero: null,
		};
	}
	static BountyDepositNotRecognized(): ProtocolError {
		return {
			bountyDepositNotRecognized: null,
		};
	}
	static PaymentCanNotBeZero(): ProtocolError {
		return {
			paymentCanNotBeZero: null,
		};
	}
	static RewardIsNotBountyReward(): ProtocolError {
		return {
			rewardIsNotBountyReward: null,
		};
	}
	static InsufficientBountyReward(): ProtocolError {
		return {
			insufficientBountyReward: null,
		};
	}
	static BrandCanNotBeEmpty(): ProtocolError {
		return {
			brandCanNotBeEmpty: null,
		};
	}
	static TreasuryDepositNotRecognized(): ProtocolError {
		return {
			treasuryDepositNotRecognized: null,
		};
	}
	static InsufficientTreasuryRewardBalance(): ProtocolError {
		return {
			insufficientTreasuryRewardBalance: null,
		};
	}
	static InsufficientTreasuryMeBalance(): ProtocolError {
		return {
			insufficientTreasuryMeBalance: null,
		};
	}
	static RequestIsNotWithinSlippageRange(): ProtocolError {
		return {
			requestIsNotWithinSlippageRange: null,
		};
	}
	static RewardIsNotOpened(): ProtocolError {
		return {
			rewardIsNotOpened: null,
		};
	}
	static TragetedRewardIsNotOpened(): ProtocolError {
		return {
			tragetedRewardIsNotOpened: null,
		};
	}
	static RequestorHasNotLiquidityInPool(): ProtocolError {
		return {
			requestorHasNotLiquidityInPool: null,
		};
	}
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

export interface PSP34Error {
	custom ? : string,
	selfApprove ? : null,
	notApproved ? : null,
	tokenExists ? : null,
	tokenNotExists ? : null,
	safeTransferCheckFailed ? : string
}

export class PSP34ErrorBuilder {
	static Custom(value: string): PSP34Error {
		return {
			custom: value,
		};
	}
	static SelfApprove(): PSP34Error {
		return {
			selfApprove: null,
		};
	}
	static NotApproved(): PSP34Error {
		return {
			notApproved: null,
		};
	}
	static TokenExists(): PSP34Error {
		return {
			tokenExists: null,
		};
	}
	static TokenNotExists(): PSP34Error {
		return {
			tokenNotExists: null,
		};
	}
	static SafeTransferCheckFailed(value: string): PSP34Error {
		return {
			safeTransferCheckFailed: value,
		};
	}
}

export enum AccessControlError {
	invalidCaller = 'InvalidCaller',
	missingRole = 'MissingRole',
	roleRedundant = 'RoleRedundant'
}

export enum ReentrancyGuardError {
	reentrantCall = 'ReentrantCall'
}

export enum OwnableError {
	callerIsNotOwner = 'CallerIsNotOwner',
	newOwnerIsNotSet = 'NewOwnerIsNotSet'
}

export enum PausableError {
	paused = 'Paused',
	notPaused = 'NotPaused'
}

export type EditableProtocolRecords = {
	me: AccountId,
	bounty: AccountId,
	treasury: AccountId,
	adminId: Array<(number | string | BN)>,
	totalNumberOfBrands: (string | number | BN),
	totalNumberOfRewards: (string | number | BN),
	lastUpdated: (number | string | BN)
}

export type EditableProtocolConfig = {
	defaultMinimumMeForConversation: (string | number | BN),
	defaultMinimumRewardForConversationInPercent: (number | string | BN),
	defaultMaximumRLimitForConversationInPrecision: (string | number | BN),
	defaultRewardNotifyThresholdInPercent: (number | string | BN),
	defaultNotifyMeAmount: (string | number | BN),
	defaultNotifyRewardAmountInPercent: (number | string | BN),
	caiInMe: (string | number | BN),
	protocolFee: (string | number | BN),
	bountyContributionInPrecision: (string | number | BN),
	conversionsSlippageInPrecisiion: (string | number | BN),
	informationsSlippageInPrecision: (string | number | BN)
}

export type RewardConfig = {
	specificExceptions: boolean,
	bountyEnabled: boolean,
	caiEnabled: boolean,
	bountyTriggerLimit: (string | number | BN),
	bountyContributionInPrecision: (string | number | BN),
	payIncomingGasFee: boolean,
	payOutgoingGasFee: boolean
}

export type BrandDetails = {
	name: string | null,
	id: Array<(number | string | BN)>,
	mainAccount: AccountId,
	onlinePresence: string | null,
	dateJoined: (number | string | BN)
}

export type RewardDetails = {
	name: string | null,
	symbol: string | null,
	rType: (number | string | BN),
	verified: boolean,
	contractAddress: AccountId,
	descriptionLink: string | null,
	issuingBrand: Array<(number | string | BN)>,
	open: boolean,
	interspendable: boolean,
	poolId: AccountId,
	dateCreated: (string | number | BN)
}

export type EditablePoolConfig = {
	maximumRLimit: (string | number | BN),
	minimumRewardAmountForConversation: (string | number | BN),
	minimumMeAmountForConversation: (string | number | BN),
	notifyRewardAmount: (string | number | BN),
	notifyMeAmount: (string | number | BN),
	defaultSlippageInPrecision: (string | number | BN),
	allowInternalSwap: boolean
}

export interface Id {
	u8 ? : (number | string | BN),
	u16 ? : (number | string | BN),
	u32 ? : (number | string | BN),
	u64 ? : (number | string | BN),
	u128 ? : (string | number | BN),
	bytes ? : Array<(number | string | BN)>
}

export class IdBuilder {
	static U8(value: (number | string | BN)): Id {
		return {
			u8: value,
		};
	}
	static U16(value: (number | string | BN)): Id {
		return {
			u16: value,
		};
	}
	static U32(value: (number | string | BN)): Id {
		return {
			u32: value,
		};
	}
	static U64(value: (number | string | BN)): Id {
		return {
			u64: value,
		};
	}
	static U128(value: (string | number | BN)): Id {
		return {
			u128: value,
		};
	}
	static Bytes(value: Array<(number | string | BN)>): Id {
		return {
			bytes: value,
		};
	}
}

export type EditableRewardDetails = {
	name: string | null,
	symbol: string | null,
	rType: (number | string | BN),
	verified: boolean,
	contractAddress: AccountId,
	descriptionLink: string | null,
	issuingBrand: Array<(number | string | BN)>,
	open: boolean,
	interspendable: boolean,
	poolId: AccountId,
	dateCreated: (string | number | BN)
}

export type GlobalBrandConfig = {
	enableBountyRewards: boolean,
	enableCais: boolean,
	payIncomingGasFees: boolean,
	payOutgoingGasFees: boolean
}

export type EditableBrandDetails = {
	name: string | null,
	onlinePresence: string | null
}

