import React, { useMemo, ReactChild } from 'react'
import { Timer, Box, Button, ProgressBar, useTheme } from '@aragon/ui'
import defaultBarrel from '../../imgs/barrels/barrel.png'
import usdcBarrel from '../../imgs/barrels/usdcBarrel.png'
import wethBarrel from '../../imgs/barrels/wethBarrel.png'
import wbtcBarrel from '../../imgs/barrels/wbtcBarrel.png'
import uniBarrel from '../../imgs/barrels/uniBarrel.png'

import { useConnectedWallet } from '../../contexts/wallet'
import { tokens } from '../../constants'
import { toTokenAmount } from '../../utils/math'

type PoolCardProps = {
  startTimestamp: number
  expiry: number
  lockingWindow: number
  penalty: number
  totalReward: string
  tokenAddress: string
  tokenAmount: string
  // totalDepositors: number
}

function PoolCard({
  tokenAddress,
  tokenAmount,
  totalReward,
  penalty,
  expiry,
  startTimestamp,
}: // totalDepositors,
PoolCardProps) {
  const theme = useTheme()

  const { networkId } = useConnectedWallet()

  const token = useMemo(
    () => tokens[networkId].find(t => t.id.toLowerCase() === tokenAddress),
    [networkId, tokenAddress],
  )

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

  return token ? (
    <Box heading="title">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src={barrelImg} alt={'img'} height={150}></img>
        <br></br>

        <Entry>
          <EntryTitle>Penalty:</EntryTitle>
          {penalty / 10}%
        </Entry>

        {/* <Entry>
          <EntryTitle>Depositors:</EntryTitle>
          {totalDepositors}
        </Entry> */}

        <Entry>
          <EntryTitle>Total Locked:</EntryTitle>
          <TokenAmountWithoutIcon symbol={token.symbol} amount={tokenAmount} decimals={token.decimals} />
        </Entry>

        <Entry>
          <EntryTitle>Total Reward:</EntryTitle>
          <TokenAmountWithoutIcon symbol={token.symbol} amount={totalReward} decimals={token.decimals} />
        </Entry>

        {/* expiry */}
        <Entry>
          <EntryTitle>Unlock In:</EntryTitle>
          <Timer format="Md" end={new Date(expiry * 1000)} />
        </Entry>

        <ProgressBar
          css={`
            color: ${theme.accent};
          `}
          value={(Date.now() / 1000 - startTimestamp) / (expiry - startTimestamp)}
        />
        <br></br>
        <Button wide>Deposit</Button>
      </div>
    </Box>
  ) : null
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

function TokenAmountWithoutIcon({ symbol, amount, decimals }: { symbol: string; amount: string; decimals: number }) {
  const theme = useTheme()

  return (
    <div style={{ display: 'flex' }}>
      <div> {toTokenAmount(amount, decimals).toFormat()} </div>
      <div style={{ color: theme.contentSecondary }}> {symbol} </div>
    </div>
  )
}

export default PoolCard
