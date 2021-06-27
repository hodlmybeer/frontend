import React, { useMemo, useState, useRef } from 'react'
import { useAsyncMemo } from '../../hooks'
import { Box, Button, ContextMenu, ContextMenuItem, IconHeart, ProgressBar, useTheme, LinkBase, Tag } from '@aragon/ui'
import { Contract } from 'web3-eth-contract'
import DepositModal from './DepositModal'

import styled from 'styled-components'

import defaultBarrel from '../../imgs/barrels/barrel.png'
import emptyBarrel from '../../imgs/barrels/barrel-empty.png'

import { useConnectedWallet } from '../../contexts/wallet'
import { BarrelState, networkIdToAddressUrl, tagBackground, tagColor } from '../../constants'
import { hToken, Token } from '../../types'
import { toPoolName } from '../../utils/htoken'

import TokenAmountWithoutIcon from '../../components/TokenAmountWithoutIcon'
import { Entry, EntryTitle } from '../../components/Entry'
import CountDownTimer from '../../components/Countdown'
import DonationModal from './DonationModal'

type PoolCardProps = {
  hToken: hToken
  token: Token
  bonusToken: Contract | null
}

function PoolCard({ token, hToken, bonusToken }: PoolCardProps) {
  const nodeRef = useRef(null)
  const [depositModalOpened, setModalOpened] = useState(false)
  const [donateModalOpened, setDonationModalOpened] = useState(false)

  const theme = useTheme()

  const { networkId } = useConnectedWallet()

  const barrelImg = useMemo(() => {
    if (!token) return <img src={defaultBarrel} alt={'img'} height={130}></img>
    if (!token.img) return <img src={defaultBarrel} alt={'img'} height={130}></img>
    return getBarrelWithIcon(token.img)
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

  const bonusTokenDetail = useAsyncMemo(
    async () => {
      if (!bonusToken) return null

      const bonusTokenSymbol = await bonusToken.methods.symbol().call()
      const bonusTokenDecimals = await bonusToken.methods.decimals().call()
      return { symbol: bonusTokenSymbol, decimals: bonusTokenDecimals }
    },
    null,
    [bonusToken],
  )

  return (
    <Box
      nodeRef={nodeRef}
      heading={
        <Entry>
          <EntryTitle>
            <LinkBase external href={`${networkIdToAddressUrl[networkId]}/${hToken.id}`}>
              {' '}
              {poolTitle}{' '}
            </LinkBase>
          </EntryTitle>

          <div ref={nodeRef}>
            <ContextMenu>
              <ContextMenuItem onClick={() => setDonationModalOpened(true)}>
                <IconHeart /> Donate
              </ContextMenuItem>
            </ContextMenu>
          </div>
        </Entry>
      }
    >
      <DonationModal
        setOpen={setDonationModalOpened}
        visible={donateModalOpened}
        token={token}
        hToken={hToken}
        bonusTokenDetail={bonusTokenDetail}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 362,
        }}
      >
        {barrelImg}
        <div>
          {token.tags ? (
            token.tags.map(tag => (
              <Tag background={tagBackground[tag]} color={tagColor[tag]}>
                {' '}
                {tag}{' '}
              </Tag>
            ))
          ) : (
            <br />
          )}
        </div>
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
        <Entry>
          <EntryTitle>Total Bonus:</EntryTitle>
          {bonusToken ? (
            <TokenAmountWithoutIcon
              symbol={bonusTokenDetail?.symbol}
              amount={hToken.bonusTokenBalance}
              decimals={bonusTokenDetail?.decimals}
            />
          ) : (
            <div style={{ color: theme.contentSecondary, paddingLeft: 2 }}> {'-'} </div>
          )}
        </Entry>
        {/* expiry */}
        <Entry>
          <EntryTitle>Unlock In:</EntryTitle>
          <CountDownTimer expiry={hToken.expiry} />
        </Entry>
        <ProgressBar
          color={progressBarColor.toString()}
          value={(Date.now() / 1000 - hToken.createdAt) / (hToken.expiry - hToken.createdAt)}
        />
        <div style={{ padding: 10 }} />
        <Button wide onClick={() => setModalOpened(true)} disabled={state === BarrelState.Locked}>
          Deposit
        </Button>
      </div>

      <DepositModal open={depositModalOpened} onClose={() => setModalOpened(false)} hToken={hToken} />
    </Box>
  )
}

export default PoolCard

function getBarrelWithIcon(img: any) {
  return (
    <ImgContainer>
      <img height={130} src={emptyBarrel} alt="barrel"></img>
      <Icon src={img}></Icon>
    </ImgContainer>
  )
}

const ImgContainer = styled.div`
  position: relative;
`

const Icon = styled.img`
  z-index: 1;
  position: absolute;
  top: 53px;
  right: 51px;
  display: block;
  height: 40px;
`
