import React, { useMemo } from 'react'

import { Button, IconConnect, Box, IconPower, IdentityBadge, Tag } from '@aragon/ui'

import { checkAddressAndAddToStorage } from '../../utils/storage'
import { isMainnet } from '../../utils/others'
import { useConnectedWallet } from '../../contexts/wallet'
import { useBreakpoint } from '../../hooks'
import { BreakPoints, networkIdToName } from '../../constants'

function ConnectButton() {
  const { connect, disconnect, user, networkId } = useConnectedWallet()
  const breakpoint = useBreakpoint()
  const connectWeb3 = async () => {
    const address = await connect()
    if (!address) return
    checkAddressAndAddToStorage(address)
  }

  const networkName = useMemo(() => networkIdToName[networkId], [networkId])

  return user !== '' ? (
    <>
      <Box padding={6}>
        <div style={{ verticalAlign: 'middle', textAlign: 'center' }}>
          {breakpoint > BreakPoints.sm && (
            <div style={{ display: 'inline-block' }}>
              <Tag uppercase={false} mode={isMainnet(networkId) ? 'indicator' : 'identifier'}>
                {' '}
                {networkName}{' '}
              </Tag>
            </div>
          )}

          <IdentityBadge
            entity={user}
            popoverAction={{
              label: (
                <>
                  <IconPower></IconPower> Disconnect{' '}
                </>
              ),
              onClick: disconnect,
            }}
          />
        </div>
      </Box>
    </>
  ) : (
    <Button mode="normal" icon={<IconConnect />} label="Connect" onClick={connectWeb3} />
  )
}

export default ConnectButton
