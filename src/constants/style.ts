import { CoinTags } from './enums'

export const tagBackground: { [key in CoinTags]: string } = {
  [CoinTags.DAO]: '#ebfafd',
  [CoinTags.LongETH]: '#b2ffae',
  [CoinTags.DeFi]: '#f0dbff',
  [CoinTags.Yield]: '#fff9ae',
}

export const tagColor: { [key in CoinTags]: string } = {
  [CoinTags.DAO]: '#08bee5',
  [CoinTags.LongETH]: '#359453',
  [CoinTags.DeFi]: '#8b36cc',
  [CoinTags.Yield]: '#d0a016',
}
