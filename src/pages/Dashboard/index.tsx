import React, { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { Container } from 'react-grid-system'
import { useHistory } from 'react-router-dom'
import { DataView, TokenAmount, IdentityBadge, LinkBase, Info } from '@aragon/ui'

import Detail from './Detail'
import SectionTitle from '../../components/SectionHeader'
import Header from '../../components/Header'
import CountDownTimer from '../../components/Countdown'
import { tokens } from '../../constants'
import { useConnectedWallet } from '../../contexts/wallet'
import { useAccountHodlings } from '../../hooks'
import { Hodling } from '../../types'
import { toPoolName } from '../../utils/htoken'
import { stateBeer } from '../../constants/dataviewState'

function DashBoard() {
  const { networkId, user } = useConnectedWallet()

  const { hodlings, isLoading } = useAccountHodlings(user)
  const history = useHistory()
  const renderHodlingRow = useCallback(
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
      const barrelName = toPoolName(hodling.token, networkId)
      const badge = <IdentityBadge entity={hodling.token.id} customLabel={barrelName} />
      return [tokenAmount, badge, countDown, percentage, rewardAmount]
    },
    [networkId],
  )

  return (
    <Container>
      <Header primary="My Hodlings" />
      <SectionTitle title="Locked hodlings" />
      {user ? (
        <DataView
          status={isLoading ? 'loading' : 'default'}
          fields={['Asset', 'Barrel', 'Countdown', 'Reward Share', 'Current Reward']}
          renderEntry={renderHodlingRow}
          renderEntryExpansion={hodling => {
            return <Detail hodling={hodling} />
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
      ) : (
        <Info> Please connect wallet first </Info>
      )}
    </Container>
  )
}

export default DashBoard
