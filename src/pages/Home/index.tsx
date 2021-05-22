import React, { useMemo } from 'react'
import { LinkBase, useTheme } from '@aragon/ui'
import { Container, Row, Col } from 'react-grid-system'
import { useHistory } from 'react-router-dom'

import beer2 from '../../imgs/beer2.png'

import { Header } from '../../components/Header'
import SectionTitle from '../../components/SectionHeader'
import { useConnectedWallet } from '../../contexts/wallet'

import { tokens } from '../../constants'
import MetrixCard from './MetrixCard'

function Home() {
  const history = useHistory()
  const theme = useTheme()
  const { networkId } = useConnectedWallet()

  const randomCoins = useMemo(() => {
    const shuffled = tokens[networkId].filter(t => t.coingeckId).sort(() => 0.5 - Math.random())

    // Get sub-array of first n elements after shuffled
    const n = shuffled.length > 3 ? 3 : shuffled.length
    let selected = shuffled.slice(0, n)
    return selected
  }, [networkId])

  return (
    <Container>
      {/* center everything */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Header primary="Hodl" />
        <SectionTitle title="The strategy that outperform 95% of all professional traders" paddingTop={0} />
        <div style={{ paddingTop: 5 }}>
          Here, we help you hodl your coins, and make extra money by holding longer than everyone else.
        </div>
        <br />

        <Row style={{ width: '100%' }}>
          {randomCoins.map(coin => (
            <Col lg={4} sm={12} key={coin.id}>
              <MetrixCard token={coin} />
            </Col>
          ))}
        </Row>
        <div style={{ fontSize: 12, paddingTop: 5, color: theme.surfaceContentSecondary }}>
          Data from{' '}
          <a rel="noopener noreferrer" target="_blank" href="https://www.coingecko.com/en">
            {' '}
            CoinGecko{' '}
          </a>
        </div>
        <br></br>
        <Row style={{ width: '100%' }}>
          <Col offset={{ lg: 4 }} lg={4}>
            <LinkBase
              style={{
                width: '100%',
                height: 70,
                borderColor: theme.border,
                color: 'white',
                backgroundColor: theme.positive,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                fontFamily: 'Recursive',
              }}
              mode="positive"
              onClick={() => history.push('/barrels')}
            >
              <span>Explore More</span>
              <img style={{ paddingLeft: '3%' }} src={beer2} height={50} alt="logo-beer"></img>
            </LinkBase>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default Home
