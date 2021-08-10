import React, { useMemo, useCallback } from 'react'
import { Modal, RadioList, useTheme, Header } from '@aragon/ui'
import { useConnectedWallet } from '../../contexts/wallet'
import { SupportedNetworks, networkIdToName, networkIdToExplorer, networkToNativeCurrency } from '../../constants'

import { switchNetwork } from '../../utils/wallet'
import { getProvider } from '../../hooks'

const TitleNode = (title: string, imgPath: string, theme: any, comingSoon?: boolean) => {
  return (
    <div style={{ verticalAlign: 'middle', display: 'flex' }}>
      <div style={{ display: 'inline-block', paddingRight: 8 }}>
        <img alt={title} height={25} src={imgPath}></img>
      </div>
      <div style={{ display: 'inline-block', fontSize: 17 }}>
        {title} <span style={{ fontSize: 13, color: theme.contentSecondary }}> {comingSoon && '(Coming Soon)'} </span>
      </div>
    </div>
  )
}

const Description = (description: string, theme: any) => {
  return <div style={{ color: theme.contentSecondary, fontSize: 13 }}>{description}</div>
}

type SwitchChainModalProps = {
  open: boolean
  setOpen: Function
}

enum SelectionIdx {
  Unknown = -1,
  Ethereum = 0,
  Polygon = 1,
  BSC = 2,
}

export const SwitchChainModal = ({ open, setOpen }: SwitchChainModalProps) => {
  const theme = useTheme()
  const { currentProviderNetwork, web3 } = useConnectedWallet()

  const selectedIdx = useMemo(() => {
    if (!(currentProviderNetwork in SupportedNetworks)) return SelectionIdx.Unknown
    if (currentProviderNetwork === SupportedNetworks.Ropsten || currentProviderNetwork === SupportedNetworks.Kovan)
      return SelectionIdx.Ethereum
    if (currentProviderNetwork === SupportedNetworks.Mumbai) return SelectionIdx.Polygon
    else return SelectionIdx.BSC
  }, [currentProviderNetwork])

  const switchToDefaultNetworkOfPlatform = useCallback(
    (selectedIdx: SelectionIdx) => {
      let targetNetwork = SupportedNetworks.Kovan

      if (selectedIdx === SelectionIdx.Ethereum) {
        // todo: change to ethereum mainet
        targetNetwork = SupportedNetworks.Kovan
      } else if (selectedIdx === SelectionIdx.Polygon) {
        // todo: change to matic mainnet
        targetNetwork = SupportedNetworks.Mumbai
      } else if (selectedIdx === SelectionIdx.BSC) {
        // todo: change to BSC mainnet
        targetNetwork = SupportedNetworks.BSC
      } else {
        return
      }

      switchNetwork(
        web3.currentProvider,
        targetNetwork,
        networkIdToName(targetNetwork),
        networkToNativeCurrency(targetNetwork),
        [getProvider(targetNetwork)],
        [networkIdToExplorer[targetNetwork]],
      )
    },
    [web3.currentProvider],
  )

  const items = useMemo(() => {
    return [
      {
        title: TitleNode('Ethereum', require('../../imgs/blockchain/eth.png'), theme),
        description: Description('Switch to Kovan testnet', theme),
      },
      {
        title: TitleNode('Polygon', require('../../imgs/blockchain/polygon.png'), theme),
        description: Description('Switch to Mumbai testnet', theme),
      },
      {
        title: TitleNode('Binance Smart Chain', require('../../imgs/blockchain/bsc.png'), theme),
        description: Description('Try on BNB Mainnet now!', theme),
      },
    ]
  }, [theme])

  return (
    <Modal visible={open} onClose={() => setOpen(false)}>
      <div style={{ padding: 30 }}>
        <Header primary={'Switch Between Networks'} />
        <div style={{ paddingBottom: 20 }}>
          {' '}
          HODL is deployed on multiple chains, you can explore more options by switching between networks.{' '}
          <span aria-label="nan" role="img">
            {' '}
            🎲{' '}
          </span>{' '}
        </div>

        <RadioList
          // title="A radio list"
          // description="Start"
          items={items}
          selected={selectedIdx}
          onChange={switchToDefaultNetworkOfPlatform}
        />
      </div>
    </Modal>
  )
}
