import React, { useMemo } from 'react'
import { LinkBase, useTheme } from '@aragon/ui'
import { Container, Row, Col } from 'react-grid-system'
import { useHistory } from 'react-router-dom'

import beer2 from '../../imgs/beer2.png'
import styled from 'styled-components'

import { Header } from '../../components/Header'
import SectionTitle from '../../components/SectionHeader'
import { useConnectedWallet } from '../../contexts/wallet'

import { tokens } from '../../constants'
import MetrixCard from './MetrixCard'
import Footer from './Footer'

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
      <PageContainer>
        <ContentWrap>
          <Header primary="Hodl My Beer" />
          <SectionTitle title="The strategy that outperforms 95% of all professional traders" paddingTop={0} />
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
        </ContentWrap>
        <Footer />
      </PageContainer>
    </Container>
  )
}

const ContentWrap = styled.div`
  padding-bottom: 2.5rem; /* Footer height */
  align-items: center;
  display: flex;
  flex-direction: column;
`
const PageContainer = styled.div`
  position: relative;
  min-height: 88vh;
`

export default Home
