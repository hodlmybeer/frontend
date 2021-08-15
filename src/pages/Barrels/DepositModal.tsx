import React, { useMemo, useState, useCallback } from 'react'
import { Modal, Header, Help, Timer, useTheme, IconDown, IconClose, TextInput, LinkBase } from '@aragon/ui'
import BigNumber from 'bignumber.js'

import TokenAmountWithoutIcon from '../../components/TokenAmountWithoutIcon'
import { Entry, EntryTitle } from '../../components/Entry'

import { hToken } from '../../types'
import { useConnectedWallet } from '../../contexts/wallet'
import { useTokenBalance, usePool, useAsyncMemo } from '../../hooks'
import { fromTokenAmount } from '../../utils/math'
import TransferForm from '../../components/shared/TransferForm'
import { ConfirmModal } from '../../components/ConfirmModal'
import { getPoolApy } from '../../utils/htoken'

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
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [txHash, setHash] = useState<undefined | string>(undefined)

  const [isDepositing, setIsDepositing] = useState(false)

  const { user } = useConnectedWallet()

  const [showAdvancedOptions, setShowAdvance] = useState(false)

  const [recipient, setRecipient] = useState<string>(user)
  const theme = useTheme()

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

  const oneTokenDeposit = useMemo(() => fromTokenAmount(parseFloat('1'), underlyingDecimals), [underlyingDecimals])

  const sharesPerToken = useAsyncMemo(
    async () => {
      const shares = await calculateShares(oneTokenDeposit)
      return new BigNumber(shares)
    },
    new BigNumber(0),
    [oneTokenDeposit],
  )

  const sharePercentage = useMemo(() => {
    if (hToken.totalShares === '0') return '100'
    else return sharesToGet.div(new BigNumber(hToken.totalShares).plus(sharesToGet)).times(100).toFixed(2)
  }, [hToken, sharesToGet])

  const depositToPool = useCallback(async () => {
    setIsDepositing(true)
    try {
      const tx = await deposit(depositAmount, recipient)
      setHash(tx.transactionHash)
      setIsSuccessModalOpen(true)
    } finally {
      setIsDepositing(false)
    }
  }, [depositAmount, deposit, recipient])

  const coefficientHint = useMemo(
    () =>
      hToken.n === 0
        ? 'stable' // todo: revisit usage
        : hToken.n === 1
        ? 'linear'
        : 'exponential',
    [hToken],
  )

  const userEstimatedApy = useMemo(() => {
    return getPoolApy(
      hToken,
      depositAmount.gt(0) ? sharesToGet : sharesPerToken,
      depositAmount.gt(0) ? depositAmount : oneTokenDeposit,
    )
  }, [sharesToGet, hToken, depositAmount, sharesPerToken, oneTokenDeposit])

  return (
    <Modal padding={'7%'} visible={open} onClose={onClose}>
      <Header primary={`Lock up your ${underlyingSymbol}!`} />

      <div style={{ fontSize: 18 }}> Barrel Overview </div>
      <Entry>
        <EntryTitle uppercase={false}>
          <div style={{ display: 'flex' }}>
            <span style={{ paddingRight: 5 }}>{depositAmount.gt(0) ? 'APY' : 'Estimated APY'}</span>
            <Help hint="Additional info">The APY might change as more participants enter the pool</Help>
          </div>
        </EntryTitle>
        {userEstimatedApy.toFixed(3)}%
      </Entry>
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
            <span style={{ paddingRight: 5 }}>Early withdrawal penalty</span>
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

      {/* show advance option on the right */}
      <div style={{ paddingBottom: 10, paddingTop: 15 }}>
        {showAdvancedOptions ? (
          <Entry>
            <EntryTitle uppercase={false}> hToken Recipient </EntryTitle>
            <TextInput
              style={{ minWidth: 220 }}
              value={recipient}
              onChange={event => setRecipient(event.target.value)}
              adornment={
                <LinkBase
                  onClick={() => {
                    setShowAdvance(false)
                    setRecipient(user)
                  }}
                >
                  {' '}
                  <IconClose />
                </LinkBase>
              }
              adornmentPosition="end"
            />
          </Entry>
        ) : (
          <Entry>
            <div />
            <div onClick={() => setShowAdvance(true)} style={{ fontSize: 12, color: theme.contentSecondary }}>
              <div>
                {' '}
                Add recipient <IconDown size="tiny" />{' '}
              </div>
            </div>
          </Entry>
        )}
      </div>

      <TransferForm
        tokenAddress={hToken.token}
        tokenSymbol={underlyingSymbol}
        decimals={hToken.decimals}
        inputAmount={inputAmount}
        transferAmount={depositAmount}
        isDepositing={isDepositing}
        spenderAddress={hToken.id}
        onDepositClick={depositToPool}
        onInputChanged={value => setInputAmount(value)}
      />

      <ConfirmModal
        open={isSuccessModalOpen}
        setOpen={setIsSuccessModalOpen}
        message={`Successfully deposited ${inputAmount} ${underlyingSymbol}.`}
        nextStep={'See my holdings'}
        txHash={txHash}
        nextStepUrl={'/portfolio'}
      />
    </Modal>
  )
}

export default DepositModal
