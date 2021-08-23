import { useState, useEffect, useCallback, useMemo } from 'react'
import { getPreference, storePreference } from '../utils/storage'
import Onboard from 'bnc-onboard'
import Web3 from 'web3'
import { SupportedNetworks } from '../constants'

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY
const BLOCKNATIVE_KEY = process.env.REACT_APP_BLOCKNATIVE_KEY
const FORTMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY

const defaultNetworkId = 1

export const useConnection = () => {
  const [user, setUser] = useState<string>('')

  // web3 instance associate with the wallet. if the wallet is on a weird network, could be bad.
  const [web3, setWeb3] = useState<Web3>(new Web3(getProvider(defaultNetworkId)))

  useEffect(() => {
    console.log(`web3 changes`, web3)
  }, [web3])

  // the network id that should be used to retrieve data. (always a supported network)
  const [networkId, setNetworkId] = useState<SupportedNetworks>(defaultNetworkId)

  // the network id that the current provider is on.
  const [currentProviderNetwork, setCurrentProvideNetwork] = useState<number>(defaultNetworkId)

  // function for block native sdk when address is updated
  const setAddressCallback = useCallback((address: string | undefined) => {
    if (!address) {
      setUser('')
    } else {
      setUser(address)
    }
  }, [])

  // function for block native sdk when wallet is updated
  const setWalletCallback = useCallback(async wallet => {
    storePreference('selectedWallet', wallet.name)

    if (!wallet.provider) {
      // user disconnected, wallet.provider will be undefined, fallback to default
      console.log(`wallet no provider`)
      setWeb3(new Web3(getProvider(defaultNetworkId)))
      return
    }

    const web3Instance = new Web3(wallet.provider)
    const newId = await web3Instance.eth.net.getId()
    console.log(`newId`, newId)
    if (newId in SupportedNetworks) {
      console.log(`set new web3`, newId)
      setWeb3(web3Instance)
    } else {
      console.log(`not setting web3`)
    }
  }, [])

  const onboard = useMemo(() => {
    const _handleNetworkChange = (_newNetwork: number) => {
      if (_newNetwork in SupportedNetworks) {
        setNetworkId(_newNetwork)
        onboard.config({
          networkId: _newNetwork,
        })
      }
      // update currentProviderNetwork no matter what, so we know if user is on the wrong network
      setCurrentProvideNetwork(_newNetwork)
    }

    return initOnboard(setAddressCallback, setWalletCallback, _handleNetworkChange, networkId)
  }, [setAddressCallback, setWalletCallback, networkId])

  // get last connection info and try to set default user to previous connected account.
  useEffect(() => {
    async function getDefault() {
      const previouslySelectedWallet = getPreference('selectedWallet', 'null')
      if (previouslySelectedWallet === 'null') return
      const selected = await onboard.walletSelect(previouslySelectedWallet)

      if (selected) {
        const address = onboard.getState().address
        if (address !== null) setAddressCallback(address)
      }
    }
    getDefault()
  }, [onboard, setAddressCallback])

  const connect = useCallback(async () => {
    const selected = await onboard.walletSelect()
    if (!selected) return false
    const checked = await onboard.walletCheck()
    if (!checked) return false
    const account = onboard.getState().address
    setUser(account)
    return account
  }, [onboard])

  const disconnect = useCallback(async () => {
    onboard.walletReset()
    setUser('')
    setCurrentProvideNetwork(defaultNetworkId)
  }, [onboard])

  return { networkId, user, setUser, web3, connect, disconnect, currentProviderNetwork }
}

export const initOnboard = (addressChangeCallback, walletChangeCallback, networkChangeCallback, networkId) => {
  const RPC_URL = getProvider(networkId)
  const onboard = Onboard({
    darkMode: getPreference('theme', 'light') === 'dark',
    dappId: BLOCKNATIVE_KEY, // [String] The API key created by step one above
    networkId: networkId,
    subscriptions: {
      address: addressChangeCallback,
      wallet: walletChangeCallback,
      network: networkChangeCallback,
    },
    walletSelect: {
      description: 'Please select a wallet to connect to the blockchain',
      wallets: [
        { walletName: 'metamask', preferred: true },
        {
          walletName: 'walletConnect',
          infuraKey: INFURA_KEY,
          preferred: true,
        },
        { walletName: 'fortmatic', apiKey: FORTMATIC_KEY, preferred: true },
        { walletName: 'lattice', appName: 'Hodl', rpcUrl: RPC_URL, preferred: true },
        { walletName: 'huobiwallet', rpcUrl: RPC_URL, preferred: true },
        { walletName: 'authereum', preferred: true },
        { walletName: 'trust', preferred: true, rpcUrl: RPC_URL },
      ],
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
      { checkName: 'network' },
    ],
  })
  return onboard
}

export const getProvider = (networkId: number) => {
  if (networkId === 80001) return 'https://rpc-mumbai.maticvigil.com' // mumbai
  if (networkId === 137) return 'https://rpc-mainnet.matic.network' // network
  if (networkId === 56) return 'https://bsc-dataseed.binance.org/' // bsc testnet
  if (networkId === 97) return 'https://data-seed-prebsc-1-s1.binance.org:8545' // bsc

  const network = networkId === 1 ? 'mainnet' : networkId === 3 ? 'ropsten' : 'kovan'
  return `https://${network}.infura.io/v3/${INFURA_KEY}`
}
