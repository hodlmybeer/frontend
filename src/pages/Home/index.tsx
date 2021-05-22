import React from 'react'
import { Container } from 'react-grid-system'
import { Header } from '../../components/Header'
import holding from '../../imgs/holding-beer.png'
import Comment from '../../components/Comment'
import SectionTitle from '../../components/SectionHeader'

function Home() {
  return (
    <Container>
      {/* center everything */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Header primary="Hodl My Beer" />
        <SectionTitle title="The strategy that outperform 95% of all professional traders" paddingTop={0} />
        <div style={{ paddingTop: 5 }}>
          Here, we help you hodl your coins, and make extra money by holding longer than everyone else.
        </div>
        <img style={{ paddingTop: '3%' }} src={holding} height={150} alt="logo-beer"></img>
        <Comment padding={0} text="Thank us later!" />
      </div>
    </Container>
  )
}

export default Home
