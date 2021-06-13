import { subgraph as endpoints } from '../constants/endpoints'
import { SupportedNetworks } from '../constants/enums'
import { hToken, Account } from '../types'

export async function getHTokens(networkId: SupportedNetworks, errorCallback: Function): Promise<hToken[]> {
  const now = (Date.now() / 1000).toFixed(0)
  const query = `
  {
    htokens (where: { expiry_gt: ${now} }) {
      id
      token
      symbol
      name 
      decimals
      expiry
      createdAt
      lockWindow
      penalty
      fee
      tokenBalance
      totalFee
      totalShares
      totalReward
      n
      bonusToken
      bonusTokenBalance
    }
  }
  `
  try {
    const response = await postQuery(endpoints[networkId], query)
    console.log(`response.data.htokens`, response.data.htokens)
    return response.data.htokens
  } catch (error) {
    console.log(`error`, error)
    errorCallback(error.toString())
    return []
  }
}

/**
 * Get account info
 */
export async function getAccountHodlings(
  networkId: SupportedNetworks,
  account: string,
  errorCallback: Function,
): Promise<Account | null> {
  const query = `
  {
  account(id: "${account.toLowerCase()}") {
    id
    hodlings {
      id
      shareBalance
      balance
      token {
        id
        symbol
        name 
        decimals
        expiry
        createdAt
        lockWindow
        penalty
        totalReward
        totalShares
        token
        n
      }
    }
  }
}
  `
  try {
    const response = await postQuery(endpoints[networkId], query)
    return response.data.account
  } catch (error) {
    errorCallback(error.toString())
    return null
  }
}

const postQuery = async (endpoint: string, query: string) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  }
  const url = endpoint
  const response = await fetch(url, options)
  const data = await response.json()
  if (data.errors) {
    throw new Error(data.errors[0].message)
  } else {
    return data
  }
}
