import React from 'react'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

import { Box, useTheme, Button } from '@aragon/ui'
import { Token } from '../../types'
import { useAsyncMemo } from '../../hooks'
import { Entry } from '../../components/Entry'
import SectionTitle from '../../components/SectionHeader'

type CardProps = {
  token: Token
}
export default function Card({ token }: CardProps) {
  const theme = useTheme()
  const history = useHistory()
  const { oneMonth, sixMonths, oneYear, current } = useAsyncMemo(
    async () => {
      return await getHistoricalPrice(token.coingeckId as string)
    },
    {
      oneMonth: 0,
      sixMonths: 0,
      oneYear: 0,
      current: 0,
    },
    [token],
  )

  return (
    <Box heading={token.symbol}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src={token.img} height={80} alt={'token'} />

        {current === 0 ? (
          <SectionTitle title={`Loading ${token.symbol} price...`} />
        ) : (
          <SectionTitle title={`Trading at  $${current.toFixed(2)}`} />
        )}
        <Entry>
          <SectionTitle title={`Holding Gain:`} />
          <div />
        </Entry>

        <Entry>
          <div> 1 Month </div>
          {getPercentage(current, oneMonth, theme.positive, theme.negative)}
        </Entry>
        <Entry>
          <div> 6 Months </div>
          {getPercentage(current, sixMonths, theme.positive, theme.negative)}
        </Entry>
        <Entry>
          <div> 1 Year </div>
          {getPercentage(current, oneYear, theme.positive, theme.negative)}
        </Entry>
        <br />
        <Button wide onClick={() => history.push(`/barrels?token=${token.symbol}`)}>
          {' '}
          Hodl {token.symbol}!{' '}
        </Button>
      </div>
    </Box>
  )
}

function getPercentage(current: number, historical: number | undefined, green: string, red: string) {
  if (!historical) return <div> - </div>
  if (current > historical) {
    const ratio = ((current / historical - 1) * 100).toFixed(2)
    return <div style={{ color: green }}> {ratio}% </div>
  } else {
    const ratio = ((1 - current / historical) * 100).toFixed(2)
    return <div style={{ color: red }}> -{ratio}% </div>
  }
}

/**
 *
 * @param id
 */
async function getHistoricalPrice(id: string) {
  const oneMonth = moment().subtract('months', 1).format('DD-MM-YYYY')
  const sixMonths = moment().subtract('months', 6).format('DD-MM-YYYY')
  const oneYear = moment().subtract('years', 1).format('DD-MM-YYYY')

  return {
    current: await getCurrentPrice(id),
    oneMonth: await getPriceAtDate(id, oneMonth),
    sixMonths: await getPriceAtDate(id, sixMonths),
    oneYear: await getPriceAtDate(id, oneYear),
  }
}

async function getCurrentPrice(id: string): Promise<number> {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
  return (await (await fetch(url)).json())[id].usd
}

async function getPriceAtDate(id: string, date: string): Promise<number | undefined> {
  const url = `https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}&localization=en`
  const res = (await (await fetch(url)).json()).market_data
  if (res === undefined) return undefined
  return res.current_price.usd
}
