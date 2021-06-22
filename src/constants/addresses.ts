import { SupportedNetworks } from './enums'
import { Token } from '../types/index'

export const ZERO_ADDR = '0x0000000000000000000000000000000000000000'

export const factories: {
  [key in SupportedNetworks]: string
} = {
  [SupportedNetworks.Ropsten]: '0xE4c2981f17102390C694698504741D8a6325e4f2',
  [SupportedNetworks.Kovan]: '0x0bced6E2D5548c89882686fBBdd5D8BdFF44827d',
}

// export const eth: Token = {
//   name: 'Ether',
//   id: ZERO_ADDR,
//   symbol: 'ETH',
//   decimals: 18,
//   img: ethIcon,
// }

type Tokens = {
  [key in SupportedNetworks]: Token[]
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
  // {
  //   name: 'Chainlink',
  //   id: '0x514910771af9ca656af840dff83e8264ecf986ca',
  //   symbol: 'LINK',
  //   decimals: 18,
  // }
  // ],

  [SupportedNetworks.Ropsten]: [
    {
      name: 'Wrapped Ether',
      id: '0xc778417e063141139fce010982780140aa0cd5ab',
      coingeckId: 'ethereum',
      symbol: 'WETH',
      decimals: 18,
      img: require('../imgs/coins/weth.png'),
    },
    {
      name: 'Mock UNI',
      id: '0x042d140Bc1e281eb4477a12B979f297633f20B46',
      coingeckId: 'uniswap',
      symbol: 'UNI',
      decimals: 18,
      img: require('../imgs/coins/uni.png'),
      mintable: true,
    },
    {
      name: 'Mock USDC',
      id: '0xdAD5De585BC4AB7C7A3D4e00d95b9BdbC105d277',
      symbol: 'USDC',
      coingeckId: '',
      decimals: 6,
      img: require('../imgs/coins/usdc.png'),
      mintable: true,
    },
    {
      name: 'Mock BTC',
      id: '0xbE10c00C6A0395a27ede213Bc4247887292B76B9',
      coingeckId: 'bitcoin',
      symbol: 'WBTC',
      decimals: 8,
      img: require('../imgs/coins/wbtc.png'),
      mintable: true,
    },
    {
      name: 'Mock Chainlink',
      id: '0xDC33784882E1Cd2CF46E583ca0C0905545D6759b',
      coingeckId: 'chainlink',
      symbol: 'LINK',
      decimals: 18,
      img: require('../imgs/coins/link.png'),
      mintable: true,
    },
    {
      name: 'Mock ANT',
      id: '0x9a58Ea5960660f916A1566c4F666121cD6e56f4E',
      coingeckId: 'aragon',
      symbol: 'ANT',
      decimals: 18,
      img: require('../imgs/coins/ant.png'),
      mintable: true,
    },
    {
      name: 'Mock COMP',
      id: '0xa40DFdb9969EB28e9B2dB5EC5407bE18889a1B18',
      coingeckId: 'compound',
      symbol: 'COMP',
      decimals: 18,
      img: require('../imgs/coins/comp.png'),
      mintable: true,
    },
    {
      name: 'Mock DPI',
      id: '0xb5a56ff31D1bfaB5c6992386f334Af60843a096D',
      coingeckId: 'defipulse-index',
      symbol: 'DPI',
      decimals: 18,
      img: require('../imgs/coins/dpi.png'),
      mintable: true,
    },
    {
      name: 'Mock MKR',
      id: '0xBb749D57533F44755b0c4049db8B5cEa64055200',
      coingeckId: 'maker',
      symbol: 'MKR',
      decimals: 18,
      img: require('../imgs/coins/mkr.png'),
      mintable: true,
    },
  ],
  [SupportedNetworks.Kovan]: [
    {
      name: 'Wrapped Ether',
      id: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
      symbol: 'WETH',
      decimals: 18,
      img: require('../imgs/coins/weth.png'),
    },
    {
      name: 'Mock UNI',
      id: '0xf9d300C776F452B1219f69d5e14c46f5AC0C19DE',
      coingeckId: 'uniswap',
      symbol: 'UNI',
      decimals: 18,
      img: require('../imgs/coins/uni.png'),
      mintable: true,
    },
    {
      name: 'Mock BTC',
      id: '0x23faDac905feCDe8Fb5d788f6947536fDCd8516d',
      coingeckId: 'bitcoin',
      symbol: 'WBTC',
      decimals: 8,
      img: require('../imgs/coins/wbtc.png'),
      mintable: true,
    },
    {
      name: 'Mock Chainlink',
      id: '0xCEE8A49b267b1f692B44b9889494Acbc74753218',
      coingeckId: 'chainlink',
      symbol: 'LINK',
      decimals: 18,
      img: require('../imgs/coins/link.png'),
      mintable: true,
    },
    {
      name: 'Mock ANT',
      id: '0x5819814c2dc7c339423f18785b20563eF6667aA8',
      coingeckId: 'aragon',
      symbol: 'ANT',
      decimals: 18,
      img: require('../imgs/coins/ant.png'),
      mintable: true,
    },
    {
      name: 'Mock COMP',
      id: '0xC2d864154d5BCA67E9C34A66cE3dbFaCE87dc372',
      coingeckId: 'compound',
      symbol: 'COMP',
      decimals: 18,
      img: require('../imgs/coins/comp.png'),
      mintable: true,
    },
    {
      name: 'Mock DPI',
      id: '0xaE53D328dB1ff0e626a276F350997b7b09f5622f',
      coingeckId: 'defipulse-index',
      symbol: 'DPI',
      decimals: 18,
      img: require('../imgs/coins/dpi.png'),
      mintable: true,
    },
    {
      name: 'Mock MKR',
      id: '0x3afba74869fEb1BCD800851BF7699fC48cCe0F81',
      coingeckId: 'maker',
      symbol: 'MKR',
      decimals: 18,
      img: require('../imgs/coins/mkr.png'),
      mintable: true,
    },
  ],
}
