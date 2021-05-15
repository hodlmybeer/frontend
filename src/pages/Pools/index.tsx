import React, { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { Container, Row, Col } from 'react-grid-system'
import { Header, Timer, Button, Box } from '@aragon/ui'

import Comment from '../../components/Comment'
import SectionTitle from '../../components/SectionHeader'
import { tokens } from '../../constants'
import { useConnectedWallet } from '../../contexts/wallet'

function Pools() {
  const { networkId } = useConnectedWallet()

  const fakePools = [
    {
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      penalty: 50, // 5%
      feePortion: 100,
      expiry: Date.now() / 1000 + 60 * 86400,
      lockingWindow: 7 * 86400,
      n: 1,
      token: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // weth
      feeRecipient: '0xf668606B896389066a39B132741763e1ca6d76a2',
      totalFee: '129341400000000',
      totalReward: '11934140000000000',
    },
    {
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      penalty: 30, // 3%
      feePortion: 70,
      expiry: Date.now() / 1000 + 360 * 86400,
      lockingWindow: 7 * 86400,
      n: 2,
      token: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // weth
      feeRecipient: '0xf668606B896389066a39B132741763e1ca6d76a2',
      totalFee: '109341400000000',
      totalReward: '14934140000000000',
    },
  ]

  const pools = useMemo(() => {
    const boxes = fakePools.map(pool => {
      return (
        <Col>
          <Box heading={pool.token}>
            <div>Penalty: {pool.penalty / 10} %</div>
            <div>Deposit lock in: {<Timer end={new Date((pool.expiry - pool.lockingWindow) * 1000)} />}</div>
            {pool.address}
          </Box>
        </Col>
      )
    })
    return boxes
  }, [fakePools])

  return (
    <Container>
      <Header primary="Pool" />
      <Row>
        <div></div>
        {/* <Col></Col> */}
        {pools}
      </Row>
    </Container>
  )
}

export default Pools
