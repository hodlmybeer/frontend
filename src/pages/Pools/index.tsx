import React, { useMemo } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { useAllHTokens } from '../../hooks'
import { Header } from '@aragon/ui'

import PoolCard from './PoolCard'

function Pools() {
  const { hTokens } = useAllHTokens()

  const pools = useMemo(() => {
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
      <Header primary="Pools" />
      <Row>
        <div></div>
        {/* <Col></Col> */}
        {pools}
      </Row>
    </Container>
  )
}

export default Pools
