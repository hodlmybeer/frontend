import React, { useMemo, useState, useEffect, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { Box, Button, useTheme, Modal, TextInput, Header, DropDown, EthIdenticon, Info, LoadingRing } from '@aragon/ui'
import moment from 'moment'

import defaultBarrel from '../../imgs/barrels/barrel.png'

import { Entry, EntryTitle } from '../../components/Entry'
import { tokens } from '../../constants'
import { useConnectedWallet } from '../../contexts/wallet'
import { useFactory } from '../../hooks'

function CreateButton() {
  const [createModalOpened, setCreateModalOpened] = useState(false)
  const theme = useTheme()

  return (
    <div>
      <Box
        heading="Create"
        style={{
          backgroundColor: theme.surfaceUnder,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: 334,
          }}
        >
          <img src={defaultBarrel} height={150} alt="default" />
          Can't find what you're looking for? Brew your own barrel with your fav ingredients!
          <Button wide onClick={() => setCreateModalOpened(true)}>
            {' '}
            Create{' '}
          </Button>
        </div>
      </Box>
      <CreateModal setOpen={setCreateModalOpened} visible={createModalOpened} />
    </div>
  )
}

export function CreateModal({ visible, setOpen }: { setOpen: Function; visible: boolean }) {
  const { networkId, user, web3 } = useConnectedWallet()

  const [isCreating, setIsCreating] = useState(false)

  const { create } = useFactory()

  // const [token, setToken] = useState<Token>(tokens[networkId][0])
  const [selectedIdx, setSelectedIdx] = useState(0)

  const [expiry, setExpiry] = useState<number>(moment().add('years', 1).unix())
  const [lockingPeriodDays, setLockingDays] = useState<number>(30)

  const [feeRecipient, setFeeRecipient] = useState<string>(user)

  const [penalty, setPenalty] = useState<number>(20)
  const [fee, setFee] = useState<number>(20)

  const [n, setN] = useState<number>(1)

  // set default fee recipient
  useEffect(() => {
    if (user !== '') setFeeRecipient(user)
  }, [user])

  const errorMessage = useMemo(() => {
    if (fee > 100 || fee < 0) return 'Invalid fee percentage'
    if (penalty > 100 || penalty < 0) return 'Invalid penalty percentage'
    if (!web3.utils.isAddress(feeRecipient)) return 'Invalid fee reciepient address'
    if (expiry - 86400 * lockingPeriodDays < moment().unix()) return 'Invalid expiry and locking window'
    return null
  }, [fee, penalty, web3, feeRecipient, expiry, lockingPeriodDays])

  const handleCreate = useCallback(async () => {
    setIsCreating(true)
    try {
      await create(
        tokens[networkId][selectedIdx].id,
        new BigNumber(penalty * 10).integerValue().toString(),
        new BigNumber(lockingPeriodDays).integerValue().toString(),
        new BigNumber(expiry).integerValue().toString(),
        new BigNumber(fee * 10).integerValue().toString(),
        n.toString(),
        feeRecipient,
      )
    } finally {
      setIsCreating(false)
    }
  }, [create, selectedIdx, penalty, lockingPeriodDays, expiry, fee, n, feeRecipient, networkId])

  return (
    <Modal padding={'7%'} visible={visible} onClose={() => setOpen(false)} closeButton={false}>
      <Header primary={`Brew a new Barrel`} />
      <Entry>
        <EntryTitle uppercase={false}>Token</EntryTitle>
        <DropDown
          items={tokens[networkId].map(t => t.symbol)}
          selected={selectedIdx}
          onChange={idx => {
            setSelectedIdx(idx)
            setOpen(true) // fix auto close modal error
          }}
        />
      </Entry>
      <Entry>
        <EntryTitle uppercase={false}>Expiry</EntryTitle>
        <TextInput
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
        <EntryTitle uppercase={false}>Locking Window</EntryTitle>
        <TextInput
          value={lockingPeriodDays}
          onChange={event => setLockingDays(event.target.value)}
          type="number"
          adornment={<span style={{ paddingLeft: 5, paddingRight: 5 }}> Days </span>}
          adornmentPosition="end"
        />
      </Entry>
      <Entry>
        <EntryTitle uppercase={false}>Fee Recipient</EntryTitle>
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
        <EntryTitle uppercase={false}>Fee</EntryTitle>
        <TextInput
          value={fee}
          type="number"
          adornment={<span style={{ paddingLeft: 5, paddingRight: 5 }}> % </span>}
          adornmentPosition="end"
          onChange={event => setFee(event.target.value)}
        />
      </Entry>
      <Entry>
        <EntryTitle uppercase={false}>Share Decreasing Coefficient (N)</EntryTitle>
        <TextInput
          value={n}
          type="number"
          adornment={<span style={{ paddingLeft: 5, paddingRight: 5 }}> </span>}
          adornmentPosition="end"
          onChange={event => setN(parseInt(event.target.value))}
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
    </Modal>
  )
}

export default CreateButton
