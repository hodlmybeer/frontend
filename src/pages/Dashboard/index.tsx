import React, { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { Container } from 'react-grid-system'
import { Header, DataView, TokenAmount, Timer, Button, ContextMenu, ContextMenuItem } from '@aragon/ui'

import Detail from './Detail'
import SectionTitle from '../../components/SectionHeader'
import { tokens } from '../../constants'
import { useConnectedWallet } from '../../contexts/wallet'

const fakeEntries = [
  {
    token: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // weth
    amount: '45000000000000000000', // 45
    pool: '0x0000000000000000000000000000000000000111', // pool address
  },
  {
    token: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
    amount: '1820283118922', // 1820283
    pool: '0x0000000000000000000000000000000000000112', // pool address
  },
]

function DashBoard() {
  const { networkId } = useConnectedWallet()

  const renderHodlingRow = useCallback(
    row => {
      const token = tokens[networkId].find(t => t.id === row.token)
      const endTimeMs = Date.now() + 86400 * 100 * 1000
      const tokenAmount = (
        <TokenAmount
          address={row.token}
          amount={row.amount}
          chainId={networkId}
          decimals={token?.decimals || 18}
          digits={4}
        />
      )

      const countDown = <Timer end={new Date(endTimeMs)} format="Md" />

      const rewardAmount = (
        <TokenAmount
          address={row.token}
          amount={new BigNumber(row.amount).div(100).toFixed(0)}
          chainId={networkId}
          decimals={token?.decimals || 18}
          digits={4}
        />
      )
      const poolName = `${token?.symbol} 6 Month 5%`

      return [tokenAmount, poolName, countDown, rewardAmount]
    },
    [networkId],
  )

  return (
    <Container>
      <Header primary="My Hodlings" />
      <SectionTitle title="Locked hodlings" />
      <DataView
        status={'default'}
        fields={['Asset', 'Pool', 'Hodl Until', 'Current Reward']}
        renderEntry={renderHodlingRow}
        renderEntryExpansion={row => {
          return (
            <Detail
            // row={tokens.row}
            />
          )
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
        entries={fakeEntries}
      />
    </Container>
  )
}

export default DashBoard
