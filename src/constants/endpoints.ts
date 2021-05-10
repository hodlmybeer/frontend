import { SupportedNetworks } from './networks'

type graphEndPointType = {
  [key in SupportedNetworks]: string
}

const isPublic = process.env.REACT_APP_PUBLIC === 'true'

export const subgraph: graphEndPointType = {
  [SupportedNetworks.Mainnet]: isPublic
    ? 'https://api.thegraph.com/subgraphs/name/opynfinance/gamma-mainnet'
    : 'https://api.thegraph.com/subgraphs/name/opynfinance/playground',
  [SupportedNetworks.Kovan]: isPublic
    ? 'https://api.thegraph.com/subgraphs/name/opynfinance/gamma-kovan'
    : 'https://api.thegraph.com/subgraphs/name/opynfinance/gamma-internal-kovan',
  [SupportedNetworks.Ropsten]: 'https://api.thegraph.com/subgraphs/name/opynfinance/gamma-ropsten',
}
