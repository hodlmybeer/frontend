import { SupportedNetworks, tokens } from '../constants'

export function toPoolName(hToken: any, networkId: SupportedNetworks): string {
  const token = tokens[networkId].find(t => t.id.toLowerCase() === hToken.token)

  // dont' know a name if the underlying token is not whitelisted in this fe repo.
  if (!token) return 'Unkown pool'

  const penaltyPercentage = hToken.penalty / 10
  const expiry = new Date(hToken.expiry * 1000).toISOString().split('T')[0]

  return `${token.symbol} ${expiry} ${penaltyPercentage}%`
}
