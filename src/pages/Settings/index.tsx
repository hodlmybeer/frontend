import React, { useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import Header from '../../components/Header'
import ThemeSwitch from './Theme'
import ApproveSwitch from './Approval'
import ClearCache from './ClearCache'
import Social from './Social'
import Guide from './Guide'
import { GuideCarousel } from '../../components/Carousel'
function Settings({ setTheme }: { setTheme: any }) {
  const [open, setOpened] = useState(false)
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
      <Guide onGuideClick={() => setOpened(!open)} />
      <br />
      <Social />
      <br />
      <GuideCarousel
        open={open}
        onClose={() => {
          setOpened(false)
        }}
      />
    </>
  )
}

export default Settings
