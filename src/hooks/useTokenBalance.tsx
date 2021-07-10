import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { useConnectedWallet } from '../contexts/wallet'
import { ZERO_ADDR } from '../constants/addresses'

import { getProvider } from '../hooks/useConnection'

const erc20Abi = require('../constants/abis/erc20.json')

/**
 * get token balance.
 * @param token token address
 * @param refetchIntervalSec refetch interval in seconds
 * @returns {BigNumber} raw balance
 */
export const useTokenBalance = (
  token: string,
  account: string,
  refetchIntervalSec: number,
): { balance: BigNumber; symbol: string; decimals: number } => {
  const [balance, setBalance] = useState<BigNumber>(new BigNumber(0))

  const [decimals, setDecimals] = useState<number>(18)
  const [symbol, setSymbol] = useState('')

  const { networkId } = useConnectedWallet()
  useEffect(() => {
    let isCancelled = false

    async function updateBalance() {
      if (!token) return
      if (!account) return
      const balance = await getBalance(networkId, token, account)
      if (!isCancelled) setBalance(balance)
    }

    async function updateTokeDetails() {
      if (!token) return
      const { decimals, symbol } = await getTokenDetails(networkId, token)
      if (!isCancelled) {
        setDecimals(decimals)
        setSymbol(symbol)
      }
    }
    updateTokeDetails()
    updateBalance()
    const id = setInterval(updateBalance, refetchIntervalSec * 1000)

    // cleanup function: remove interval
    return () => {
      isCancelled = true
      clearInterval(id)
    }
  }, [token, refetchIntervalSec, account, networkId])

  return { balance, decimals, symbol }
}

async function getTokenDetails(networkId: number, token: string): Promise<{ symbol: string; decimals: number }> {
  if (token === ZERO_ADDR) return { symbol: 'ETH', decimals: 18 }
  const web3 = new Web3(getProvider(networkId))
  const erc20 = new web3.eth.Contract(erc20Abi, token)
  const symbol = await erc20.methods.symbol().call()
  const decimals = await erc20.methods.decimals().call()
  return { symbol, decimals }
}

async function getBalance(networkId: number, token: string, account: string) {
  const web3 = new Web3(getProvider(networkId))
  if (token === ZERO_ADDR) return new BigNumber(await web3.eth.getBalance(account))
  const erc20 = new web3.eth.Contract(erc20Abi, token)
  const t = await erc20.methods.balanceOf(account).call()
  return new BigNumber(t.toString())
}
