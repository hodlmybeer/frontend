import React, { useMemo } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { useAllHTokens } from '../../hooks'
import { Header, SyncIndicator } from '@aragon/ui'
import Comment from '../../components/Comment'
import PoolCard from './PoolCard'

function Barrels() {
  const { hTokens, isLoading } = useAllHTokens()

  const barrels = useMemo(() => {
    const boxes = hTokens.map(hToken => {
      return (
        <Col xs={12} sm={6} md={4} key={hToken.id}>
          <PoolCard hToken={hToken} />
        </Col>
      )
    })
    return boxes
  }, [hTokens])

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
