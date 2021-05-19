import React, { useMemo, useState } from 'react'
import { Timer, Box, Button, ProgressBar, useTheme, LinkBase } from '@aragon/ui'
import DepositModal from './DepositModal'

import defaultBarrel from '../../imgs/barrels/barrel.png'
import usdcBarrel from '../../imgs/barrels/usdcBarrel.png'
import wethBarrel from '../../imgs/barrels/wethBarrel.png'
import wbtcBarrel from '../../imgs/barrels/wbtcBarrel.png'
import uniBarrel from '../../imgs/barrels/uniBarrel.png'

import { useConnectedWallet } from '../../contexts/wallet'
import { tokens, BarrelState, networkIdToAddressUrl } from '../../constants'
import { hToken } from '../../types'
import { toPoolName } from '../../utils/htoken'

import TokenAmountWithoutIcon from '../../components/TokenAmountWithoutIcon'
import { Entry, EntryTitle } from '../../components/Entry'

type PoolCardProps = {
  hToken: hToken
  // totalDepositors: number
}

function PoolCard({
  hToken,
}: // totalDepositors,
PoolCardProps) {
  const [depositModalOpened, setModalOpened] = useState(false)

  const theme = useTheme()

  const { networkId } = useConnectedWallet()

  const token = useMemo(() => tokens[networkId].find(t => t.id.toLowerCase() === hToken.token), [networkId, hToken])

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

  const poolTitle = useMemo(() => {
    return toPoolName(hToken, networkId)
  }, [hToken, networkId])

  const state: BarrelState = useMemo(() => {
    const now = Date.now() / 1000
    if (now > hToken.expiry) return BarrelState.Expired
    else if (now > hToken.expiry - hToken.lockWindow) return BarrelState.Locked
    else return BarrelState.Open
  }, [hToken.expiry, hToken.lockWindow])

  const progressBarColor = useMemo(() => {
    switch (state) {
      case BarrelState.Open:
        return theme.accent
      case BarrelState.Locked:
        return theme.hint
      case BarrelState.Expired:
        return theme.warning
    }
  }, [state, theme])

  return token ? (
    <Box
      heading={
        <LinkBase external href={`${networkIdToAddressUrl[networkId]}/${hToken.id}`}>
          {' '}
          {poolTitle}{' '}
        </LinkBase>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src={barrelImg} alt={'img'} height={150}></img>
        <br></br>

        <Entry>
          <EntryTitle>Penalty:</EntryTitle>
          {hToken.penalty / 10}%
        </Entry>

        <Entry>
          <EntryTitle>Total Locked:</EntryTitle>
          <TokenAmountWithoutIcon symbol={token.symbol} amount={hToken.tokenBalance} decimals={token.decimals} />
        </Entry>

        <Entry>
          <EntryTitle>Total Reward:</EntryTitle>
          <TokenAmountWithoutIcon symbol={token.symbol} amount={hToken.totalReward} decimals={token.decimals} />
        </Entry>

        {/* expiry */}
        <Entry>
          <EntryTitle>Unlock In:</EntryTitle>
          <Timer format="Md" end={new Date(hToken.expiry * 1000)} />
        </Entry>

        <ProgressBar
          color={progressBarColor.toString()}
          value={(Date.now() / 1000 - hToken.createdAt) / (hToken.expiry - hToken.createdAt)}
        />
        <br></br>
        <Button wide onClick={() => setModalOpened(true)}>
          Deposit
        </Button>
      </div>

      <DepositModal open={depositModalOpened} onClose={() => setModalOpened(false)} hToken={hToken} />
    </Box>
  ) : null
}

export default PoolCard
