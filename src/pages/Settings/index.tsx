import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import Header from '../../components/Header'
import ThemeSwitch from './Theme'
import ApproveSwitch from './Approval'
import ClearCache from './ClearCache'
import Social from './Social'
function Settings({ setTheme }: { setTheme: any }) {
  useEffect(() => ReactGA.pageview('/settings/'), [])
  return (
    <>
      <Header primary="Settings" />
      <ThemeSwitch setTheme={setTheme} />
      <br />
      <ApproveSwitch />
      <br />
      <ClearCache />
      <br />
      <Social />
      <br />
    </>
  )
}

export default Settings
