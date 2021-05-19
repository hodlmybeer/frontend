import React, { useMemo, useState, useCallback } from 'react'
import { Modal, TextInput, Button, useTheme, LinkBase, Header, Help, Timer, LoadingRing } from '@aragon/ui'

import { useConnectedWallet } from '../../contexts/wallet'
import { toTokenAmount, fromTokenAmount } from '../../utils/math'
import { hToken } from '../../types'
import { useAllowance, useTokenBalance, usePool } from '../../hooks'
import useAsyncMemo from '../../hooks/useAsyncMemo'
import BigNumber from 'bignumber.js'
import Wanrinig from '../../components/Warning'
import TokenAmountWithoutIcon from '../../components/TokenAmountWithoutIcon'
import { Entry, EntryTitle } from '../../components/Entry'

type DepositModalProps = {
  hToken: hToken
  open: boolean
  onClose: Function
}

function DepositModal({
  open,
  onClose,
  hToken,
}: // totalDepositors,
DepositModalProps) {
  const [isApproving, setIsApproving] = useState(false)
  const [isDepositing, setIsDepositing] = useState(false)

  const theme = useTheme()

  const { user } = useConnectedWallet()

  const { deposit, calculateShares } = usePool(hToken)

  // user input amount
  const [inputAmount, setInputAmount] = useState<BigNumber>(new BigNumber(0))

  const { allowance, approve } = useAllowance(hToken.token, hToken.id)

  const { balance, symbol: underlyingSymbol, decimals: underlyingDecimals } = useTokenBalance(hToken.token, user, 20)

  const depositAmount = useMemo(
    () => fromTokenAmount(inputAmount, underlyingDecimals),
    [underlyingDecimals, inputAmount],
  )

  const needApproval = useMemo(() => depositAmount.gt(allowance), [depositAmount, allowance])

  const userTokenBalance = useMemo(() => toTokenAmount(balance, underlyingDecimals), [balance, underlyingDecimals])

  const hasEnoughBalance = useMemo(() => balance.gte(depositAmount), [balance, depositAmount])

  const sharesToGet = useAsyncMemo(
    async () => {
      const shares = await calculateShares(depositAmount)
      return new BigNumber(shares)
    },
    new BigNumber(0),
    [depositAmount],
  )

  const sharePercentage = useMemo(() => {
    if (hToken.totalShares === '0') return '100'
    else return sharesToGet.div(new BigNumber(hToken.totalShares).plus(sharesToGet)).times(100).toFixed(2)
  }, [hToken, sharesToGet])

  const depositToPool = useCallback(async () => {
    setIsDepositing(true)
    try {
      await deposit(depositAmount)
    } finally {
      setIsDepositing(false)
    }
  }, [depositAmount, deposit])

  const handleApprove = useCallback(async () => {
    setIsApproving(true)
    try {
      await approve(depositAmount)
    } finally {
      setIsApproving(false)
    }
  }, [depositAmount, approve])

  return (
    <Modal padding={'7%'} visible={open} onClose={onClose}>
      <Header primary={`Lock up your ${underlyingSymbol}!`} />

      <div style={{ fontSize: 18 }}> Pool Overview </div>
      <Entry>
        <EntryTitle uppercase={false}>Total Locked</EntryTitle>
        <TokenAmountWithoutIcon symbol={underlyingSymbol} amount={hToken.tokenBalance} decimals={underlyingDecimals} />
      </Entry>
      <Entry>
        <EntryTitle uppercase={false}>Total Shares</EntryTitle>
        <TokenAmountWithoutIcon symbol="shares" amount={hToken.totalShares} decimals={hToken.decimals} />
      </Entry>
      <Entry>
        <EntryTitle uppercase={false}>Unlock in</EntryTitle>
        <Timer format="Md" end={new Date(hToken.expiry * 1000)} />
      </Entry>
      <Entry>
        <EntryTitle uppercase={false}>Deposit Disabled in</EntryTitle>
        <Timer format="Md" end={new Date((hToken.expiry - hToken.lockWindow) * 1000)} />
      </Entry>

      <div style={{ fontSize: 18, paddingTop: 5 }}> Deposit Details </div>

      <Entry>
        <EntryTitle uppercase={false}>
          <div style={{ display: 'flex' }}>
            <span style={{ paddingRight: 5 }}>Shares to get</span>
            <Help hint="What are shares">
              You can use the shares to redeem rewards from the pool if others quit before you do. The earlier you
              deposit, the more shares you get.
            </Help>
          </div>
        </EntryTitle>
        <TokenAmountWithoutIcon symbol={'shares'} amount={sharesToGet.toString()} decimals={underlyingDecimals} />
      </Entry>

      <Entry>
        <EntryTitle uppercase={false}>Shares percentage</EntryTitle>
        <TokenAmountWithoutIcon symbol={'%'} amount={sharePercentage} decimals={0} />
      </Entry>

      <Entry>
        <EntryTitle uppercase={false}>
          <div style={{ display: 'flex' }}>
            <span style={{ paddingRight: 5 }}>Early withdraw penalty</span>
            <Help hint="What is penalty">
              {' '}
              If you withdraw your {underlyingSymbol} before expiry, you will get penalized.
            </Help>
          </div>
        </EntryTitle>
        <TokenAmountWithoutIcon
          symbol={underlyingSymbol}
          amount={depositAmount.times(hToken.penalty / 1000).toString()}
          decimals={underlyingDecimals}
        />
      </Entry>

      <Entry>
        <EntryTitle uppercase={false}>
          <div style={{ display: 'flex' }}>
            <span style={{ paddingRight: 5 }}> hToken minted </span>
            <Help hint="What is hToken">
              {' '}
              After you lockup your {underlyingSymbol}, you will get {hToken.symbol} in return. This is a{' '}
              <b> non-transferable </b> ERC20 token.{' '}
            </Help>
          </div>
        </EntryTitle>
        <TokenAmountWithoutIcon symbol={hToken.symbol} amount={depositAmount.toString()} decimals={hToken.decimals} />
      </Entry>

      <br></br>
      <Entry>
        <TextInput
          wide
          type="number"
          onChange={event => {
            if (event.target.value) setInputAmount(new BigNumber(event.target.value))
          }}
          value={inputAmount}
        ></TextInput>
        {needApproval ? (
          <Button style={{ minWidth: 150 }} disabled={!hasEnoughBalance || isApproving} onClick={handleApprove}>
            {isApproving ? <LoadingRing /> : 'Approve'}
          </Button>
        ) : (
          <Button
            style={{ minWidth: 150 }}
            mode="positive"
            onClick={depositToPool}
            disabled={!hasEnoughBalance || isDepositing}
          >
            {isDepositing ? <LoadingRing /> : 'Deposit'}
          </Button>
        )}
      </Entry>
      <Entry>
        <span style={{ fontSize: 12, color: theme.contentSecondary }}>
          Balance:{' '}
          <LinkBase
            onClick={() => {
              setInputAmount(userTokenBalance)
            }}
          >
            {userTokenBalance.toString()} {underlyingSymbol}
          </LinkBase>
        </span>
        <div>
          <Wanrinig show={!hasEnoughBalance} text="Insufficient Balance" />
        </div>
      </Entry>
    </Modal>
  )
}

export default DepositModal
