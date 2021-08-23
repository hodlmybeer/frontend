import { SupportedNetworks } from './enums'

export const ZERO_ADDR = '0x0000000000000000000000000000000000000000'

export const trustedCreators = [
  '0xf668606b896389066a39b132741763e1ca6d76a2', // tester account1
]

export const factories: {
  [key in SupportedNetworks]: string
} = {
  [SupportedNetworks.Mainnet]: '0x2DE82e7c77deFe0bB7578b5F4d4473c4a2dba40d',
  [SupportedNetworks.BSC]: '0x4768F443E56fd080652429323b38Fc9eD0400D39',
  [SupportedNetworks.Ropsten]: '0x0826ac5359e952Ba73C174722589CB55C1CE1A85',
  [SupportedNetworks.Kovan]: '0x6fdAdC05Db7E980C9857B5e8A1C5ec1A3061Eb77',
  [SupportedNetworks.Matic]: '0xdDeeC965b5346986C3caE6E17A04Ee90048EaB54',
  [SupportedNetworks.Mumbai]: '0x8d6994b701F480C27757c5FE2bd93d5352160081',
}

export const getOfficialFeeRecipient = (network: SupportedNetworks) => {
  if (network === SupportedNetworks.Mainnet) return '0x77a2c2e962a1D6245A92Fb6554C91C024Cbe76bF'
  if (network === SupportedNetworks.BSC) return '0xd757026D2554Df22c3F740a921B628266024502D'
  if (network === SupportedNetworks.Matic) return '0xD2dBF6370A6D4517611279073851B54E5260816e'
  const feeRecipient = '0x556076279Edd24c614b4E1AeF8215fc963d18E97' // testnet fee recipient

  return feeRecipient.toLowerCase()
}
