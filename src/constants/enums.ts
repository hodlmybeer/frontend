export enum SupportedNetworks {
  // Mainnet = 1,
  Ropsten = 3,
  Kovan = 42,
  Mumbai = 80001,
}
// use number so we can compare breakpoints. (xs < sm)
export enum BreakPoints {
  xs,
  sm,
  md,
  lg,
}

export enum BarrelState {
  Open,
  Locked,
  Expired,
}

export enum CoinTags {
  DeFi = 'DeFi',
  DAO = 'DAO',
  LongETH = 'Long ETH',
  Yield = 'Yield',
}
