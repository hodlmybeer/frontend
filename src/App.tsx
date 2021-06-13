import React, { useState } from 'react'
import { Col, Row } from 'react-grid-system'
import 'moment-timezone'

import { Main, Layout } from '@aragon/ui'
import { walletContext } from './contexts/wallet'

import NavBar from './components/NavBar'

import Settings from './pages/Settings'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Barrels from './pages/Barrels'

import { useConnection } from './hooks/useConnection'

import { getPreference } from './utils/storage'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  const wallet = useConnection()
  const defaultTheme = getPreference('theme', 'light')
  const [theme, setTheme] = useState(defaultTheme)

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
                    <Barrels web3={wallet.web3} />
                  </Layout>
                </Route>
                <Route path="/dashboard">
                  <Layout>
                    <Dashboard />
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
        </walletContext.Provider>
      </Main>
    </Router>
  )
}

export default App
