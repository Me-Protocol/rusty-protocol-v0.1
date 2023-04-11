
use openbrush::{
    contracts::traits::{
        access_control::*,
        ownable::*,
        psp22::PSP22Error,
        
    },
};

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]

pub enum ProtocolError {
    PSP22Error(PSP22Error),
    AccessControlError(AccessControlError),
    OwnableError(OwnableError),
    ZeroAddressNotAllowed,
    ZeroNotAllowed,
    EmptyStringNotAllowed,
    PoolAlreadyInActive,
    PoolNotActive,
    PoolAlreadyActive,
    AccountAlreadyPoolManager,
    AccountIsNotAPoolManager,
    ConversationWillCausePoolToGoOutOfRag,
    RequestIsNotWithInAccuracyRange
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
    
    impl From<OwnableError> for ProtocolError {
        fn from(error: OwnableError) -> Self {
           ProtocolError::OwnableError(error)
        }
    }

