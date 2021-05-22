import React, { useMemo } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { useAllHTokens } from '../../hooks'
import { SyncIndicator } from '@aragon/ui'
import { Token } from '../../types'
import Comment from '../../components/Comment'
import Header from '../../components/Header'
import PoolCard from './PoolCard'
import { tokens } from '../../constants'
import { useConnectedWallet } from '../../contexts/wallet'

function Barrels() {
  const { hTokens, isLoading } = useAllHTokens()
  const { networkId } = useConnectedWallet()

  const knownHTokens = useMemo(() => {
    return hTokens.filter(hToken => tokens[networkId].find(t => t.id.toLowerCase() === hToken.token))
  }, [hTokens, networkId])

  const barrels = useMemo(() => {
    const knownTokens = tokens[networkId]
    const boxes = knownHTokens.map(hToken => {
      const token = knownTokens.find(t => t.id.toLowerCase() === hToken.token) as Token
      const card = <PoolCard hToken={hToken} token={token} />

      return (
        <Col xs={12} sm={6} md={4} key={hToken.id}>
          {card}
        </Col>
      )
    })
    return boxes.filter(b => b !== null)
  }, [knownHTokens, networkId])

  return (
    <Container>
      <Header primary="Barrels" />
      <Comment text="Choose your favorate barrel and how long you wanna keep your coins there." />
      <br />
      <Row>{barrels}</Row>
      <SyncIndicator visible={isLoading}> Loading... </SyncIndicator>
    </Container>
  )
}

export default Barrels
