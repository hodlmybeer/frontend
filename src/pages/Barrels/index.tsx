import React, { useMemo, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { SyncIndicator, TextInput, IconConfiguration, Popover, Button } from '@aragon/ui'
import Web3 from 'web3'
import { useAllHTokens, useQuery } from '../../hooks'
import Comment from '../../components/Comment'
import Header from '../../components/Header'
import CardRow from './CardRow'
import { tokens, CoinTags } from '../../constants'
import { useConnectedWallet } from '../../contexts/wallet'
import CheckBoxWithLabel from '../../components/CheckBoxWithLabel'
import SectionHeader from '../../components/SectionHeader'
import { Token } from '../../types'

function Barrels({ web3 }: { web3: Web3 }) {
  const erc20 = require('../../constants/abis/erc20.json')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const [showAll, setShowAll] = useState<boolean>(true)

  const [configModalOpen, setConfigModalOpen] = useState<boolean>(false)
  const opener = React.createRef()

  // hack: use another constant and ref to record button ref, cause opener isn't always updated in useMemo
  const [refButton, setRefButton] = useState<any>(null)
  useEffect(() => {
    if (opener.current) setRefButton(opener.current)
  }, [opener])

  const { hTokens, isLoading } = useAllHTokens()
  const { networkId } = useConnectedWallet()
  const { query, clearQuery } = useQuery()

  const tokenFromQuery = query.get('token')

  const [searchText, setSearchText] = useState(tokenFromQuery ? tokenFromQuery : '')

  // hTokens which has main token that's in our token list
  const knownHTokens = useMemo(() => {
    return hTokens.filter(hToken => {
      const mainToken = tokens[networkId].find(t => t.id.toLowerCase() === hToken.token)
      return mainToken !== undefined
    })
  }, [hTokens, networkId])

  // hTokens to show
  const filteredHTokens = useMemo(() => {
    const hTokensFilterByTags = knownHTokens.filter(hToken => {
      const mainToken = tokens[networkId].find(t => t.id.toLowerCase() === hToken.token) as Token
      return showAll || mainToken.tags.filter(tag => selectedTags.includes(tag)).length > 0
    })
    if (searchText === null) return hTokensFilterByTags

    return hTokensFilterByTags.filter(
      h => h.id.includes(searchText) || h.symbol.toLowerCase().includes(searchText.toLowerCase()),
    )
  }, [searchText, knownHTokens, selectedTags, showAll, networkId])

  const TagFilterPopOver = useMemo(() => {
    return (
      <Popover visible={configModalOpen} opener={refButton} onClose={() => setConfigModalOpen(false)}>
        <div style={{ padding: 15 }}>
          <SectionHeader title="Filter by Tags" paddingTop={10} />
          <div style={{ display: 'flex' }}>
            <CheckBoxWithLabel
              label={'All'}
              checked={showAll}
              setChecked={checked => {
                setShowAll(checked)
                if (checked) {
                  setSelectedTags([])
                } else {
                  setSelectedTags(Object.keys(CoinTags).map(k => k))
                }
              }}
            />
            {Object.keys(CoinTags).map(key => (
              <CheckBoxWithLabel
                key={key}
                label={CoinTags[key]}
                checked={selectedTags.includes(CoinTags[key].replace(' ', ''))}
                setChecked={checked =>
                  checked
                    ? setSelectedTags(tags => [...tags, CoinTags[key]])
                    : setSelectedTags(tags => [...tags].filter(t => t !== CoinTags[key]))
                }
              />
            ))}
          </div>
        </div>
      </Popover>
    )
  }, [showAll, setSelectedTags, selectedTags, refButton, configModalOpen])

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
        <Col md={6} lg={4}>
          <Button ref={opener} type="icon" onClick={() => setConfigModalOpen(true)}>
            {' '}
            <IconConfiguration />{' '}
          </Button>
          {TagFilterPopOver}
        </Col>
      </Row>

      <br />
      <CardRow web3={web3} erc20={erc20} hTokens={filteredHTokens} networkId={networkId} />
      <SyncIndicator visible={isLoading}> Loading... </SyncIndicator>
    </Container>
  )
}

export default Barrels
