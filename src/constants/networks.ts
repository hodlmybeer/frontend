import { SupportedNetworks } from './enums'

export const networkIdToExplorer = {
  // [SupportedNetworks.Mainnet]: 'https://etherscan.io/',
  [SupportedNetworks.BSC]: 'https://bscscan.com/',
  [SupportedNetworks.Ropsten]: 'https://ropsten.etherscan.io',
  [SupportedNetworks.Kovan]: 'https://kovan.etherscan.io',
  [SupportedNetworks.Mumbai]: 'https://mumbai.polygonscan.com/',
}

export const networkIdToName = (network: number) => {
  // if(network === SupportedNetworks.Mainnet) return 'Mainnet'
  if (network === SupportedNetworks.Kovan) return 'Kovan'
  if (network === SupportedNetworks.Ropsten) return 'Ropsten'
  if (network === SupportedNetworks.Mumbai) return 'Mumbai'
  // if(network === SupportedNetworks.Polygon) return 'Matic'
  if (network === SupportedNetworks.BSC) return 'BSC'
  return 'Unknown'
}

export const networkToNativeCurrency = (networkId: SupportedNetworks) => {
  if (networkId === SupportedNetworks.Mumbai) return { decimals: 18, name: 'Matic', symbol: 'MATIC' }

  if (networkId === SupportedNetworks.BSC) return { decimals: 18, name: 'BNB', symbol: 'bnb' }

  // ethereum networks
  return undefined
}
