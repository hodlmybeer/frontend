import { useConnectedWallet } from '../contexts/wallet'
import { useAsyncMemo } from '../hooks/useAsyncMemo'
import { getAccountHodlings } from '../utils/graph'
import { Hodling } from '../types'
import { useCustomToast } from './useCustomToast'

export function useAccountHodlings(user: string): { hodlings: Hodling[] } {
  const { networkId } = useConnectedWallet()
  const toast = useCustomToast()

  const hodlings = useAsyncMemo(
    async () => {
      if (!user) return []
      const account = await getAccountHodlings(networkId, user, toast.error)
      return account === null ? [] : account.hodlings
    },
    [],
    [networkId, user],
  )
  return { hodlings }
}
