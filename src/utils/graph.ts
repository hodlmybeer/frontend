import { subgraph as endpoints } from '../constants/endpoints'
import { SupportedNetworks } from '../constants/networks'
import {} from '../types'

/**
 * Get account info
 */
export async function getAccount(
  networkId: SupportedNetworks,
  account: string,
  errorCallback: Function,
): Promise<{} | null> {
  const query = `
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
