import React from 'react'
import { Container } from 'react-grid-system'
import { Header } from '@aragon/ui'
import holding from '../../imgs/holding-beer.png'
import Comment from '../../components/Comment'

function Home() {
  return (
    <Container>
      {/* center everything */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Header primary="Hodl!" />
        <Comment padding={0} text="Welcome to Hodl." />
        Here we help you hodl your coins, and make extra money by holding longer than everyone else.
        <img style={{ paddingTop: '3%' }} src={holding} height={150} alt="logo-beer"></img>
        <Comment padding={0} text="Salud!" />
      </div>
    </Container>
  )
}

export default Home
