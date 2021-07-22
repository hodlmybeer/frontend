import React, { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { Container } from 'react-grid-system'
import { useHistory } from 'react-router-dom'
import { DataView, TokenAmount, IdentityBadge, LinkBase, Info } from '@aragon/ui'

import HodlingExpanded from './HodlingExpanded'
import WithdrawButton from './WithdrawButton'

import SectionTitle from '../../components/SectionHeader'
import Header from '../../components/Header'
import CountDownTimer from '../../components/Countdown'
import { tokens, ZERO_ADDR } from '../../constants'
import { useConnectedWallet } from '../../contexts/wallet'
import { useAccountHodlings } from '../../hooks'
import { Hodling } from '../../types'
import { toPoolName } from '../../utils/htoken'
import { stateBeer } from '../../constants/dataviewState'
import { getPoolApy } from '../../utils/htoken'

function Dashboard() {
  const { networkId, user } = useConnectedWallet()

  const { hodlings, unlockedHodlings, isLoading } = useAccountHodlings(user)
  const history = useHistory()

  const renderHodlingRow = useCallback(
    (hodling: Hodling) => {
      const token = tokens[networkId].find(t => t.id.toLowerCase() === hodling.token.token)

      const bonusToken = tokens[networkId].find(t => t.id.toLowerCase() === hodling.token.bonusToken)

      const shareRatio =
        hodling.shareBalance === '0'
          ? new BigNumber(0)
          : new BigNumber(hodling.shareBalance).div(hodling.token.totalShares)
      const percentage = `${shareRatio.times(100).toFixed(2)}%`

      const reward = new BigNumber(hodling.token.totalReward).times(shareRatio)
      const bonus = new BigNumber(hodling.token.bonusTokenBalance).times(shareRatio)
      const tokenAmount = (
        <TokenAmount
          address={hodling.token.token}
          amount={hodling.balance}
          chainId={networkId}
          decimals={token?.decimals || 18}
          digits={4}
          symbol={token ? token.symbol : undefined}
          iconUrl={token ? token.img : undefined}
        />
      )
      const countDown = <CountDownTimer expiry={hodling.token.expiry} />

      const rewardAmount = (
        <TokenAmount
          address={hodling.token.token}
          amount={reward.toFixed(0)}
          chainId={networkId}
          decimals={token?.decimals || 18}
          digits={4}
          symbol={token ? token.symbol : undefined}
          iconUrl={token ? token.img : undefined}
        />
      )

      const bonusAmount =
        hodling.token.bonusToken === ZERO_ADDR ? (
          '-'
        ) : (
          <TokenAmount
            address={hodling.token.bonusToken}
            amount={bonus.toFixed(0)}
            chainId={networkId}
            decimals={bonusToken?.decimals || 18}
            digits={4}
            symbol={bonusToken ? bonusToken.symbol : undefined}
            iconUrl={bonusToken ? bonusToken.img : undefined}
          />
        )
      const barrelName = toPoolName(hodling.token, networkId)
      const badge = <IdentityBadge entity={hodling.token.id} customLabel={barrelName} />
      console.log(hodling.balance)
      const userEstimatedApy = getPoolApy(hodling.token, new BigNumber(hodling.balance))
      const apy = `${userEstimatedApy.toFixed(3)}%`
      return [tokenAmount, badge, countDown, percentage, rewardAmount, bonusAmount, apy]
    },
    [networkId],
  )

  const renderUnlockedHodlingRow = useCallback(
    (hodling: Hodling) => {
      const token = tokens[networkId].find(t => t.id.toLowerCase() === hodling.token.token)

      const shareRatio =
        hodling.shareBalance === '0'
          ? new BigNumber(0)
          : new BigNumber(hodling.shareBalance).div(hodling.token.totalShares)
      const percentage = `${shareRatio.times(100).toFixed(2)}%`

      const reward = new BigNumber(hodling.token.totalReward).times(shareRatio)

      const tokenAmount = (
        <TokenAmount
          address={hodling.token.token}
          amount={hodling.balance}
          chainId={networkId}
          decimals={token?.decimals || 18}
          digits={4}
          symbol={token ? token.symbol : undefined}
          iconUrl={token ? token.img : undefined}
        />
      )

      const rewardAmount = (
        <TokenAmount
          address={hodling.token.token}
          amount={reward.toFixed(0)}
          chainId={networkId}
          decimals={token?.decimals || 18}
          digits={4}
          symbol={token ? token.symbol : undefined}
          iconUrl={token ? token.img : undefined}
        />
      )
      const barrelName = toPoolName(hodling.token, networkId)
      const badge = <IdentityBadge entity={hodling.token.id} customLabel={barrelName} />
      const withdrawButtom = <WithdrawButton token={hodling.token} />

      return [tokenAmount, badge, percentage, rewardAmount, withdrawButtom]
    },
    [networkId],
  )

  return (
    <Container>
      <Header primary="My Hodlings" />
      <SectionTitle title="Locked hodlings" />
      {user ? (
        <div>
          <DataView
            status={isLoading ? 'loading' : 'default'}
            fields={['My deposit', 'Barrel id', 'Countdown', 'Reward Share', 'Reward', 'Bonus', 'APY']}
            renderEntry={renderHodlingRow}
            renderEntryExpansion={hodling => {
              return <HodlingExpanded hodling={hodling} />
            }}
            emptyState={stateBeer(
              'Not HODLing',
              <div>
                You are not hodling any coins. Take a look at{' '}
                <LinkBase onClick={() => history.push('barrels/')}>Barrels</LinkBase>
              </div>,
              'Loading...',
              "This wont't take too long",
            )}
            entries={hodlings}
          />
          {unlockedHodlings.length > 0 && (
            <div>
              <SectionTitle title="Unlocked hodlings" />
              <DataView
                status={isLoading ? 'loading' : 'default'}
                fields={['Asset', 'Barrel', 'Reward Share', 'Total Reward', '']}
                renderEntry={renderUnlockedHodlingRow}
                emptyState={stateBeer(null, null, 'Loading...', "This won't take too long")}
                entries={unlockedHodlings}
              />
            </div>
          )}
        </div>
      ) : (
        <Info> Please connect wallet first </Info>
      )}
    </Container>
  )
}

export default Dashboard
