import React, { useMemo } from 'react'
import Web3 from 'web3'
import { useTrail, animated } from '@react-spring/web'
import { Row, Col } from 'react-grid-system'
import { Token, hToken } from '../../types'
import PoolCard from './PoolCard'
import Create from './Create'
import { tokens, ZERO_ADDR, SupportedNetworks, getOfficialFeeRecipient } from '../../constants'
import { getSortHTokensFunction } from '../../utils/htoken'

function CardRow({
  hTokens,
  networkId,
  erc20,
  web3,
}: {
  hTokens: hToken[]
  networkId: SupportedNetworks
  erc20: any
  web3: Web3
}) {
  const barrels = useMemo(() => {
    const knownTokens = tokens[networkId]
    const officialFR = getOfficialFeeRecipient(networkId)
    const boxes = hTokens
      .filter(hToken => knownTokens.find(t => t.id.toLowerCase() === hToken.token))
      .sort(getSortHTokensFunction(officialFR))
      .map((hToken, index) => {
        const token = knownTokens.find(t => t.id.toLowerCase() === hToken.token) as Token
        return {
          hToken,
          token,
          id: index.toString(),
        }
      }) as {
      id: string
      hToken?: hToken
      token?: Token
    }[]
    boxes.unshift({ id: 'create' })
    return boxes.filter(b => b !== null)
  }, [hTokens, networkId])

  const config = { tension: 280, friction: 60 }

  const trail = useTrail(barrels.length, {
    config,
    opacity: 1,
    xs: 12,
    sm: 6,
    md: 4,
    from: { opacity: 0 },
  })

  return (
    <Row>
      {trail.map((props, index) => (
        <Col style={{ padding: 5 }} xs={12} sm={6} md={4} key={barrels[index].id}>
          <animated.div className="grid-item" style={props} key={barrels[index].id}>
            {barrels[index].id === 'create' ? (
              <Create />
            ) : (
              <PoolCard
                hToken={barrels[index].hToken!}
                token={barrels[index].token!}
                bonusToken={
                  barrels[index].hToken!.bonusToken !== ZERO_ADDR &&
                  barrels[index].hToken!.bonusToken !== barrels[index].hToken!.token
                    ? new web3.eth.Contract(erc20, barrels[index].hToken!.bonusToken)
                    : null
                }
              />
            )}
          </animated.div>
        </Col>
      ))}
    </Row>
  )
}
export default CardRow
