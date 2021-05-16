import React, { useMemo, ReactChild } from 'react'
import { Timer, Box, Button, ProgressBar, useTheme, TokenAmount } from '@aragon/ui'
import defaultBarrel from '../../imgs/barrels/barrel.png'
import usdcBarrel from '../../imgs/barrels/usdcBarrel.png'
import wethBarrel from '../../imgs/barrels/wethBarrel.png'
import wbtcBarrel from '../../imgs/barrels/wbtcBarrel.png'
import uniBarrel from '../../imgs/barrels/uniBarrel.png'

import { useConnectedWallet } from '../../contexts/wallet'
import { tokens } from '../../constants'
type PoolCardProps = {
  expiry: number
  lockingWindow: number
  penalty: number
  tokenAddress: string
  tokenAmount: string
}

function PoolCard({ tokenAddress, tokenAmount, penalty, expiry }: PoolCardProps) {
  const theme = useTheme()

  const { networkId } = useConnectedWallet()

  const token = useMemo(() => tokens[networkId].find(t => t.id === tokenAddress), [networkId, tokenAddress])

  const barrelImg = useMemo(() => {
    return token
      ? token.symbol === 'WETH'
        ? wethBarrel
        : token.symbol === 'WBTC'
        ? wbtcBarrel
        : token.symbol === 'USDC'
        ? usdcBarrel
        : token.symbol === 'UNI'
        ? uniBarrel
        : defaultBarrel
      : defaultBarrel
  }, [token])

  return (
    <Box heading="title">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div>Penalty: {penalty / 10} %</div>

        <img src={barrelImg} alt={'img'} height={150}></img>
        <br></br>
        <Entry>
          <EntryTitle>Total Locked:</EntryTitle>
          <TokenAmount
            address={tokenAddress}
            amount={tokenAmount}
            chainId={networkId}
            decimals={token?.decimals || 18}
            digits={4}
          />
        </Entry>

        {/* expiry */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <EntryTitle>Unlock In:</EntryTitle>
          <Timer format="Md" end={new Date(expiry * 1000)} />
        </div>
        <ProgressBar
          css={`
            color: ${theme.accent};
          `}
          value={0.3}
        />
        <br></br>
        <Button wide>Deposit</Button>
      </div>
    </Box>
  )
}

/**
 * entry for each row
 */
function Entry({ children }: { children: ReactChild[] }) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
    >
      {children}
    </div>
  )
}

function EntryTitle({ children }: { children: ReactChild }) {
  const theme = useTheme()
  return (
    <span style={{ textTransform: 'uppercase', color: theme.contentSecondary, fontSize: 14, fontWeight: 400 }}>
      {children}
    </span>
  )
}

export default PoolCard
