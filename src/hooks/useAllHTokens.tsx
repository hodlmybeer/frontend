import { useConnectedWallet } from '../contexts/wallet'
import { useAsyncMemo } from '../hooks/useAsyncMemo'
import { getHTokens } from '../utils/graph'
import { hToken } from '../types'
import { useCustomToast } from './useCustomToast'

export function useAllHTokens(): { hTokens: hToken[] } {
  const { networkId } = useConnectedWallet()
  const toast = useCustomToast()

  const hTokens = useAsyncMemo(
    async () => {
      const products = await getHTokens(networkId, toast.error)
      if (products === null) return []

      return products
    },
    [],
    [networkId],
  )
  return { hTokens }
}
