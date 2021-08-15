import React, { useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Bar, LinkBase, ContextMenu, ContextMenuItem } from '@aragon/ui'
import ConnectButton from './ConnectButton'
import Settings from './SettingsButton'

import logo from '../../imgs/beer.png'
import { useBreakpoint } from '../../hooks'
import { BreakPoints } from '../../constants'
import { SwitchChainModal } from '../SwitchChainModal'

function MyBar() {
  const history = useHistory()
  const breakPoint = useBreakpoint()

  const [networkModalOpen, setNetworkModalOpen] = useState(false)

  const homeIcon = useMemo(() => {
    return (
      <LinkBase
        onClick={() => {
          window.open('https://hodlmybeer.co/', '_blank')
        }}
      >
        <img src={logo} alt="logo" height="50" />
      </LinkBase>
    )
  }, [])

  const homeButton = useMemo(() => {
    return (
      <LinkBase
        onClick={() => {
          history.push('/')
        }}
        style={{ padding: 10, fontSize: 20, fontFamily: 'Recursive' }}
      >
        Home
      </LinkBase>
    )
  }, [history])

  const portfolioButton = useMemo(() => {
    return (
      <LinkBase
        style={{ padding: 10, fontSize: 20, fontFamily: 'Recursive' }}
        onClick={() => {
          history.push('/portfolio')
        }}
      >
        Portfolio
      </LinkBase>
    )
  }, [history])

  const barrelsButton = useMemo(() => {
    return (
      <LinkBase
        style={{ padding: 10, fontSize: 20, fontFamily: 'Recursive' }}
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
        <ContextMenuItem> {portfolioButton} </ContextMenuItem>
        <ContextMenuItem> {barrelsButton} </ContextMenuItem>
        <ContextMenuItem>
          {' '}
          <div style={{ paddingLeft: '35%' }}>
            <Settings />
          </div>{' '}
        </ContextMenuItem>
      </ContextMenu>
    )
  }, [portfolioButton, barrelsButton])

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
        {homeIcon}
        {homeButton}
        <div style={{ paddingLeft: 15 }}>{barrelsButton}</div>
        <div style={{ paddingLeft: 15 }}>{portfolioButton}</div>
      </div>
    )
  }, [homeButton, portfolioButton, barrelsButton, homeIcon])

  return (
    <div>
      <Bar
        primary={breakPoint > BreakPoints.sm ? normalNavBar : homeIcon}
        secondary={
          breakPoint <= BreakPoints.sm ? (
            <>
              {' '}
              <ConnectButton setNetworkModalOpen={setNetworkModalOpen} /> {navBarMenu}{' '}
            </>
          ) : (
            <>
              <ConnectButton setNetworkModalOpen={setNetworkModalOpen} />
              <Settings />
            </>
          )
        }
      />
      <SwitchChainModal open={networkModalOpen} setOpen={setNetworkModalOpen} />
    </div>
  )
}

export default MyBar
