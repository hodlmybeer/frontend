/**
 * use `wallet_addEthereumChain` call to request a network switch.
 * @param provider
 * @param config
 * @returns {boolean} success or not
 */
export async function switchNetwork(
  provider: any,
  chainId: number,
  name: string,
  nativeCurrency:
    | {
        symbol: string
        name: string
        decimals: number
      }
    | undefined,
  rpcUrls: string[],
  blockExplorerUrls: string[],
): Promise<boolean> {
  // switch network
  try {
    if (!provider.request) {
      console.log(`provider`, provider)
      throw new Error('Invalid Wallet Provider. provider.request is undefined')
    }
    if ([1, 4, 42].includes(chainId)) {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
    } else {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: name,
            nativeCurrency,
            rpcUrls,
            blockExplorerUrls,
          },
        ],
      })
    }
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
