use openbrush::contracts::access_control::*;

pub const POOL_MANAGER: RoleType = ink::selector_id!("POOL_MANAGER");

pub const POOL_OWNER: RoleType = ink::selector_id!("POOL_OWNER");

pub const POOL_ADMIN: RoleType = ink::selector_id!("POOL_ADMIN");