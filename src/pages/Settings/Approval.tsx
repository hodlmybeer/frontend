import React, { useState } from 'react'

import SectionTitle from '../../components/SectionHeader'

import { Switch, useToast, Help } from '@aragon/ui'
import { storePreference, getPreference } from '../../utils/storage'

function ApproveSwitch() {
  const mode = getPreference('approval', 'unlimited')
  const toast = useToast()

  const [isUnlimited, setLimited] = useState(mode === 'unlimited')

  return (
    <>
      <div style={{ display: 'flex' }}>
        <SectionTitle title="ERC20 Approve Mode" />
        <div style={{ paddingLeft: '10px', paddingTop: '25px' }}>
          <Help hint={'What is this'}>
            Enabling unlimited approval will enable smart contracts to move all your token balance with 1 approve
            transaction.
            <br />
            This can save you gas if you plan to use this contract multiple times, but it's also considered risky
            because if the contract got exploited, the hacker may be able to move all your tokens from your wallet.
          </Help>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ paddingRight: 20 }}> Unlimited Approval </div>
        <div style={{ paddingTop: 3 }}>
          {' '}
          <Switch
            checked={isUnlimited}
            onChange={checked => {
              setLimited(checked)
              const newMode = checked ? 'unlimited' : 'normal'
              storePreference('approval', newMode)
              toast('Approval mode updated')
            }}
          />{' '}
        </div>
      </div>
    </>
  )
}

export default ApproveSwitch
