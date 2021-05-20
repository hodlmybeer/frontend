import { SupportedNetworks } from './networks'
import { Token } from '../types/index'

import ethIcon from '../imgs/coins/eth.png'
import uniIcon from '../imgs/coins/uni.png'
import usdcIcon from '../imgs/coins/usdc.png'
import wbtcIcon from '../imgs/coins/wbtc.png'
import wethIcon from '../imgs/coins/weth.png'

type Tokens = {
  [key in SupportedNetworks]: Token[]
}

export const ZERO_ADDR = '0x0000000000000000000000000000000000000000'

export const eth: Token = {
  name: 'Ether',
  id: ZERO_ADDR,
  symbol: 'ETH',
  decimals: 18,
  img: ethIcon,
}

export const tokens: Tokens = {
  // [SupportedNetworks.Mainnet]: [
  //   eth,
  //   {
  //     name: 'USDC',
  //     id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  //     symbol: 'USDC',
  //     decimals: 6,
  //   },
  //   {
  //     name: 'Wrapped Ether',
  //     id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  //     symbol: 'WETH',
  //     decimals: 18,
  //   },
  //   {
  //     name: 'Wrapped Bitcoin',
  //     id: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
  //     symbol: 'WBTC',
  //     decimals: 8,
  //   },
  //   {
  //     name: 'Uniswap Token',
  //     id: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
  //     symbol: 'UNI',
  //     decimals: 18,
  //   },
  // ],

  [SupportedNetworks.Ropsten]: [
    eth,
    {
      name: 'Wrapped Ether',
      id: '0xc778417e063141139fce010982780140aa0cd5ab',
      symbol: 'WETH',
      decimals: 18,
      img: wethIcon,
    },
    {
      name: 'Mock UNI',
      id: '0x042d140Bc1e281eb4477a12B979f297633f20B46',
      symbol: 'UNI',
      decimals: 18,
      img: uniIcon,
      mintable: true,
    },
    {
      name: 'Mock USDC',
      id: '0xdAD5De585BC4AB7C7A3D4e00d95b9BdbC105d277',
      symbol: 'USDC',
      decimals: 6,
      img: usdcIcon,
      mintable: true,
    },
    {
      name: 'Mock BTC',
      id: '0xbE10c00C6A0395a27ede213Bc4247887292B76B9',
      symbol: 'WBTC',
      decimals: 8,
      img: wbtcIcon,
      mintable: true,
    },
  ],
  // [SupportedNetworks.Kovan]: [
  //   eth,
  //   {
  //     name: 'USDC',
  //     id: '0xf5cb5408b40e819e7db5347664be03b52accac9d',
  //     symbol: 'USDC',
  //     decimals: 6,
  //   },
  //   {
  //     name: 'Wrapped Ether',
  //     id: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
  //     symbol: 'WETH',
  //     decimals: 18,
  //   },
  //   {
  //     name: 'Wrapped Bitcoin',
  //     id: '0xd7c8c2f7b6ebdbc88e5ab0101dd24ed5aca58b0f',
  //     symbol: 'WBTC',
  //     decimals: 8,
  //   },
  // ],
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
