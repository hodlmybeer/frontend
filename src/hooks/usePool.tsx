import { useMemo, useCallback } from 'react'
import { useConnectedWallet } from '../contexts/wallet'
import { useNotify } from './useNotify'
import BigNumber from 'bignumber.js'
// eslint-disable-next-line
import { hToken } from '../types'

const hTokenAbi = require('../constants/abis/hToken.json')

export function usePool(hToken: hToken) {
  const { web3, user } = useConnectedWallet()

  const { notifyCallback } = useNotify()

  const hTokenContract = useMemo(() => {
    return new web3.eth.Contract(hTokenAbi, hToken.id)
  }, [hToken, web3])

  const calculateShares = useCallback(
    async (amount: BigNumber) => {
      // change to batch Fill when it's live
      try {
        return (await hTokenContract.methods.calculateShares(amount).call()) as Promise<string>
      } catch (error) {
        console.log(`catch calculation error`, error)
        return '0'
      }
    },
    [hTokenContract],
  )

  const deposit = useCallback(
    async (amount: BigNumber) => {
      // change to batch Fill when it's live
      await hTokenContract.methods.deposit(amount).send({ from: user }).on('transactionHash', notifyCallback)
    },
    [hTokenContract, notifyCallback, user],
  )

  const redeem = useCallback(
    async (shares: BigNumber) => {
      // change to batch Fill when it's live
      await hTokenContract.methods.redeem(shares).send({ from: user }).on('transactionHash', notifyCallback)
    },
    [hTokenContract, notifyCallback, user],
  )

  const quit = useCallback(
    async (hTokenAmount: BigNumber) => {
      // change to batch Fill when it's live
      await hTokenContract.methods.quit(hTokenAmount).send({ from: user }).on('transactionHash', notifyCallback)
    },
    [hTokenContract, notifyCallback, user],
  )

  return { deposit, calculateShares, redeem, quit }
}
