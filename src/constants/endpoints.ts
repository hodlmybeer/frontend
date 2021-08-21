import { SupportedNetworks } from './enums'

type graphEndPointType = {
  [key in SupportedNetworks]: string
}

export const subgraph: graphEndPointType = {
  // [SupportedNetworks.Mainnet]: 'https://api.thegraph.com/subgraphs/name/hodlmybeer/hodl-mainnet',
  [SupportedNetworks.BSC]: 'https://api.thegraph.com/subgraphs/name/hodlmybeer/hodl-bsc',
  [SupportedNetworks.Ropsten]: 'https://api.thegraph.com/subgraphs/name/hodlmybeer/hodl-ropsten',
  [SupportedNetworks.Matic]: 'https://api.thegraph.com/subgraphs/name/hodlmybeer/hodl-matic',
  [SupportedNetworks.Kovan]: 'https://api.thegraph.com/subgraphs/name/hodlmybeer/hodl-kovan',
  [SupportedNetworks.Mumbai]: 'https://api.thegraph.com/subgraphs/name/hodlmybeer/hodl-mumbai',
}

export const DISCORD = 'https://discord.gg/3kdYuyzUC2'
export const TWITTER = 'https://twitter.com/_hodlprotocol'
export const GITHUB = 'https://github.com/hodlmybeer'
