import React, { useEffect } from 'react'
import { Header as AragonHeader, Info } from '@aragon/ui'
import { useConnectedWallet } from '../../contexts/wallet'
import { SupportedNetworks } from '../../constants'

// set tab title while using Header
export function Header({ primary, secondary, title }: { primary?: any; secondary?: any; title?: string }) {
  const { currnetProviderNetwork } = useConnectedWallet()

  useEffect(() => {
    if (title) {
      document.title = title
    } else if (typeof primary === 'string') {
      document.title = primary
    }
  }, [primary, title])

  return (
    <div>
      <AragonHeader primary={primary} secondary={secondary} />
      {!(currnetProviderNetwork in SupportedNetworks) && (
        <Info mode="warning"> You're at the wrong network. Please switch to Ropsten </Info>
      )}
    </div>
  )
}

export default Header
