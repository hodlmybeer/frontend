import React, { useMemo } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { Header } from '@aragon/ui'

import PoolCard from './PoolCard'

function Pools() {
  const fakePools = [
    {
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      penalty: 50, // 5%
      feePortion: 100,
      startTimestamp: Date.now() / 1000 - 3 * 86400,
      expiry: Date.now() / 1000 + 60 * 86400,
      lockingWindow: 7 * 86400,
      n: 1,
      token: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // weth
      feeRecipient: '0xf668606B896389066a39B132741763e1ca6d76a2',
      totalFee: '129341400000000',
      totalReward: '11934140000000000',
      tokenAmount: '2311934140000000000',
      totalDepositors: 18,
    },
    {
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      penalty: 30, // 3%
      feePortion: 70,
      startTimestamp: Date.now() / 1000 - 20 * 86400,
      expiry: Date.now() / 1000 + 180 * 86400,
      lockingWindow: 7 * 86400,
      n: 2,
      token: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', // wbtc
      feeRecipient: '0xf668606B896389066a39B132741763e1ca6d76a2',
      totalFee: '1093414',
      totalReward: '2934140',
      tokenAmount: '18931400',
      totalDepositors: 6,
    },
    {
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      penalty: 30, // 3%
      feePortion: 70,
      startTimestamp: Date.now() / 1000 - 160 * 86400,
      expiry: Date.now() / 1000 + 360 * 86400,
      lockingWindow: 7 * 86400,
      n: 2,
      token: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // uni
      feeRecipient: '0xf668606B896389066a39B132741763e1ca6d76a2',
      totalFee: '109341400000000',
      totalReward: '14934140000000000',
      tokenAmount: '891825934140000000000',
      totalDepositors: 30,
    },
  ]

  const pools = useMemo(() => {
    const boxes = fakePools.map(pool => {
      return (
        <Col xs={12} sm={6} md={4}>
          <PoolCard
            penalty={pool.penalty}
            lockingWindow={pool.lockingWindow}
            expiry={pool.expiry}
            tokenAddress={pool.token}
            tokenAmount={pool.tokenAmount}
            totalReward={pool.totalReward}
            startTimestamp={pool.startTimestamp}
            totalDepositors={pool.totalDepositors}
          />
        </Col>
      )
    })
    return boxes
  }, [fakePools])

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
