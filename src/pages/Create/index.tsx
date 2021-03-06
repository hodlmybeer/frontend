import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { Container } from 'react-grid-system'
import { Button, useTheme, TextInput, Header, DropDown, EthIdenticon, Info, LoadingRing, Help } from '@aragon/ui'

import { Row, Col } from 'react-grid-system'
import moment from 'moment'

import defaultBarrel from '../../imgs/barrels/barrel.png'

import { Entry, EntryTitle } from '../../components/Entry'
import { tokens as tokensInConfig, ZERO_ADDR, getOfficialFeeRecipient } from '../../constants'
import { useConnectedWallet } from '../../contexts/wallet'
import { useFactory, useWhitelistedAssets } from '../../hooks'
import { ConfirmModal } from '../../components/ConfirmModal'

export function Create() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [txHash, setHash] = useState<undefined | string>(undefined)

  const theme = useTheme()

  const { networkId, web3 } = useConnectedWallet()

  const [isCreating, setIsCreating] = useState(false)

  const { assets: whitelistedTokens } = useWhitelistedAssets()

  const tokens = useMemo(() => {
    return tokensInConfig[networkId].filter(t => whitelistedTokens.includes(t.id.toLowerCase()))
  }, [whitelistedTokens, networkId])

  const { create } = useFactory()

  const [selectedIdx, setSelectedIdx] = useState(0)
  const [selectedBonusIdx, setSelectedBonusIdx] = useState(-1)

  const [expiry, setExpiry] = useState<number>(moment().add('years', 1).unix())
  const [lockingPeriodDays, setLockingDays] = useState<number>(30)

  const [feeRecipient, setFeeRecipient] = useState<string>(getOfficialFeeRecipient(networkId))

  const [penalty, setPenalty] = useState<number>(20)
  const [fee, setFee] = useState<number>(20)

  const [n, setN] = useState<number>(1)

  const errorMessage = useMemo(() => {
    if (fee > 100 || fee < 0) return 'Invalid fee percentage'
    if (penalty > 100 || penalty < 0) return 'Invalid penalty percentage'
    if (!web3.utils.isAddress(feeRecipient)) return 'Invalid fee recipient address'
    if (expiry - 86400 * lockingPeriodDays < moment().unix()) return 'Invalid expiry and locking window'
    return null
  }, [fee, penalty, web3, feeRecipient, expiry, lockingPeriodDays])

  const bonusTokenOptions = useMemo(() => {
    const copy = [...tokens]
    copy.splice(selectedIdx, 1)
    return copy
  }, [tokens, selectedIdx])

  const handleCreate = useCallback(async () => {
    setIsCreating(true)
    const bonusTokenAddress = selectedBonusIdx === -1 ? ZERO_ADDR : bonusTokenOptions[selectedBonusIdx].id
    try {
      const tx = await create(
        tokens[selectedIdx].id,
        new BigNumber(penalty * 10).integerValue().toString(),
        new BigNumber(lockingPeriodDays * 86400).integerValue().toString(),
        new BigNumber(expiry).integerValue().toString(),
        new BigNumber(fee * 10).integerValue().toString(),
        n.toString(),
        feeRecipient,
        bonusTokenAddress,
      )
      setIsSuccessModalOpen(true)
      setHash(tx.transactionHash)
    } finally {
      setIsCreating(false)
    }
  }, [
    tokens,
    create,
    selectedIdx,
    penalty,
    lockingPeriodDays,
    expiry,
    fee,
    n,
    feeRecipient,
    selectedBonusIdx,
    bonusTokenOptions,
  ])

  return (
    <Container>
      <Row
        style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Header primary={`Brew a new Barrel`} />
        <div style={{ color: theme.contentSecondary, paddingBottom: '2%' }}>
          Brew your own barrel with your favorite ingredients!
        </div>
        <div
          style={{
            paddingBottom: '3%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <img src={defaultBarrel} height={130} alt="default" />
        </div>
      </Row>
      <Row>
        <Col md={6} offset={{ md: 3 }}>
          <Entry>
            <EntryTitle uppercase={false}>Token</EntryTitle>
            <DropDown
              style={{ minWidth: 189 }}
              items={tokens.map(t => t.symbol)}
              selected={selectedIdx}
              onChange={idx => {
                setSelectedIdx(idx)
              }}
            />
          </Entry>
          <Entry>
            <EntryTitle uppercase={false}>Expiry</EntryTitle>
            <TextInput
              style={{ minWidth: 189 }}
              type="date"
              value={moment.utc(expiry * 1000).format('yyyy-MM-DD')}
              onChange={e => {
                const date = moment.utc(e.target.value)
                date.set({ hour: 8 })
                setExpiry(date.unix())
              }}
            />
          </Entry>
          <Entry>
            <div style={{ display: 'flex' }}>
              <EntryTitle uppercase={false}>Locking Window</EntryTitle>
              <Help hint="What is locking window?">
                Days before expiry that the barrel will be locked and no longer accept deposit.
              </Help>
            </div>

            <TextInput
              value={lockingPeriodDays}
              onChange={event => setLockingDays(event.target.value)}
              type="number"
              adornment={<span style={{ paddingLeft: 5, paddingRight: 5 }}> Days </span>}
              adornmentPosition="end"
            />
          </Entry>
          <Entry>
            <div style={{ display: 'flex' }}>
              <EntryTitle uppercase={false}>Fee Recipient</EntryTitle>
              <Help hint="What is fee Recipient?">Fee recipient is default to the common reward pool.</Help>
            </div>
            <div>
              <TextInput
                value={feeRecipient}
                onChange={event => setFeeRecipient(event.target.value)}
                adornment={<EthIdenticon address={feeRecipient} scale={1} radius={2} />}
                adornmentPosition="end"
              />
            </div>
          </Entry>
          <Entry>
            <EntryTitle uppercase={false}>Penalty</EntryTitle>
            <TextInput
              value={penalty}
              type="number"
              adornment={<span style={{ paddingLeft: 5, paddingRight: 5 }}> % </span>}
              adornmentPosition="end"
              onChange={event => setPenalty(event.target.value)}
            />
          </Entry>
          <Entry>
            <div style={{ display: 'flex' }}>
              <EntryTitle uppercase={false}>Fee</EntryTitle>
              <Help hint="When are fees charged?">
                The fee is charged from the penalty amount when someone quit. If everyone holds until the end, there
                will be no fees accrued.
              </Help>
            </div>

            <TextInput
              value={fee}
              type="number"
              adornment={<span style={{ paddingLeft: 5, paddingRight: 5 }}> % </span>}
              adornmentPosition="end"
              onChange={event => setFee(event.target.value)}
            />
          </Entry>
          <Entry>
            <div style={{ display: 'flex' }}>
              <EntryTitle uppercase={false}>Share Decreasing Coefficient (N)</EntryTitle>
              <Help hint="When is N">
                N indicates how fast the reward share drops as time goes by. If N = 1, it drops linearly. In other
                words, shares you get is proportional to (remaining time / total time ) ^ N
              </Help>
            </div>

            <TextInput
              value={n}
              type="number"
              adornment={<span style={{ paddingLeft: 5, paddingRight: 5 }}> </span>}
              adornmentPosition="end"
              onChange={event => setN(parseInt(event.target.value))}
            />
          </Entry>
          <Entry>
            <EntryTitle uppercase={false}>Bonus Token</EntryTitle>
            <DropDown
              style={{ minWidth: 189 }}
              items={bonusTokenOptions.map(t => t.symbol)}
              selected={selectedBonusIdx}
              onChange={idx => {
                setSelectedBonusIdx(idx)
              }}
              placeholder="None"
            />
          </Entry>
          {errorMessage && <Info mode="error"> {errorMessage} </Info>}
          <br />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Button style={{ minWidth: 200 }} onClick={handleCreate} mode="positive" disabled={errorMessage !== null}>
              {' '}
              {isCreating ? <LoadingRing /> : 'Create'}{' '}
            </Button>
          </div>
        </Col>
      </Row>
      <ConfirmModal
        open={isSuccessModalOpen}
        setOpen={setIsSuccessModalOpen}
        message={`Successfully created a new barrel!`}
        nextStep={'See barrels'}
        txHash={txHash}
        nextStepUrl={'/barrels'}
      />
    </Container>
  )
}

export default Create
