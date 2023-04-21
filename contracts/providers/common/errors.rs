use openbrush::{
    contracts::traits::{
        access_control::*,
        ownable::*,
        psp22::PSP22Error,
        psp34::PSP34Error,
        pausable::PausableError,
        errors::{ ReentrancyGuardError },
    },
};

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum ProtocolError {
    PSP22Error(PSP22Error),
    PSP34Error(PSP34Error),
    AccessControlError(AccessControlError),
    ReentrancyGuardError(ReentrancyGuardError),
    OwnableError(OwnableError),
    PausableError(PausableError),
    ZeroAddressNotAllowed,
    ZeroNotAllowed,
    EmptyStringNotAllowed,
    ConversationsNotStarted,
    ConversationsAlreadyStarted,
    PoolAlreadyInActive,
    PoolIsActive,
    PoolNotActive,
    PoolAlreadyActive,
    ConversationsShouldBeStartedAtOptimalRatioOrLess,
    AccountAlreadyPoolManager,
    AccountIsNotAPoolManager,
    ConversationWillCausePoolToGoOutOfRag,
    RequestIsNotWithInAccuracyRange,
    RequestorIsNotOwnerOfThePosition,
    InsufficientPositionBalance,
    ActionWillTakePoolMeTokensBelowConversationLimit,
    ActionWillTakePoolRewardsBelowConversationLimit,
    ProtocolOffsetMustBeConsidered,
    CanNotWithdrawZeroAssetsFromThePool,
    DepositedRewardAmountIsNotTheSameAsStatedAmount,
    InsufficientRewardAmountDepositedForConversation,
    ExpectedRewardAmountExceedsActuallyObtainableRewardsAmount,
    CrossBrandConversationFailed,
    ExpectedProtocolMeOffsetExceedsActualMeOffset,
    PoolIsCurrentlyBelowConversationLimit,
    OptimalRewardRatioCanNotBeZero,
    MaximumRewardRatioCanNotBeLessThanTheOptimalRatio,
    PoolRatioDuringResetOfOptimalRatioCanNotBeGreaterThanTheOptimalRatio,
    InvalidPositionIndex,
    RequestorHasNoPosition,
    PositionsAreMoreThanTwentyTryToGetThenOneAfterAnother,
    FailedToGenerateId,
    RewardNameCannotBeEmpty,
    RewardSymbolCannotBeEmpty,
    BrandDoesNotExist,
    RequestorIsNotIssuingBrand,
    AccountAlreadyABountyManager,
    AccountIsNotABountyManager,
    RewardHasNoPool,
    PleaseReadTandC,
    BothDepositsCanNotBeZero,
    BothWithdrawalsCanNotBeZero,
    BountyDepositNotRecognized,
    RewardIsNotBountyReward,
    InsufficientBountyReward,
    BrandCanNotBeEmpty,
    TreasuryDepositNotRecognized,
    InsufficientTreasuryRewardBalance,
    InsufficientTreasuryMeBalance,
}
impl From<AccessControlError> for ProtocolError {
    fn from(access: AccessControlError) -> Self {
        ProtocolError::AccessControlError(access)
    }
}

impl From<PSP22Error> for ProtocolError {
    fn from(error: PSP22Error) -> Self {
        ProtocolError::PSP22Error(error)
    }
}

impl From<PSP34Error> for ProtocolError {
    fn from(error: PSP34Error) -> Self {
        ProtocolError::PSP34Error(error)
    }
}

impl From<OwnableError> for ProtocolError {
    fn from(error: OwnableError) -> Self {
        ProtocolError::OwnableError(error)
    }
}

impl From<ReentrancyGuardError> for ProtocolError {
    fn from(error: ReentrancyGuardError) -> Self {
        ProtocolError::ReentrancyGuardError(error)
    }
}

impl From<PausableError> for ProtocolError {
    fn from(error: PausableError) -> Self {
        ProtocolError::PausableError(error)
    }
}