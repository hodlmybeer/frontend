import React, { useMemo, ReactChild, useState, useCallback } from 'react'
import { Modal, TextInput, Button, useTheme, LinkBase, Header, Help, Timer } from '@aragon/ui'

import { useConnectedWallet } from '../../contexts/wallet'
import { toTokenAmount, fromTokenAmount } from '../../utils/math'
import { hToken } from '../../types'
import { useAllowance, useTokenBalance, usePool } from '../../hooks'
import useAsyncMemo from '../../hooks/useAsyncMemo'
import BigNumber from 'bignumber.js'
import Wanrinig from '../../components/Warning'

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
  const theme = useTheme()

  const { user } = useConnectedWallet()

  const { deposit, calculateShares } = usePool(hToken)

  // user input amount
  const [inputAmount, setInputAmount] = useState<number>(0)

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
    await deposit(depositAmount)
  }, [depositAmount, deposit])

  return (
    <Modal padding={'7%'} visible={open} onClose={onClose}>
      <Header primary={`Lock up your ${underlyingSymbol}!`} />

      <div style={{ fontSize: 18 }}> Pool Overview </div>
      <Entry>
        <EntryTitle uppercase={false}>Total Locked:</EntryTitle>
        <TokenAmountWithoutIcon symbol={underlyingSymbol} amount={hToken.tokenBalance} decimals={underlyingDecimals} />
      </Entry>
      <Entry>
        <EntryTitle uppercase={false}>Total Shares:</EntryTitle>
        <TokenAmountWithoutIcon symbol="shares" amount={hToken.totalShares} decimals={hToken.decimals} />
      </Entry>
      <Entry>
        <EntryTitle uppercase={false}>Unlock within</EntryTitle>
        <Timer format="Md" end={new Date(hToken.expiry * 1000)} />
      </Entry>
      <Entry>
        <EntryTitle uppercase={false}>Deposit Disabled within</EntryTitle>
        <Timer format="Md" end={new Date((hToken.expiry - hToken.lockWindow) * 1000)} />
      </Entry>

      <div style={{ fontSize: 18, paddingTop: 5 }}> Deposit Details </div>

      <Entry>
        <EntryTitle uppercase={false}>Shares to get:</EntryTitle>
        <TokenAmountWithoutIcon symbol={'shares'} amount={sharesToGet.toString()} decimals={underlyingDecimals} />
      </Entry>

      <Entry>
        <EntryTitle uppercase={false}>Shares percentage:</EntryTitle>
        <TokenAmountWithoutIcon symbol={'%'} amount={sharePercentage} decimals={0} />
      </Entry>

      <Entry>
        <EntryTitle uppercase={false}>
          <div style={{ display: 'flex' }}>
            hToken minted:
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
            if (event.target.value) setInputAmount(event.target.value)
          }}
          value={inputAmount}
        ></TextInput>
        {needApproval ? (
          <Button style={{ minWidth: 150 }} disabled={!hasEnoughBalance} onClick={approve}>
            {' '}
            Approve{' '}
          </Button>
        ) : (
          <Button style={{ minWidth: 150 }} mode="positive" onClick={depositToPool} diabled={!hasEnoughBalance}>
            {' '}
            Deposit{' '}
          </Button>
        )}
      </Entry>
      <Entry>
        <span style={{ fontSize: 12, color: theme.contentSecondary }}>
          Balance:{' '}
          <LinkBase
            onClick={() => {
              setInputAmount(userTokenBalance.toNumber())
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

function EntryTitle({ children, uppercase = true }: { children: ReactChild; uppercase?: boolean }) {
  const theme = useTheme()
  return (
    <span
      style={{
        textTransform: uppercase ? 'uppercase' : 'none',
        color: theme.contentSecondary,
        fontSize: 14,
        fontWeight: 400,
      }}
    >
      {children}
    </span>
  )
}

function TokenAmountWithoutIcon({ symbol, amount, decimals }: { symbol: string; amount: string; decimals: number }) {
  const theme = useTheme()
  const number = toTokenAmount(amount, decimals)
  const numebrStr = number.isInteger() ? number.toFixed() : number.toFormat(3)

  return (
    <div style={{ display: 'flex' }}>
      <div> {numebrStr} </div>
      <div style={{ color: theme.contentSecondary, paddingLeft: 2 }}> {symbol} </div>
    </div>
  )
}
