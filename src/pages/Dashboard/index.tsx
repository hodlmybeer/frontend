import React, { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { Container } from 'react-grid-system'
import { Header, DataView, TokenAmount, Timer, Button, ContextMenu, ContextMenuItem, IdentityBadge } from '@aragon/ui'

import Detail from './Detail'
import SectionTitle from '../../components/SectionHeader'
import { tokens } from '../../constants'
import { useConnectedWallet } from '../../contexts/wallet'
import { useAccountHodlings } from '../../hooks'
import { Hodling } from '../../types'
import { toPoolName } from '../../utils/htoken'

function DashBoard() {
  const { networkId, user } = useConnectedWallet()

  const { hodlings } = useAccountHodlings(user)

  const renderHodlingRow = useCallback(
    (hodling: Hodling) => {
      const token = tokens[networkId].find(t => t.id.toLowerCase() === hodling.token.token)
      const endTimeMs = Date.now() + 86400 * 100 * 1000

      const shareRatio =
        hodling.shareBalance === '0'
          ? new BigNumber(0)
          : new BigNumber(hodling.shareBalance).div(hodling.token.totalShares)
      const percentage = `${shareRatio.times(100).toFixed()}%`

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

      const countDown = <Timer end={new Date(endTimeMs)} format="Md" />

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
      const poolName = toPoolName(hodling.token, networkId)
      const badge = <IdentityBadge entity={hodling.token.id} customLabel={poolName} />
      return [tokenAmount, badge, countDown, percentage, rewardAmount]
    },
    [networkId],
  )

  return (
    <Container>
      <Header primary="My Hodlings" />
      <SectionTitle title="Locked hodlings" />
      <DataView
        status={'default'}
        fields={['Asset', 'Pool', 'Countdown', 'Reward Share', 'Current Reward']}
        renderEntry={renderHodlingRow}
        renderEntryExpansion={row => {
          return <Detail />
        }}
        renderEntryActions={(row, index) => {
          return (
            <ContextMenu>
              <ContextMenuItem>
                <Button wide mode="positive" size="small">
                  Redeem
                </Button>
              </ContextMenuItem>
              <ContextMenuItem>
                <Button wide mode="negative" size="small">
                  Quit
                </Button>
              </ContextMenuItem>
            </ContextMenu>
          )
        }}
        entries={hodlings}
      />
    </Container>
  )
}

export default DashBoard
