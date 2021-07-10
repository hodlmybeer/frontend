import { SupportedNetworks } from './enums'

export const networkIdToExplorer = {
  // [SupportedNetworks.Mainnet]: 'https://etherscan.io/',
  [SupportedNetworks.Ropsten]: 'https://ropsten.etherscan.io',
  [SupportedNetworks.Kovan]: 'https://kovan.etherscan.io',
  [SupportedNetworks.Mumbai]: 'https://mumbai.polygonscan.com/',
}

export const networkIdToName = {
  // [SupportedNetworks.Mainnet]: 'Mainnet',
  [SupportedNetworks.Kovan]: 'Kovan',
  [SupportedNetworks.Ropsten]: 'Ropsten',
  [SupportedNetworks.Mumbai]: 'Mumbai',
  // [SupportedNetworks.Polygon]: 'Matic',
  // [SupportedNetworks.BSC]: 'BSC',
}

export const networkToNativeCurrency = (networkId: SupportedNetworks) => {
  if (networkId === SupportedNetworks.Mumbai) return { decimals: 18, name: 'Matic', symbol: 'MATIC' }

  // if (networkId === SupportedNetworks.Mumbai) return {decimals: 18, name: 'BNB', symbol: 'bnb'}

  // ethereum networks
  return undefined
}
