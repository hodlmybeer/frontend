import React from 'react'
import { Button } from '@aragon/ui'
import { Container } from 'react-grid-system'
import { useHistory } from 'react-router-dom'

import { Header } from '../../components/Header'
import holding from '../../imgs/holding-beer.png'
import SectionTitle from '../../components/SectionHeader'

function Home() {
  const history = useHistory()

  return (
    <Container>
      {/* center everything */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Header primary="Hodl" />
        <SectionTitle title="The strategy that outperform 95% of all professional traders" paddingTop={0} />
        <div style={{ paddingTop: 5 }}>
          Here, we help you hodl your coins, and make extra money by holding longer than everyone else.
        </div>
        <img style={{ paddingTop: '3%' }} src={holding} height={150} alt="logo-beer"></img>
        <Button mode="positive" onClick={() => history.push('/barrels')}>
          {' '}
          Start HODLing{' '}
        </Button>
      </div>
    </Container>
  )
}

export default Home
