import React, { useMemo, useState, useCallback } from 'react'
import { Modal, Header, Help, Timer } from '@aragon/ui'
import BigNumber from 'bignumber.js'

import TokenAmountWithoutIcon from '../../components/TokenAmountWithoutIcon'
import { Entry, EntryTitle } from '../../components/Entry'

import { hToken } from '../../types'
import { useConnectedWallet } from '../../contexts/wallet'
import { useTokenBalance, usePool, useAsyncMemo } from '../../hooks'
import { fromTokenAmount } from '../../utils/math'
import TransferForm from '../../components/shared/TransferForm'

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
  const [isDepositing, setIsDepositing] = useState(false)

  const { user } = useConnectedWallet()
  const { deposit, calculateShares } = usePool(hToken)

  const { symbol: underlyingSymbol, decimals: underlyingDecimals } = useTokenBalance(hToken.token, user, 20)

  const [inputAmount, setInputAmount] = useState(0)
  const depositAmount = useMemo(
    () => fromTokenAmount(inputAmount, underlyingDecimals),
    [underlyingDecimals, inputAmount],
  )

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

  const coefficientHint = useMemo(
    () =>
      hToken.n === 0
        ? 'stable' // todo: revisit usage
        : hToken.n === 1
        ? 'linear'
        : 'exponential',
    [hToken],
  )

  return (
    <Modal padding={'7%'} visible={open} onClose={onClose}>
      <Header primary={`Lock up your ${underlyingSymbol}!`} />

      <div style={{ fontSize: 18 }}> Barrel Overview </div>
      <Entry>
        <EntryTitle uppercase={false}>Penalty</EntryTitle>
        <TokenAmountWithoutIcon symbol={'%'} amount={(hToken.penalty / 10).toString()} decimals={0} />
      </Entry>
      <Entry>
        <EntryTitle uppercase={false}>Total Locked</EntryTitle>
        <TokenAmountWithoutIcon symbol={underlyingSymbol} amount={hToken.tokenBalance} decimals={underlyingDecimals} />
      </Entry>
      <Entry>
        <EntryTitle uppercase={false}>Total Shares</EntryTitle>
        <TokenAmountWithoutIcon symbol="shares" amount={hToken.totalShares} decimals={hToken.decimals} />
      </Entry>
      <Entry>
        <EntryTitle uppercase={false}>Share decrease coefficient</EntryTitle>
        <TokenAmountWithoutIcon amount={hToken.n.toString()} symbol={`(${coefficientHint})`} decimals={0} />
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
      <TransferForm
        tokenAddress={hToken.token}
        tokenSymbol={hToken.symbol}
        decimals={hToken.decimals}
        isDepositing={isDepositing}
        spenderAddress={hToken.id}
        onDepositClick={depositToPool}
        onInputChanged={value => setInputAmount(value)}
      />
    </Modal>
  )
}

export default DepositModal
