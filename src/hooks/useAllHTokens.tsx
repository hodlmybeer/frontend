import { useState } from 'react'
import { useConnectedWallet } from '../contexts/wallet'
import { useAsyncMemo } from '../hooks/useAsyncMemo'
import { getHTokens } from '../utils/graph'
import { hToken } from '../types'
import { useCustomToast } from './useCustomToast'

const blacklists = ['0xe277eaafdef9397d5464ce0670a0c60744dac52a']

export function useAllHTokens(): { hTokens: hToken[]; isLoading: boolean } {
  const [isLoading, setIsLoading] = useState(false)
  const { networkId } = useConnectedWallet()
  const toast = useCustomToast()

  const hTokens = useAsyncMemo(
    async () => {
      try {
        setIsLoading(true)
        const products = await getHTokens(networkId, toast.error)
        if (products === null) return []
        return products.filter(p => !blacklists.includes(p.id))
      } finally {
        setIsLoading(false)
      }
    },
    [],
    [networkId],
  )
  return { hTokens, isLoading }
}
