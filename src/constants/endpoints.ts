import { SupportedNetworks } from './networks'

type graphEndPointType = {
  [key in SupportedNetworks]: string
}

export const subgraph: graphEndPointType = {
  // [SupportedNetworks.Mainnet]: 'https://api.thegraph.com/subgraphs/name/opynfinance/gamma-mainnet'
  [SupportedNetworks.Ropsten]: 'https://api.thegraph.com/subgraphs/name/antoncoding/hodl-ropsten',
}
