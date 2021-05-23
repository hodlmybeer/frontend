import { useMemo, useCallback } from 'react'
import { useConnectedWallet } from '../contexts/wallet'
import { useNotify } from './useNotify'
import BigNumber from 'bignumber.js'
import moment from 'moment'
BigNumber.config({
  DECIMAL_PLACES: 29,
})

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
    (amount: BigNumber) => {
      // change to batch Fill when it's live
      const timeLeft = hToken.expiry - moment().unix()
      const totalTime = hToken.expiry - hToken.createdAt
      return amount
        .times(timeLeft ** hToken.n)
        .div(totalTime ** hToken.n)
        .integerValue()
    },
    [hToken.createdAt, hToken.n, hToken.expiry],
  )

  const deposit = useCallback(
    async (amount: BigNumber) => {
      // change to batch Fill when it's live
      await hTokenContract.methods.deposit(amount.toString()).send({ from: user }).on('transactionHash', notifyCallback)
    },
    [hTokenContract, notifyCallback, user],
  )

  const redeem = useCallback(
    async (shares: BigNumber) => {
      // change to batch Fill when it's live
      await hTokenContract.methods.redeem(shares.toString()).send({ from: user }).on('transactionHash', notifyCallback)
    },
    [hTokenContract, notifyCallback, user],
  )

  const quit = useCallback(
    async (hTokenAmount: BigNumber) => {
      // change to batch Fill when it's live
      await hTokenContract.methods
        .quit(hTokenAmount.toString())
        .send({ from: user })
        .on('transactionHash', notifyCallback)
    },
    [hTokenContract, notifyCallback, user],
  )

  return { deposit, calculateShares, redeem, quit }
}
