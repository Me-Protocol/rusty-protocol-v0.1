use openbrush::contracts::access_control::*;

pub const POOL_MANAGER: RoleType = ink::selector_id!("POOL_MANAGER");

pub const OPEN_REWARDS_MANAGER:RoleType = ink::selector_id!("OPEN_REWARDS_MANAGER");

pub const OPEN_REWARDS_ADMIN:RoleType = ink::selector_id!("OPEN_REWARDS_ADMIN");

pub const POOL_OWNER: RoleType = ink::selector_id!("POOL_OWNER");

pub const POOL_ADMIN: RoleType = ink::selector_id!("POOL_ADMIN");

pub const PROTOCOL: RoleType = ink::selector_id!("PROTOCOL");

pub const BOUNTY_MANAGER: RoleType = ink::selector_id!("BOUNTY_MANAGER");

pub const PROTOCOL_ADMIN: RoleType = ink::selector_id!("PROTOCOL_ADMIN");

pub const BRAND_ACCOUNT_MANAGER: RoleType = ink::selector_id!("BRAND_ACCOUNT_MANAGER");

pub const ONBOARDING_MANAGER: RoleType = ink::selector_id!("ONBOARDING_MANAGER");