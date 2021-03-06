import React, { useState, useCallback } from 'react'
import { Split, TextInput, Button, LoadingRing } from '@aragon/ui'
import SectionHeader from '../../components/SectionHeader'
import ReactTooltip from 'react-tooltip'
import { Hodling } from '../../types'
import { Entry, EntryTitle } from '../../components/Entry'
import TokenAmountWithoutIcon from '../../components/TokenAmountWithoutIcon'
import { Row, Col, Container } from 'react-grid-system'
import { toTokenAmount, fromTokenAmount } from '../../utils/math'
import { usePool } from '../../hooks'
import BigNumber from 'bignumber.js'

export default function HodlingExpanded({ hodling }: { hodling: Hodling }) {
  const [isQuitting, setIsQuitting] = useState(false)
  const [isRedeeming, setIsRedeeming] = useState(false)

  const [quitAmount, setQuitAmount] = useState<BigNumber>(new BigNumber(0))
  const [redeemAmount, setRedeemAmount] = useState<BigNumber>(new BigNumber(0))

  const { quit, redeem } = usePool(hodling.token)

  const handleQuit = useCallback(async () => {
    setIsQuitting(true)
    try {
      const quitAmountRaw = fromTokenAmount(quitAmount, hodling.token.decimals)
      await quit(quitAmountRaw)
    } finally {
      setIsQuitting(false)
    }
  }, [quitAmount, quit, hodling])

  const handleRedeem = useCallback(async () => {
    setIsRedeeming(true)
    try {
      const redeemAmountRaw = fromTokenAmount(redeemAmount, hodling.token.decimals)
      await redeem(redeemAmountRaw)
    } finally {
      setIsRedeeming(false)
    }
  }, [redeemAmount, redeem, hodling])

  const reward = new BigNumber(hodling.token.totalReward)
  const bonus = new BigNumber(hodling.token.bonusTokenBalance)

  const nothingToRedeem = reward.eq(0) && bonus.eq(0)
  const redeemTooltip = nothingToRedeem ? 'Nothing to redeem' : ''
  return (
    <div style={{ padding: '2%', width: '100%' }}>
      <SectionHeader title="Hodling Detail" />
      <Split
        secondary={null}
        primary={
          <Container>
            <Row>
              <Col md={4} style={{ paddingTop: 10 }}>
                <Entry>
                  <EntryTitle uppercase={false}> Hodling </EntryTitle>
                  <TokenAmountWithoutIcon
                    symbol={hodling.token.symbol}
                    decimals={hodling.token.decimals}
                    amount={hodling.balance}
                    onClick={() => setQuitAmount(toTokenAmount(hodling.balance, hodling.token.decimals))}
                  />
                </Entry>
              </Col>
              <Col>
                <Entry>
                  <TextInput
                    wide
                    type="number"
                    value={quitAmount}
                    onChange={event => {
                      if (parseFloat(event.target.value) > 0) setQuitAmount(event.target.value)
                      else {
                        setQuitAmount(new BigNumber(0))
                      }
                    }}
                  />
                  <Button onClick={handleQuit} style={{ minWidth: 110 }} mode="negative">
                    {isQuitting ? <LoadingRing /> : 'Quit'}
                  </Button>
                </Entry>
              </Col>
            </Row>
            {/* shares */}
            <Row>
              <Col md={4} style={{ paddingTop: 10 }}>
                <Entry>
                  <EntryTitle uppercase={false}> Shares </EntryTitle>
                  <TokenAmountWithoutIcon
                    symbol={'shares'}
                    decimals={hodling.token.decimals}
                    amount={hodling.shareBalance}
                    onClick={() => setRedeemAmount(toTokenAmount(hodling.shareBalance, hodling.token.decimals))}
                  />
                </Entry>
              </Col>
              <Col>
                <Entry>
                  <TextInput
                    wide
                    type="number"
                    value={redeemAmount}
                    onChange={event => {
                      if (parseFloat(event.target.value) > 0) setRedeemAmount(event.target.value)
                      else {
                        setRedeemAmount(new BigNumber(0))
                      }
                    }}
                  />
                  <Button
                    data-tip={redeemTooltip}
                    onClick={handleRedeem}
                    style={{ minWidth: 110 }}
                    mode="positive"
                    disabled={isRedeeming || nothingToRedeem}
                  >
                    {isRedeeming ? <LoadingRing /> : 'Redeem'}
                    <ReactTooltip />
                  </Button>
                </Entry>
              </Col>
            </Row>
          </Container>
        }
      />
    </div>
  )
}
