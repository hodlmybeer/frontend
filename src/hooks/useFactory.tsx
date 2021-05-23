import { useMemo, useCallback } from 'react'
import { useConnectedWallet } from '../contexts/wallet'
import { useNotify } from './useNotify'

import { factories } from '../constants'

const abi = require('../constants/abis/hTokenFactory.json')

export function useFactory() {
  const { web3, user, networkId } = useConnectedWallet()

  const { notifyCallback } = useNotify()

  const factory = useMemo(() => {
    return new web3.eth.Contract(abi, factories[networkId])
  }, [web3, networkId])

  const create = useCallback(
    async (
      token: string,
      penalty: string,
      lockWindow: string,
      expiry: string,
      fee: string,
      n: string,
      feeRecipient: string,
    ) => {
      // change to batch Fill when it's live
      await factory.methods
        .createHodlERC20(token, penalty, lockWindow, expiry, fee, n, feeRecipient)
        .send({ from: user })
        .on('transactionHash', notifyCallback)
    },
    [factory, notifyCallback, user],
  )

  return { create }
}
