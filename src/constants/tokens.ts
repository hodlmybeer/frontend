import { Token } from '../types/index'
import { SupportedNetworks, CoinTags } from './enums'

type Tokens = {
  [key in SupportedNetworks]: Token[]
}

export const tokens: Tokens = {
  [SupportedNetworks.Mainnet]: [
    {
      name: 'Wrapped Ether',
      id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      symbol: 'WETH',
      coinGeckoId: 'ethereum',
      decimals: 18,
      img: require('../imgs/coins/weth.png'),
      tags: [CoinTags.LongETH],
    },
    {
      name: 'Wrapped Bitcoin',
      id: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      symbol: 'WBTC',
      decimals: 8,
      coinGeckoId: 'bitcoin',
      img: require('../imgs/coins/wbtc.png'),
      tags: [],
    },
    {
      name: 'Uniswap Token',
      id: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      symbol: 'UNI',
      decimals: 18,
      coinGeckoId: 'uniswap',
      img: require('../imgs/coins/uni.png'),
      tags: [CoinTags.DeFi],
    },
    {
      name: 'Chainlink',
      id: '0x514910771af9ca656af840dff83e8264ecf986ca',
      symbol: 'LINK',
      decimals: 18,
      coinGeckoId: 'chainlink',
      img: require('../imgs/coins/link.png'),
      mintable: true,
      tags: [],
    },
  ],
  [SupportedNetworks.BSC]: [
    {
      name: 'Baby Doge',
      id: '0xc748673057861a797275cd8a068abb95a902e8de',
      coinGeckoId: 'baby-doge-coin',
      symbol: 'BABYDOGE',
      decimals: 9,
      img: require('../imgs/coins/babydoge.webp'),
      tags: [],
    },
    {
      name: 'Wrapped BNB',
      id: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      coinGeckoId: 'binancecoin',
      symbol: 'WBNB',
      decimals: 18,
      img: require('../imgs/coins/bnb.png'),
      tags: [],
    },
  ],
  [SupportedNetworks.Matic]: [
    {
      name: 'Wrapped Matic',
      id: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
      coinGeckoId: 'matic-network',
      symbol: 'MATIC',
      decimals: 18,
      img: require('../imgs/coins/matic.webp'),
      tags: [],
    },
  ],
  [SupportedNetworks.Ropsten]: [
    {
      name: 'Wrapped Ether',
      id: '0xc778417e063141139fce010982780140aa0cd5ab',
      coinGeckoId: 'ethereum',
      symbol: 'WETH',
      decimals: 18,
      img: require('../imgs/coins/weth.png'),
      tags: [CoinTags.LongETH],
    },
    {
      name: 'Wrapped Lido ETH',
      id: '0x44bbfad7743b4c50fFD639949F69B4C0e49438d4',
      coinGeckoId: '',
      symbol: 'wstETH',
      decimals: 18,
      img: require('../imgs/coins/steth.svg'),
      mintable: true,
      tags: [CoinTags.Yield, CoinTags.LongETH],
    },
    {
      name: 'Mock UNI',
      id: '0x042d140Bc1e281eb4477a12B979f297633f20B46',
      coinGeckoId: 'uniswap',
      symbol: 'UNI',
      decimals: 18,
      img: require('../imgs/coins/uni.png'),
      mintable: true,
      tags: [CoinTags.DeFi],
    },
    {
      name: 'Mock USDC',
      id: '0xdAD5De585BC4AB7C7A3D4e00d95b9BdbC105d277',
      symbol: 'USDC',
      coinGeckoId: '',
      decimals: 6,
      img: require('../imgs/coins/usdc.png'),
      mintable: true,
      tags: [],
    },
    {
      name: 'Mock BTC',
      id: '0xbE10c00C6A0395a27ede213Bc4247887292B76B9',
      coinGeckoId: 'bitcoin',
      symbol: 'WBTC',
      decimals: 8,
      img: require('../imgs/coins/wbtc.png'),
      mintable: true,
      tags: [],
    },
    {
      name: 'Mock Chainlink',
      id: '0xDC33784882E1Cd2CF46E583ca0C0905545D6759b',
      coinGeckoId: 'chainlink',
      symbol: 'LINK',
      decimals: 18,
      img: require('../imgs/coins/link.png'),
      mintable: true,
      tags: [],
    },
    {
      name: 'Mock ANT',
      id: '0x9a58Ea5960660f916A1566c4F666121cD6e56f4E',
      coinGeckoId: 'aragon',
      symbol: 'ANT',
      decimals: 18,
      img: require('../imgs/coins/ant.png'),
      mintable: true,
      tags: [CoinTags.DAO],
    },
    {
      name: 'Mock COMP',
      id: '0xa40DFdb9969EB28e9B2dB5EC5407bE18889a1B18',
      coinGeckoId: 'compound',
      symbol: 'COMP',
      decimals: 18,
      img: require('../imgs/coins/comp.png'),
      mintable: true,
      tags: [CoinTags.DeFi],
    },
    {
      name: 'Mock DPI',
      id: '0xb5a56ff31D1bfaB5c6992386f334Af60843a096D',
      coinGeckoId: 'defipulse-index',
      symbol: 'DPI',
      decimals: 18,
      img: require('../imgs/coins/dpi.png'),
      mintable: true,
      tags: [CoinTags.DeFi],
    },
    {
      name: 'Mock MKR',
      id: '0xBb749D57533F44755b0c4049db8B5cEa64055200',
      coinGeckoId: 'maker',
      symbol: 'MKR',
      decimals: 18,
      img: require('../imgs/coins/mkr.png'),
      mintable: true,
      tags: [CoinTags.DeFi],
    },
    {
      name: 'Shiba Inu',
      id: '0x88e79067FbeB744cfc087CeB785a71B07c18c81e',
      symbol: 'SHIB',
      decimals: 18,
      img: require('../imgs/coins/shib.png'),
      mintable: true,
      tags: [],
    },
  ],
  [SupportedNetworks.Kovan]: [
    {
      name: 'Wrapped Ether',
      id: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
      symbol: 'WETH',
      coinGeckoId: 'ethereum',
      decimals: 18,
      img: require('../imgs/coins/weth.png'),
      tags: [CoinTags.LongETH],
    },
    {
      name: 'Mock UNI',
      id: '0xf9d300C776F452B1219f69d5e14c46f5AC0C19DE',
      coinGeckoId: 'uniswap',
      symbol: 'UNI',
      decimals: 18,
      img: require('../imgs/coins/uni.png'),
      mintable: true,
      tags: [CoinTags.DeFi],
    },
    {
      name: 'Mock BTC',
      id: '0x23faDac905feCDe8Fb5d788f6947536fDCd8516d',
      coinGeckoId: 'bitcoin',
      symbol: 'WBTC',
      decimals: 8,
      img: require('../imgs/coins/wbtc.png'),
      mintable: true,
      tags: [],
    },
    {
      name: 'Mock Chainlink',
      id: '0xCEE8A49b267b1f692B44b9889494Acbc74753218',
      coinGeckoId: 'chainlink',
      symbol: 'LINK',
      decimals: 18,
      img: require('../imgs/coins/link.png'),
      mintable: true,
      tags: [],
    },
    {
      name: 'Mock ANT',
      id: '0x5819814c2dc7c339423f18785b20563eF6667aA8',
      coinGeckoId: 'aragon',
      symbol: 'ANT',
      decimals: 18,
      img: require('../imgs/coins/ant.png'),
      mintable: true,
      tags: [CoinTags.DAO],
    },
    {
      name: 'Mock COMP',
      id: '0xC2d864154d5BCA67E9C34A66cE3dbFaCE87dc372',
      coinGeckoId: 'compound',
      symbol: 'COMP',
      decimals: 18,
      img: require('../imgs/coins/comp.png'),
      mintable: true,
      tags: [CoinTags.DeFi],
    },
    {
      name: 'Mock DPI',
      id: '0xaE53D328dB1ff0e626a276F350997b7b09f5622f',
      coinGeckoId: 'defipulse-index',
      symbol: 'DPI',
      decimals: 18,
      img: require('../imgs/coins/dpi.png'),
      mintable: true,
      tags: [CoinTags.DeFi],
    },
    {
      name: 'Mock MKR',
      id: '0x3afba74869fEb1BCD800851BF7699fC48cCe0F81',
      coinGeckoId: 'maker',
      symbol: 'MKR',
      decimals: 18,
      img: require('../imgs/coins/mkr.png'),
      mintable: true,
      tags: [CoinTags.DeFi],
    },
    {
      name: 'Wrapped Lido ETH',
      id: '0x66471ee9CA6844534ea709F320e5095360cCf8f1',
      coinGeckoId: '',
      symbol: 'stETH',
      decimals: 18,
      img: require('../imgs/coins/steth.svg'),
      mintable: true,
      tags: [CoinTags.Yield, CoinTags.LongETH],
    },
    {
      name: 'Shiba Inu',
      id: '0x090e29A0Fb5c661d86ce27CF932C44Fb178B5c56',
      symbol: 'SHIB',
      decimals: 18,
      img: require('../imgs/coins/shib.png'),
      mintable: true,
      tags: [],
    },
  ],
  [SupportedNetworks.Mumbai]: [
    {
      name: 'Wrapped Ether',
      coinGeckoId: 'ethereum',
      id: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
      symbol: 'WETH',
      decimals: 18,
      img: require('../imgs/coins/weth.png'),
      tags: [CoinTags.LongETH],
    },
    {
      name: 'Quickswap',
      coinGeckoId: 'quick',
      id: '0x7630e7dE53E3d1f298f653d27fcF3710c602331C',
      symbol: 'QUICK',
      decimals: 18,
      img: require('../imgs/coins/quick.png'),
      mintable: true,
      tags: [CoinTags.DeFi],
    },
    {
      name: 'Mock BTC',
      id: '0x970f2a5dB82200ee82eE58fB2464a02D0Df32dD3',
      coinGeckoId: 'bitcoin',
      symbol: 'WBTC',
      decimals: 8,
      img: require('../imgs/coins/wbtc.png'),
      mintable: true,
      tags: [],
    },
  ],
}
