use openbrush::contracts::psp34::Id;

pub const PRECISION: u128 = 1000000;

pub const GOLDEN_RATIO_IN_PRECISION: u128 = (1618 * PRECISION) / 100;

pub const EXCHANGE_SLOPE: u128 = GOLDEN_RATIO_IN_PRECISION / 2;

pub const FUNGIBLE_REWARD: u8 = 1;

pub const DEFAULT_BRAND_ID: [u8; 10] = [0; 10];

pub const EMPTY_AMOUNT: u128 = 0;

pub const EMPTY_POSITION: Id = Id::U128(0);