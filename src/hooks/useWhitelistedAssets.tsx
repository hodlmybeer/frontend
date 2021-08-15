import { useState } from 'react'
import { useConnectedWallet } from '../contexts/wallet'
import { useAsyncMemo } from '../hooks/useAsyncMemo'
import { getWhitelistedTokens } from '../utils/graph'
import { useCustomToast } from './useCustomToast'

export function useWhitelistedAssets(): { assets: string[]; isLoading: boolean } {
  const [isLoading, setIsLoading] = useState(false)
  const { networkId } = useConnectedWallet()
  const toast = useCustomToast()

  const assets = useAsyncMemo(
    async () => {
      try {
        setIsLoading(true)
        const tokens = await getWhitelistedTokens(networkId, toast.error)
        if (tokens === null) return []
        return tokens
      } finally {
        setIsLoading(false)
      }
    },
    [],
    [networkId],
  )
  return { assets, isLoading }
}
