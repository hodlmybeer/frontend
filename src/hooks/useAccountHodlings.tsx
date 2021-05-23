import moment from 'moment'
import { useConnectedWallet } from '../contexts/wallet'
import { useAsyncMemo } from '../hooks/useAsyncMemo'
import { getAccountHodlings } from '../utils/graph'
import { Hodling } from '../types'
import { useCustomToast } from './useCustomToast'
import { useState, useMemo } from 'react'

export function useAccountHodlings(user: string): {
  hodlings: Hodling[]
  unlockedHodlings: Hodling[]
  isLoading: boolean
} {
  const [isLoading, setIsLoading] = useState(true)
  const { networkId } = useConnectedWallet()
  const toast = useCustomToast()

  const allHodlings = useAsyncMemo(
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

  const hodlings = useMemo(() => {
    return allHodlings.filter(h => h.token.expiry > moment().unix())
  }, [allHodlings])

  const unlockedHodlings = useMemo(() => {
    return allHodlings.filter(h => h.token.expiry < moment().unix())
  }, [allHodlings])

  return { hodlings, isLoading, unlockedHodlings }
}
