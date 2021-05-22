import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { Bar, LinkBase, ContextMenu, ContextMenuItem } from '@aragon/ui'
import ConnectButton from './ConnectButton'
import Settings from './SettingsButton'

import logo from '../../imgs/beer.png'
import { useBreakpoint } from '../../hooks'
import { BreakPoints } from '../../constants'

function MyBar() {
  const history = useHistory()
  const breakPoint = useBreakpoint()

  const homeButtom = useMemo(() => {
    return (
      <LinkBase
        onClick={() => {
          history.push('/')
        }}
      >
        <img src={logo} alt="logo" height="50" />
      </LinkBase>
    )
  }, [history])

  const dashboardButtom = useMemo(() => {
    return (
      <LinkBase
        style={{ padding: 5, fontSize: 20, fontFamily: 'Recursive' }}
        onClick={() => {
          history.push('/dashboard')
        }}
      >
        Dashboard
      </LinkBase>
    )
  }, [history])

  const barrelsButtom = useMemo(() => {
    return (
      <LinkBase
        style={{ padding: 5, fontSize: 20, fontFamily: 'Recursive' }}
        onClick={() => {
          history.push('/barrels')
        }}
      >
        Barrels
      </LinkBase>
    )
  }, [history])

  const navBarMenu = useMemo(() => {
    return (
      <ContextMenu>
        <ContextMenuItem> {dashboardButtom} </ContextMenuItem>
        <ContextMenuItem> {barrelsButtom} </ContextMenuItem>
        <ContextMenuItem>
          {' '}
          <div style={{ paddingLeft: '35%' }}>
            <Settings />
          </div>{' '}
        </ContextMenuItem>
      </ContextMenu>
    )
  }, [dashboardButtom, barrelsButtom])

  const normalNavBar = useMemo(() => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {homeButtom}
        <div style={{ paddingLeft: 10 }}>{dashboardButtom}</div>
        <div style={{ paddingLeft: 10 }}>{barrelsButtom}</div>
      </div>
    )
  }, [homeButtom, dashboardButtom, barrelsButtom])

  return (
    <Bar
      primary={breakPoint > BreakPoints.sm ? normalNavBar : homeButtom}
      secondary={
        breakPoint <= BreakPoints.sm ? (
          <>
            {' '}
            <ConnectButton /> {navBarMenu}{' '}
          </>
        ) : (
          <>
            <ConnectButton />
            <Settings />
          </>
        )
      }
    />
  )
}

export default MyBar
