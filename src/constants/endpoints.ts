import { SupportedNetworks } from './enums'

type graphEndPointType = {
  [key in SupportedNetworks]: string
}

export const subgraph: graphEndPointType = {
  // [SupportedNetworks.Mainnet]: 'https://api.thegraph.com/subgraphs/name/antoncoding/hodl-mainnet'
  [SupportedNetworks.Ropsten]: 'https://api.thegraph.com/subgraphs/name/hodlmybeer/hodl-ropsten',
  [SupportedNetworks.Kovan]: 'https://api.thegraph.com/subgraphs/name/hodlmybeer/hodl-kovan',
  [SupportedNetworks.Mumbai]: 'https://api.thegraph.com/subgraphs/name/hodlmybeer/hodl-mumbai',
}
