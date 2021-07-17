import React, { useMemo } from 'react'

import { Button, LinkBase, IconConnect, Box, IconPower, IdentityBadge, Tag } from '@aragon/ui'

import { checkAddressAndAddToStorage } from '../../utils/storage'
import { isMainnet } from '../../utils/others'
import { useConnectedWallet } from '../../contexts/wallet'
import { useBreakpoint } from '../../hooks'
import { BreakPoints, networkIdToName, SupportedNetworks } from '../../constants'

function ConnectButton({ setNetworkModalOpen }) {
  const { connect, disconnect, user, currentProviderNetwork } = useConnectedWallet()

  const breakpoint = useBreakpoint()
  const connectWeb3 = async () => {
    const address = await connect()
    if (!address) return
    checkAddressAndAddToStorage(address)
  }

  const networkName = useMemo(() => networkIdToName(currentProviderNetwork), [currentProviderNetwork])

  return user !== '' ? (
    <>
      <Box padding={6}>
        <div style={{ verticalAlign: 'middle', textAlign: 'center' }}>
          {breakpoint > BreakPoints.sm && (
            <div style={{ display: 'inline-block' }}>
              <LinkBase onClick={() => setNetworkModalOpen(true)}>
                <Tag
                  uppercase={false}
                  mode={isMainnet(currentProviderNetwork) ? 'indicator' : 'identifier'}
                  // override colors if the current connected wallet is unknown
                  background={currentProviderNetwork in SupportedNetworks ? undefined : '#d1d0d6'}
                  color={currentProviderNetwork in SupportedNetworks ? undefined : '#6c6b6f'}
                >
                  {' '}
                  {networkName}{' '}
                </Tag>
              </LinkBase>
            </div>
          )}

          <IdentityBadge
            entity={user}
            popoverAction={{
              label: (
                <>
                  <IconPower /> Disconnect{' '}
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
