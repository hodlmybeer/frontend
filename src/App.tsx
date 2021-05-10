import React, { useState } from 'react'
import ReactGA from 'react-ga'
import { Col, Row } from 'react-grid-system'
import 'moment-timezone'

import { Main, Layout } from '@aragon/ui'
import { walletContext } from './contexts/wallet'

import NavBar from './components/NavBar'
import SideBar from './components/SideBar'

import Settings from './pages/Settings'
import HomePage from './pages/HomePage'

import { useConnection } from './hooks/useConnection'

import { getPreference } from './utils/storage'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { SHOW_SIDE_BAR } from './constants'

ReactGA.initialize(process.env.REACT_APP_GA_TRACKINK_ID || '')

function App() {
  const wallet = useConnection()
  const defaultTheme = getPreference('theme', 'light')
  const [theme, setTheme] = useState(defaultTheme)

  const [isSideBarOpen, setSideBarOpen] = useState(getPreference(SHOW_SIDE_BAR, 'true') === 'true')

  return (
    <Router>
      <Main layout={false} theme={theme}>
        <walletContext.Provider value={wallet}>
          <NavBar isSideBarOpen={isSideBarOpen} setSideBarOpen={setSideBarOpen} />
          <Row style={{ height: '100%' }}>
            {isSideBarOpen && (
              <Col sm={12} md={3} lg={3} xl={2}>
                <SideBar />
              </Col>
            )}
            <Col
              sm={12}
              md={isSideBarOpen ? 9 : 12}
              lg={isSideBarOpen ? 9 : 12}
              xl={isSideBarOpen ? 10 : 12}
              // offset={maincontentOffset}
            >
              <Switch>
                <Route path="/settings">
                  <Layout>
                    <Settings setTheme={setTheme} />
                  </Layout>
                </Route>
                <Route path="/">
                  <Layout>
                    <HomePage />
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
