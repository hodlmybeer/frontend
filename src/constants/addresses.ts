import { SupportedNetworks } from './networks'
import { Token } from '../types/index'

type Tokens = {
  [key in SupportedNetworks]: Token[]
}

export const ZERO_ADDR = '0x0000000000000000000000000000000000000000'

export const eth: Token = {
  name: 'Ether',
  id: ZERO_ADDR,
  symbol: 'ETH',
  decimals: 18,
}

export const tokens: Tokens = {
  [SupportedNetworks.Mainnet]: [
    eth,
    {
      name: 'USDC',
      id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      symbol: 'USDC',
      decimals: 6,
    },
    {
      name: 'Wrapped Ether',
      id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      symbol: 'WETH',
      decimals: 18,
    },
    {
      name: 'Wrapped Bitcoin',
      id: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      symbol: 'WBTC',
      decimals: 8,
    },
  ],

  [SupportedNetworks.Ropsten]: [
    eth,
    {
      name: 'Opyn USDC',
      id: '0x8be3a2a5c37b16c6eaa2be6a3fa1cf1e465f8691',
      symbol: 'USDC',
      decimals: 6,
    },
    {
      name: 'Wrapped Ether',
      id: '0xc778417e063141139fce010982780140aa0cd5ab',
      symbol: 'WETH',
      decimals: 18,
    },
    {
      name: 'Opyn Wrapped Bitcoin',
      id: '0x6b8baf03cb00f8f1fa94999b71047fea06f7251a',
      symbol: 'WBTC',
      decimals: 8,
    },
  ],
  [SupportedNetworks.Kovan]: [
    eth,
    {
      name: 'USDC',
      id: '0xf5cb5408b40e819e7db5347664be03b52accac9d',
      symbol: 'USDC',
      decimals: 6,
    },
    {
      name: 'Wrapped Ether',
      id: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
      symbol: 'WETH',
      decimals: 18,
    },
    {
      name: 'Wrapped Bitcoin',
      id: '0xd7c8c2f7b6ebdbc88e5ab0101dd24ed5aca58b0f',
      symbol: 'WBTC',
      decimals: 8,
    },
  ],
}

type SystemAddresses = {
  [key in SupportedNetworks]: {
    controller: string
    factory: string
    addressBook: string
    whitelist: string
    pool: string
    zeroxExchange: string
  }
}

export const blacklistOTokens = {
  [SupportedNetworks.Mainnet]: [ZERO_ADDR],
  [SupportedNetworks.Ropsten]: [ZERO_ADDR],
  [SupportedNetworks.Kovan]: ['0x81300ac27ac2470713602b4d8a73dfcc85b779b1'],
}
