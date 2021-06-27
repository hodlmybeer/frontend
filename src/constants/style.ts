import { SupportedNetworks, CoinTags } from './enums'

export const networkColors: { [key in SupportedNetworks]: string } = {
  // [SupportedNetworks.Mainnet]: 'rgb(3, 135, 137, 0.7)',
  [SupportedNetworks.Ropsten]: '#ff4a8d',
  [SupportedNetworks.Kovan]: '#8F7FFE',
}

export const tagBackground: { [key in CoinTags]: string } = {
  [CoinTags.DAO]: '#ebfafd',
  [CoinTags.LongETH]: '#b2ffae',
  [CoinTags.DeFi]: '#f0dbff',
  [CoinTags.YIELD]: '#fff9ae',
}

export const tagColor: { [key in CoinTags]: string } = {
  [CoinTags.DAO]: '#08bee5',
  [CoinTags.LongETH]: '#359453',
  [CoinTags.DeFi]: '#8b36cc',
  [CoinTags.YIELD]: '#d0a016',
}
