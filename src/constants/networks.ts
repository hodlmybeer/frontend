import { SupportedNetworks } from './enums'

export const networkIdToTxUrl = {
  // [SupportedNetworks.Mainnet]: 'https://etherscan.io/tx',
  [SupportedNetworks.Ropsten]: 'https://ropsten.etherscan.io/tx',
  [SupportedNetworks.Kovan]: 'https://kovan.etherscan.io/tx',
  [SupportedNetworks.Mumbai]: 'https://polygon-explorer-mumbai.chainstacklabs.com/tx/',
}

export const networkIdToAddressUrl = {
  // [SupportedNetworks.Mainnet]: 'https://etherscan.io/address',
  [SupportedNetworks.Kovan]: 'https://kovan.etherscan.io/address',
  [SupportedNetworks.Ropsten]: 'https://ropsten.etherscan.io/address',
  [SupportedNetworks.Mumbai]: 'https://polygon-explorer-mumbai.chainstacklabs.com/address/',
}

export const networkIdToName = {
  // [SupportedNetworks.Mainnet]: 'Mainnet',
  [SupportedNetworks.Kovan]: 'Kovan',
  [SupportedNetworks.Ropsten]: 'Ropsten',
  [SupportedNetworks.Mumbai]: 'Mumbai',
  // [SupportedNetworks.Polygon]: 'Matic',
  // [SupportedNetworks.BSC]: 'BSC',
}
