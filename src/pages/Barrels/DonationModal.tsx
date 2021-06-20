import React, { useMemo, useState, useCallback } from 'react'
import { usePool } from '../../hooks'
import { fromTokenAmount } from '../../utils/math'
import { Checkbox, DropDown, Header, Info, Modal } from '@aragon/ui'

import { hToken, Token } from '../../types'

import TokenAmountWithoutIcon from '../../components/TokenAmountWithoutIcon'
import { Entry, EntryTitle } from '../../components/Entry'
import TransferForm from '../../components/shared/TransferForm'

type DonationModalProps = {
  token: Token
  hToken: hToken
  bonusTokenDetail: { symbol: string; decimals: number } | null
  setOpen: Function
  visible: boolean
}

function DonationModal({ token, hToken, bonusTokenDetail, visible, setOpen }: DonationModalProps) {
  const [isDepositing, setIsDepositing] = useState(false)
  const { donate } = usePool(hToken)
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [inputAmount, setInputAmount] = useState(0)
  const depositAmount = useMemo(() => {
    if (selectedIdx === 0) {
      return fromTokenAmount(inputAmount, token.decimals)
    } else {
      return fromTokenAmount(inputAmount, bonusTokenDetail?.decimals ?? 18)
    }
  }, [token.decimals, inputAmount, bonusTokenDetail, selectedIdx])
  const mainAmountAfterDonation = useMemo(
    () => depositAmount.plus(hToken.totalReward),
    [hToken.totalReward, depositAmount],
  )
  const bonusAmountAfterDonation = useMemo(
    () => depositAmount.plus(hToken.bonusTokenBalance),
    [hToken.bonusTokenBalance, depositAmount],
  )

  const donateToPool = useCallback(async () => {
    setIsDepositing(true)
    try {
      await donate(depositAmount, selectedIdx === 0 ? hToken.token : hToken.bonusToken)
    } finally {
      setIsDepositing(false)
    }
  }, [depositAmount, hToken, selectedIdx, donate])

  const [donationConsentReceived, setDonationConsentReceived] = useState(false)
  return (
    <Modal padding={'7%'} visible={visible} onClose={() => setOpen(false)} closeButton={false}>
      <Header primary={`Donate To The Pool`} />
      <Info mode="warning" title="Warning">
        By donating you agree to gratuitously reward the pool members. You understand that you won't be able to get your
        funds back and you won't get neither shares in the pool nor any other rewards.
        <br />
        <div style={{ display: 'flex' }}>
          <label style={{ marginLeft: 'auto', display: 'flex', alignItems: 'flex-end' }}>
            <h1 style={{ color: 'black' }}>I Understand</h1>
            <Checkbox checked={donationConsentReceived} onChange={checked => setDonationConsentReceived(checked)} />
          </label>
        </div>
      </Info>
      <br />

      <Entry>
        <EntryTitle uppercase={false}>Main Token Current Reward</EntryTitle>
        <TokenAmountWithoutIcon symbol={token.symbol} amount={hToken.totalReward} decimals={token.decimals} />
      </Entry>
      {selectedIdx === 0 && (
        <Entry>
          <EntryTitle uppercase={false}>Main Reward After Donation</EntryTitle>
          <TokenAmountWithoutIcon
            symbol={token.symbol}
            amount={mainAmountAfterDonation.toString()}
            decimals={token.decimals}
          />
        </Entry>
      )}
      {bonusTokenDetail != null && (
        <Entry>
          <EntryTitle uppercase={false}>Bonus Token Current Reward</EntryTitle>
          <TokenAmountWithoutIcon
            symbol={bonusTokenDetail.symbol}
            amount={hToken.bonusTokenBalance}
            decimals={bonusTokenDetail.decimals}
          />
        </Entry>
      )}
      {bonusTokenDetail !== null && selectedIdx === 1 && (
        <Entry>
          <EntryTitle uppercase={false}>Bonus Reward After Donation</EntryTitle>
          <TokenAmountWithoutIcon
            symbol={bonusTokenDetail.symbol}
            amount={bonusAmountAfterDonation.toString()}
            decimals={bonusTokenDetail.decimals}
          />
        </Entry>
      )}
      {bonusTokenDetail != null && (
        <Entry>
          <EntryTitle uppercase={false}>Token To Donate</EntryTitle>
          <DropDown
            items={[token.symbol, bonusTokenDetail?.symbol]}
            selected={selectedIdx}
            onChange={idx => {
              setSelectedIdx(idx)
              setOpen(true) // fix auto close modal error
            }}
          />
        </Entry>
      )}
      <TransferForm
        enabled={donationConsentReceived}
        tokenAddress={selectedIdx === 0 ? hToken.token : hToken.bonusToken}
        tokenSymbol={selectedIdx === 0 ? token.symbol : bonusTokenDetail?.symbol ?? ''}
        decimals={selectedIdx === 0 ? token.decimals : bonusTokenDetail?.decimals ?? 0}
        isDepositing={isDepositing}
        spenderAddress={hToken.id}
        onDepositClick={donateToPool}
        onInputChanged={value => setInputAmount(value)}
      />
    </Modal>
  )
}

export default DonationModal
