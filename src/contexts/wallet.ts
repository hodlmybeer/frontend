import { createContext, useContext } from 'react'
import Web3 from 'web3'
import { SupportedNetworks } from '../constants/enums'
const INFURA_KEY = process.env.REACT_APP_INFURA_KEY

export interface Wallet {
  web3: Web3
  user: string
  setUser: (user: string) => void
  networkId: SupportedNetworks
  currnetProviderNetwork: number
  connect: () => Promise<string | false>
  disconnect: Function
}

export const DEFAULT: Wallet = {
  networkId: 1,
  currnetProviderNetwork: 1,
  web3: new Web3(`https://mainnet.infura.io/v3/${INFURA_KEY}`),
  user: '',
  setUser: (user: string): void => {},
  connect: async () => '',
  disconnect: () => {},
}

export const walletContext = createContext(DEFAULT)
export const useConnectedWallet = () => useContext(walletContext)
