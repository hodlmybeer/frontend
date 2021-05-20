import React from 'react'

import { useTheme, LinkBase } from '@aragon/ui'
import { toTokenAmount } from '../../utils/math'

export default function TokenAmountWithoutIcon({
  symbol,
  amount,
  decimals,
  onClick,
  reverse,
}: {
  symbol: string | any
  amount: string
  decimals: number
  onClick?: Function
  reverse?: boolean
}) {
  const theme = useTheme()
  const number = toTokenAmount(amount, decimals)
  const numebrStr = number.isInteger() ? number.toFixed() : number.toFormat(3)

  return (
    <LinkBase style={{ display: 'flex', flexDirection: reverse ? 'column-reverse' : 'normal' }} onClick={onClick}>
      <div> {numebrStr} </div>
      <div style={{ color: theme.contentSecondary, paddingLeft: 2 }}> {symbol} </div>
    </LinkBase>
  )
}
