import React, { useState } from 'react'
import ReactGA from 'react-ga'
import { Col, Row } from 'react-grid-system'
import 'moment-timezone'

import { Main, Layout } from '@aragon/ui'
import { walletContext } from './contexts/wallet'

import NavBar from './components/NavBar'

import Settings from './pages/Settings'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Pools from './pages/Pools'

import { useConnection } from './hooks/useConnection'

import { getPreference } from './utils/storage'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'

ReactGA.initialize(process.env.REACT_APP_GA_TRACKINK_ID || '')

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
                <Route path="/pools">
                  <Layout>
                    <Pools />
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
