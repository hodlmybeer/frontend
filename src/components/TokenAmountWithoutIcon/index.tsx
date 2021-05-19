import React from 'react'

import { useTheme } from '@aragon/ui'
import { toTokenAmount } from '../../utils/math'

export default function TokenAmountWithoutIcon({
  symbol,
  amount,
  decimals,
}: {
  symbol: string
  amount: string
  decimals: number
}) {
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
