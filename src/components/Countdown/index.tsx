import React, { useMemo } from 'react'
import { Timer } from '@aragon/ui'

export default function CountDownTimer({ expiry }: { expiry: number }) {
  const timeLeftInSec = useMemo(() => expiry - Date.now() / 1000, [expiry])

  const format = useMemo(
    () => (timeLeftInSec < 86400 ? 'hm' : timeLeftInSec < 86400 * 31 ? 'dhm' : 'Md'),
    [timeLeftInSec],
  )

  return <Timer format={format} end={new Date(expiry * 1000)} />
}
