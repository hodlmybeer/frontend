import React, { useMemo, useState, useRef } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { useHistory } from 'react-router-dom'
import { SyncIndicator, TextInput, IconConfiguration, Popover, Button, useTheme } from '@aragon/ui'
import { useAllHTokens, useQuery } from '../../hooks'
import Header from '../../components/Header'
import CardRow from './CardRow'
import { tokens, CoinTags } from '../../constants'
import { useConnectedWallet } from '../../contexts/wallet'
import CheckBoxWithLabel from '../../components/CheckBoxWithLabel'
import SectionHeader from '../../components/SectionHeader'
import { Token } from '../../types'

const erc20 = require('../../constants/abis/erc20.json')

function Barrels() {
  const theme = useTheme()
  const history = useHistory()

  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const [showAll, setShowAll] = useState<boolean>(true)

  const [configModalOpen, setConfigModalOpen] = useState<boolean>(false)
  const configIconRef = useRef()

  const { web3 } = useConnectedWallet()

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
      return showAll || mainToken.tags.filter(tag => selectedTags.includes(tag.replace(' ', ''))).length > 0
    })
    if (searchText === null) return hTokensFilterByTags

    return hTokensFilterByTags.filter(
      h => h.id.includes(searchText) || h.symbol.toLowerCase().includes(searchText.toLowerCase()),
    )
  }, [searchText, knownHTokens, selectedTags, showAll, networkId])

  const TagFilterPopOver = useMemo(() => {
    return (
      <Popover visible={configModalOpen} opener={configIconRef.current} onClose={() => setConfigModalOpen(false)}>
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
                  setSelectedTags(Object.keys(CoinTags).map(key => key.replace(' ', '')))
                }
              }}
            />
            {Object.keys(CoinTags).map(key => {
              const tagId = CoinTags[key].replace(' ', '')
              return (
                <CheckBoxWithLabel
                  key={key}
                  label={CoinTags[key]}
                  checked={selectedTags.includes(tagId)}
                  setChecked={checked =>
                    checked
                      ? setSelectedTags(tags => [...tags, tagId])
                      : setSelectedTags(tags => [...tags].filter(t => t !== tagId))
                  }
                />
              )
            })}
          </div>
        </div>
      </Popover>
    )
  }, [showAll, setSelectedTags, selectedTags, configIconRef, configModalOpen])

  return (
    <Container>
      <Header primary="Barrels" />
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
          <Button type="icon" ref={configIconRef} onClick={() => setConfigModalOpen(true)}>
            <IconConfiguration />{' '}
          </Button>
          {TagFilterPopOver}
        </Col>
      </Row>
      <br />
      <CardRow web3={web3} erc20={erc20} hTokens={filteredHTokens} networkId={networkId} />
      <br />
      {!isLoading && (
        <Row
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span style={{ color: theme.contentSecondary, padding: 10 }}>Can't find what you're looking for?</span>
          <Button onClick={() => history.push('/create')}> Create a new Barrel </Button>
        </Row>
      )}
      <SyncIndicator visible={isLoading}> Loading... </SyncIndicator>
    </Container>
  )
}

export default Barrels
