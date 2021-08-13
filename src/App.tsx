import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-grid-system'
import 'moment-timezone'
import moment from 'moment'

import { Main, Layout } from '@aragon/ui'
import { walletContext } from './contexts/wallet'

import NavBar from './components/NavBar'

import Settings from './pages/Settings'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Barrels from './pages/Barrels'
import Create from './pages/Create'

import { useConnection } from './hooks/useConnection'

import { getPreference, mustGetPreference } from './utils/storage'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { GuideCarousel } from './components/Carousel'

import './App.css'

function App() {
  const wallet = useConnection()
  const defaultTheme = getPreference('theme', 'light')
  const [theme, setTheme] = useState(defaultTheme)

  const [open, setOpened] = useState(false)

  useEffect(() => {
    const now = moment()
    const nextShowGuide =
      mustGetPreference('next_show_guide') === ''
        ? undefined
        : getPreference('next_show_guide', moment().subtract(1, 'day').toISOString())
    // show intro once a day if user didn't check "don't show this guide again"
    if (nextShowGuide) {
      if (now.isAfter(moment(nextShowGuide))) {
        setOpened(true)
      }
    }
  }, [])

  return (
    <Router>
      <Main layout={false} theme={theme}>
        <walletContext.Provider value={wallet}>
          <NavBar />
          <Row style={{ height: '90%', width: '100%' }}>
            <Col sm={12} md={12} lg={12} xl={12}>
              <Switch>
                <Route path="/settings">
                  <Layout>
                    <Settings setTheme={setTheme} />
                  </Layout>
                </Route>
                <Route path="/barrels">
                  <Layout>
                    <Barrels />
                  </Layout>
                </Route>
                <Route path="/portfolio">
                  <Layout>
                    <Dashboard />
                  </Layout>
                </Route>
                <Route path="/create">
                  <Layout>
                    <Create />
                  </Layout>
                </Route>
                <Route path="/">
                  <Layout>
                    <Home />
                  </Layout>
                </Route>
              </Switch>
            </Col>
          </Row>
          <GuideCarousel
            open={open}
            onClose={() => {
              setOpened(false)
            }}
          />
        </walletContext.Provider>
      </Main>
    </Router>
  )
}

export default App
