import React from 'react'
import { useHistory } from 'react-router-dom'
import { Bar, LinkBase } from '@aragon/ui'
import ConnectButton from './ConnectButton'
import Settings from './SettingsButton'

import logo from '../../imgs/beer.png'

function MyBar() {
  const history = useHistory()

  return (
    <Bar
      primary={
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LinkBase
            onClick={() => {
              history.push('/')
            }}
          >
            <img src={logo} alt="logo" height="50" />
          </LinkBase>

          <LinkBase
            style={{ paddingLeft: 30, fontSize: 20 }}
            onClick={() => {
              history.push('/dashboard')
            }}
          >
            Dashboard
          </LinkBase>

          <LinkBase
            style={{ paddingLeft: 30, fontSize: 20 }}
            onClick={() => {
              history.push('/barrels')
            }}
          >
            Barrels
          </LinkBase>
        </div>
      }
      secondary={
        <>
          <ConnectButton />
          <Settings />
        </>
      }
    />
  )
}

export default MyBar
