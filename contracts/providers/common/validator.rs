use openbrush::{ traits::{ AccountId, ZERO_ADDRESS } };

use crate::providers::common::errors::*;

pub fn ensure_address_is_not_zero_address(address: AccountId) -> Result<(), ProtocolError> {
    if address == ZERO_ADDRESS.into() {
        return Err(ProtocolError::ZeroAddressNotAllowed);
    }
    Ok(())
}

pub fn ensure_value_is_not_zero(value: u128) -> Result<(), ProtocolError> {
    if value == 0 {
        return Err(ProtocolError::ZeroNotAllowed);
    }
    Ok(())
}

pub fn ensure_input_is_not_empty(string_opt: Option<String>) -> Result<(), ProtocolError> {
    match string_opt {
        Some(s) => if s.is_empty() {
            return Err(ProtocolError::EmptyStringNotAllowed);
        } else {
            Ok(())
        }
        None => {
            return Err(ProtocolError::EmptyStringNotAllowed);
        }
    }
}