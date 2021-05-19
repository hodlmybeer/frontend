import React from 'react'

import { useTheme, LinkBase } from '@aragon/ui'
import { toTokenAmount } from '../../utils/math'

export default function TokenAmountWithoutIcon({
  symbol,
  amount,
  decimals,
  onClick,
}: {
  symbol: string
  amount: string
  decimals: number
  onClick?: Function
}) {
  const theme = useTheme()
  const number = toTokenAmount(amount, decimals)
  const numebrStr = number.isInteger() ? number.toFixed() : number.toFormat(3)

  return (
    <LinkBase style={{ display: 'flex' }} onClick={onClick}>
      <div> {numebrStr} </div>
      <div style={{ color: theme.contentSecondary, paddingLeft: 2 }}> {symbol} </div>
    </LinkBase>
  )
}
