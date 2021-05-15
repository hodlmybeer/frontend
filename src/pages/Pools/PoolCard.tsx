import React, { useMemo } from 'react'
import { Timer, Box, Button, ProgressBar, useTheme, TokenAmount } from '@aragon/ui'
import Barrel from '../../imgs/barrel.png'
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

  return (
    <Box heading="title">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div>Penalty: {penalty / 10} %</div>

        <img src={Barrel} alt={'img'} height={150}></img>
        <br></br>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <span style={{ textTransform: 'uppercase', color: theme.contentSecondary, fontSize: 14, fontWeight: 400 }}>
            Total Locked:
          </span>
          <TokenAmount
            address={tokenAddress}
            amount={tokenAmount}
            chainId={networkId}
            decimals={token?.decimals || 18}
            digits={4}
          />
        </div>

        {/* expiry */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <span style={{ textTransform: 'uppercase', fontSize: 14, fontWeight: 400, color: theme.contentSecondary }}>
            unlock in:
          </span>
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

export default PoolCard
