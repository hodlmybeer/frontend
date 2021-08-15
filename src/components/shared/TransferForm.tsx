import React, { useMemo, useState, useCallback } from 'react'
import { TextInput, Button, useTheme, LinkBase, LoadingRing } from '@aragon/ui'
import BigNumber from 'bignumber.js'

import Warning from '../../components/Warning'
import { Entry } from '../../components/Entry'

import { useConnectedWallet } from '../../contexts/wallet'
import { useAllowance } from '../../hooks'
import { toTokenAmount, fromTokenAmount } from '../../utils/math'
import { mintTestnetToken } from '../../utils/others'
import { tokens } from '../../constants'
import { useNotify } from '../../hooks/useNotify'
import { useTokenBalance } from '../../hooks/useTokenBalance'

type TransferFormProps = {
  enabled: boolean | undefined
  tokenSymbol: string
  tokenAddress: string
  decimals: number
  inputAmount: number // text input amount
  transferAmount: BigNumber // scaled amount
  spenderAddress: string
  isDepositing: boolean
  onDepositClick: Function
  onInputChanged: Function
}

TransferForm.defaultProps = {
  enabled: true,
}

function TransferForm({
  enabled,
  tokenSymbol,
  tokenAddress,
  decimals,
  spenderAddress,
  isDepositing,
  onDepositClick,
  onInputChanged,
  transferAmount,
  inputAmount, // const [inputAmount, setInputAmount] = useState(0)
}: TransferFormProps) {
  const { user, web3, networkId } = useConnectedWallet()
  const { balance } = useTokenBalance(tokenAddress, user, 20)

  const theme = useTheme()
  const { notifyCallback } = useNotify()

  const [isApproving, setIsApproving] = useState(false)

  const { allowance, approve } = useAllowance(tokenAddress, spenderAddress)

  const needApproval = useMemo(() => transferAmount.gt(allowance), [transferAmount, allowance])

  const userTokenBalance = useMemo(() => toTokenAmount(balance, decimals), [balance, decimals])

  const hasEnoughBalance = useMemo(() => balance.gte(transferAmount) && balance.gt(0), [balance, transferAmount])

  const handleApprove = useCallback(async () => {
    setIsApproving(true)
    try {
      await approve(transferAmount)
    } finally {
      setIsApproving(false)
    }
  }, [transferAmount, approve])

  // for faucet
  const handleMintTestnetToken = useCallback(async () => {
    await mintTestnetToken(web3, tokenAddress, fromTokenAmount(100, decimals), user, notifyCallback)
  }, [web3, tokenAddress, decimals, user, notifyCallback])

  const faucetToken = useMemo(() => {
    return tokens[networkId].find(t => t.id.toLowerCase() === tokenAddress)
  }, [tokenAddress, networkId])

  return (
    <div>
      <Entry>
        <TextInput
          wide
          type="number"
          onChange={event => {
            const num = parseFloat(event.target.value)
            if (num > 0) onInputChanged(num)
            else onInputChanged(0)
          }}
          value={inputAmount}
          disabled={!(enabled ?? true)}
        />
        {needApproval ? (
          <Button style={{ minWidth: 150 }} disabled={!hasEnoughBalance || isApproving} onClick={handleApprove}>
            {isApproving ? <LoadingRing /> : 'Approve'}
          </Button>
        ) : (
          <Button
            style={{ minWidth: 150 }}
            mode="positive"
            onClick={onDepositClick}
            disabled={!hasEnoughBalance || isDepositing || !(enabled ?? true) || inputAmount === 0}
          >
            {isDepositing ? <LoadingRing /> : !user ? 'Disconnected' : 'Deposit'}
          </Button>
        )}
      </Entry>
      <Entry>
        <span style={{ fontSize: 12, color: theme.contentSecondary }}>
          Balance:{' '}
          <LinkBase onClick={() => onInputChanged(userTokenBalance)}>
            {userTokenBalance.toFixed(4)} {tokenSymbol}
          </LinkBase>
        </span>
        <div>
          <Warning show={!user || !hasEnoughBalance} text={!user ? 'Please connect wallet' : 'Insufficient Balance'} />
        </div>
      </Entry>
      {faucetToken && faucetToken.mintable && (
        <Button size="small" onClick={handleMintTestnetToken}>
          Get Testnet {tokenSymbol}
        </Button>
      )}
    </div>
  )
}

export default TransferForm
