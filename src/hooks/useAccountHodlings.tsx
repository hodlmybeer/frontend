import { useConnectedWallet } from '../contexts/wallet'
import { useAsyncMemo } from '../hooks/useAsyncMemo'
import { getAccountHodlings } from '../utils/graph'
import { Hodling } from '../types'
import { useCustomToast } from './useCustomToast'
import { useState } from 'react'

export function useAccountHodlings(user: string): { hodlings: Hodling[]; isLoading: boolean } {
  const [isLoading, setIsLoading] = useState(true)
  const { networkId } = useConnectedWallet()
  const toast = useCustomToast()

  const hodlings = useAsyncMemo(
    async () => {
      if (!user) return []
      try {
        setIsLoading(true)
        const account = await getAccountHodlings(networkId, user, toast.error)
        return account === null ? [] : account.hodlings
      } finally {
        setIsLoading(false)
      }
    },
    [],
    [networkId, user],
  )
  return { hodlings, isLoading }
}
