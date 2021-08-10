import { SupportedNetworks } from './enums'

export const ZERO_ADDR = '0x0000000000000000000000000000000000000000'

export const trustedCreators = [
  '0xf668606b896389066a39b132741763e1ca6d76a2', // tester account1
]

export const factories: {
  [key in SupportedNetworks]: string
} = {
  [SupportedNetworks.BSC]: '0x4768F443E56fd080652429323b38Fc9eD0400D39',
  [SupportedNetworks.Ropsten]: '0x0826ac5359e952Ba73C174722589CB55C1CE1A85',
  [SupportedNetworks.Kovan]: '0x6fdAdC05Db7E980C9857B5e8A1C5ec1A3061Eb77',
  [SupportedNetworks.Mumbai]: '0x8d6994b701F480C27757c5FE2bd93d5352160081',
}

export const getOfficialFeeRecipient = (network: SupportedNetworks) => {
  const feeRecipient = '0x556076279Edd24c614b4E1AeF8215fc963d18E97' // testnet fee recipient

  return feeRecipient.toLowerCase()
}
