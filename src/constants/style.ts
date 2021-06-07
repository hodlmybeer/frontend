import { SupportedNetworks } from './enums'

export const networkColors: { [key in SupportedNetworks]: string } = {
  // [SupportedNetworks.Mainnet]: 'rgb(3, 135, 137, 0.7)',
  [SupportedNetworks.Ropsten]: '#ff4a8d',
  [SupportedNetworks.Kovan]: '#8F7FFE',
}
