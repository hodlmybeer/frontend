import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col } from 'react-grid-system'
import BoxButton from '../../components/BoxButton'
import { Header, IconUser, IconConfiguration, IconSwap } from '@aragon/ui'

import Comment from '../../components/Comment'
import SectionTitle from '../../components/SectionHeader'

function HomePage() {
  const history = useHistory()
  useEffect(() => ReactGA.pageview('/'), [])
  return (
    <Container>
      <Header primary="Hodl!" />

      <Comment padding={0} text="Hodl the beer." />

      <SectionTitle title={'Core'} />
      <Row>
        <Col sm={12} md={6} lg={4}>
          <BoxButton
            title="Pools"
            description="Join diff holding pools"
            icon={<IconUser size="large" />}
            onClick={() => {
              history.push('/pools/')
            }}
          />
        </Col>

        <Col sm={12} md={6} lg={4}>
          <BoxButton
            title="Stake"
            description="Coming soon"
            icon={<IconConfiguration size="large" />}
            onClick={() => {
              history.push('/stake/')
            }}
          />
        </Col>

        <Col sm={12} md={6} lg={4}>
          <BoxButton
            title="Dashboard"
            description="Cool isn't it"
            icon={<IconSwap size="large" />}
            onClick={() => {
              history.push('/trade/')
            }}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
