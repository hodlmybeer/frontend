import React, { useMemo, useState } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { SyncIndicator, TextInput } from '@aragon/ui'
import Web3 from 'web3'
import { useAllHTokens, useQuery } from '../../hooks'
import { Token } from '../../types'
import Comment from '../../components/Comment'
import Header from '../../components/Header'
import PoolCard from './PoolCard'
import Create from './Create'
import { tokens } from '../../constants'
import { ZERO_ADDR } from '../../constants/addresses'
import { useConnectedWallet } from '../../contexts/wallet'

function Barrels({ web3 }: { web3: Web3 }) {
  const erc20 = require('../../constants/abis/erc20.json')

  const { hTokens, isLoading } = useAllHTokens()
  const { networkId } = useConnectedWallet()
  const { query, clearQuery } = useQuery()

  const tokenFromQuery = query.get('token')

  const [searchText, setSearchText] = useState(tokenFromQuery ? tokenFromQuery : '')

  const filteredHTokens = useMemo(() => {
    if (searchText !== null)
      return hTokens.filter(h => h.id.includes(searchText) || h.symbol.toLowerCase().includes(searchText.toLowerCase()))
    return hTokens
  }, [searchText, hTokens])

  const knownHTokens = useMemo(() => {
    return filteredHTokens.filter(hToken => tokens[networkId].find(t => t.id.toLowerCase() === hToken.token))
  }, [filteredHTokens, networkId])

  const barrels = useMemo(() => {
    const knownTokens = tokens[networkId]
    const boxes = knownHTokens
      .filter(hToken => knownTokens.find(t => t.id.toLowerCase() === hToken.token))
      .map(hToken => {
        const token = knownTokens.find(t => t.id.toLowerCase() === hToken.token) as Token
        const card = (
          <PoolCard
            hToken={hToken}
            token={token}
            bonusToken={
              hToken.bonusToken !== ZERO_ADDR && hToken.bonusToken !== hToken.token
                ? new web3.eth.Contract(erc20, hToken.bonusToken)
                : null
            }
          />
        )

        return (
          <Col style={{ padding: 5 }} xs={12} sm={6} md={4} key={hToken.id}>
            {card}
          </Col>
        )
      })
    return boxes.filter(b => b !== null)
  }, [knownHTokens, networkId, erc20, web3])

  return (
    <Container>
      <Header primary="Barrels" />
      <Comment text="Choose your favorite barrel and how long you wanna keep your coins there." />
      <Comment text="Once you deposit, your tokens will be locked up. If you choose to withdraw early, you will be penalized." />
      <br />
      <Row>
        <Col md={6} lg={4}>
          <TextInput
            wide
            placeholder="Filter by Symbol"
            value={searchText}
            onChange={event => {
              clearQuery('token') // whenever user put in, override url param
              setSearchText(event.target.value)
            }}
          />
        </Col>
      </Row>

      <br />
      <Row>
        {barrels}
        {
          <Col
            style={{
              padding: 5,
            }}
            xs={12}
            sm={6}
            md={4}
            key="create"
          >
            <Create />
          </Col>
        }
      </Row>
      <SyncIndicator visible={isLoading}> Loading... </SyncIndicator>
    </Container>
  )
}

export default Barrels
