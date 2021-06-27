import { SupportedNetworks } from './enums'

export const ZERO_ADDR = '0x0000000000000000000000000000000000000000'

export const factories: {
  [key in SupportedNetworks]: string
} = {
  [SupportedNetworks.Ropsten]: '0xE4c2981f17102390C694698504741D8a6325e4f2',
  [SupportedNetworks.Kovan]: '0x0bced6E2D5548c89882686fBBdd5D8BdFF44827d',
}
