import React from 'react'
import { Modal, useTheme, Button, TransactionBadge, LinkBase } from '@aragon/ui'
import { useHistory } from 'react-router-dom'
import { networkIdToExplorer } from '../../constants'
import { useConnectedWallet } from '../../contexts/wallet'

type ConfirmModalProps = {
  open: boolean
  setOpen: Function
  message: string
  nextStep: string
  nextStepUrl: string
  txHash?: string
}

export function ConfirmModal({ txHash, open, setOpen, message, nextStep, nextStepUrl }: ConfirmModalProps) {
  const theme = useTheme()
  const history = useHistory()
  const { networkId } = useConnectedWallet()

  return (
    <Modal visible={open} width={500} onClose={() => setOpen(false)}>
      <div style={{ padding: 20, paddingBottom: 40 }}>
        {/* center content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: 28 }}>Cheers!</div>
          <img alt="success" width={160} src={require('../../imgs/beers.png')}></img>

          <div style={{ fontSize: 18, paddingBottom: 4 }}>{message}</div>

          {/* tx hash */}
          {txHash && (
            <LinkBase
              style={{ fontSize: 15, color: theme.contentSecondary }}
              onClick={() => window.open(`${networkIdToExplorer[networkId]}/tx/${txHash}`, '_blank')}
            >
              View your transaction at <TransactionBadge transaction={txHash} disabled={true} />
            </LinkBase>
          )}

          <br />
        </div>

        {/* align right */}
        <div style={{ float: 'right' }}>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button mode="positive" onClick={() => history.push(nextStepUrl)}>
            {' '}
            {nextStep}{' '}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
