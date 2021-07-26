import BigNumber from 'bignumber.js'
import { SupportedNetworks, tokens, trustedCreators } from '../constants'
import { hToken } from '../types'

export function toPoolName(hToken: any, networkId: SupportedNetworks): string {
  const token = tokens[networkId].find(t => t.id.toLowerCase() === hToken.token)

  // don't know a name if the underlying token is not whitelisted in this fe repo.
  if (!token) return 'Unknown pool'

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

/**
 * @param {hToken} hToken pool hToken
 * @param {BigNumber} depositAmount new deposit amount to calculate the APY for
 * @returns {BigNumber} pool APY for given deposit amount
 */
export function getPoolApy(hToken: hToken, shares: BigNumber, depositAmount: BigNumber): BigNumber {
  const poolDuration = hToken.expiry - Date.now() / 1000
  const yearFraction = poolDuration / (365 * 24 * 60 * 60)
  const share = shares.div(new BigNumber(hToken.totalShares).plus(shares))
  console.log('poolDuration', poolDuration)
  console.log('yearFraction', yearFraction)
  console.log('shares', shares.toString())
  console.log('hToken.totalShares', hToken.totalShares)
  console.log('relative share', share.toString())
  console.log('depositAmount', depositAmount.toString())
  return new BigNumber(hToken.tokenBalance)
    .times(
      new BigNumber(
        ((hToken.penalty / 1000) *
          (1 - hToken.fee / 1000) *
          // *100 to express in %
          100) /
          // divide by pool remaining year fraction to get the APY
          yearFraction,
      ),
    )
    .times(share)
    .div(depositAmount)
}
