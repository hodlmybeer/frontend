import React, { useMemo, useState } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { SyncIndicator, TextInput } from '@aragon/ui'
import Web3 from 'web3'
import { useAllHTokens, useQuery } from '../../hooks'
import Comment from '../../components/Comment'
import Header from '../../components/Header'
import CardRow from './CardRow'
import { tokens } from '../../constants'
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

  return (
    <Container>
      <Header primary="Barrels" />
      <Comment text="Choose your favorite barrel, deposit and chill!" />
      <Comment text="If you choose to withdraw early, you will be penalized." />
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
      <CardRow web3={web3} erc20={erc20} knownHTokens={knownHTokens} networkId={networkId} />
      <SyncIndicator visible={isLoading}> Loading... </SyncIndicator>
    </Container>
  )
}

export default Barrels
