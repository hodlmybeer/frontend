import { SupportedNetworks, tokens, trustedCreators } from '../constants'
import { hToken } from '../types'

export function toPoolName(hToken: any, networkId: SupportedNetworks): string {
  const token = tokens[networkId].find(t => t.id.toLowerCase() === hToken.token)

  // dont' know a name if the underlying token is not whitelisted in this fe repo.
  if (!token) return 'Unkown pool'

  const penaltyPercentage = hToken.penalty / 10
  const expiry = new Date(hToken.expiry * 1000).toISOString().split('T')[0]

  return `${token.symbol} ${expiry} ${penaltyPercentage}%`
}

export function getSortHTokensFunction(officialFR: string) {
  return function (tokenA: hToken, tokenB: hToken) {
    return getRatingScore(tokenA, officialFR) > getRatingScore(tokenB, officialFR) ? -1 : 1 // high to low
  }
}

function getRatingScore(hToken: hToken, officialFR: string) {
  const depositorScore = hToken.hodlings.length * 10

  const creatorScore = trustedCreators.includes(hToken.creator) ? 100 : 0

  const feeRecipientScore = hToken.feeRecipient === officialFR.toLowerCase() ? 200 : 0

  return creatorScore + depositorScore + feeRecipientScore
}
