import React, { useState, useCallback } from 'react'
import { Button, LoadingRing } from '@aragon/ui'
import { hToken } from '../../types'
import { usePool } from '../../hooks'

export default function WithdrawButton({ token }: { token: hToken }) {
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  const { withdrawAll } = usePool(token)

  const handleClick = useCallback(async () => {
    setIsWithdrawing(true)
    try {
      await withdrawAll()
    } finally {
      setIsWithdrawing(false)
    }
  }, [withdrawAll])

  return (
    <Button mode="positive" onClick={handleClick}>
      {isWithdrawing ? <LoadingRing /> : 'Withdraw'}{' '}
    </Button>
  )
}
