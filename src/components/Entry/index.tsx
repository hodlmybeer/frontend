import React, { ReactChild } from 'react'
import { useTheme } from '@aragon/ui'

export function Entry({ children }: { children: ReactChild[] }) {
  return (
    <div
      style={{
        width: '100%',
        minHeight: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
    >
      {children}
    </div>
  )
}

export function EntryTitle({ children, uppercase = true }: { children: ReactChild; uppercase?: boolean }) {
  const theme = useTheme()
  return (
    <span
      style={{
        textTransform: uppercase ? 'uppercase' : 'none',
        color: theme.contentSecondary,
        fontSize: 14,
        fontWeight: 400,
        paddingRight: 5,
      }}
    >
      {children}
    </span>
  )
}
