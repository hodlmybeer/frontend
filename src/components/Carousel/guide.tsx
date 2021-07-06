import React, { useState } from 'react'
import { Modal, Checkbox, useTheme } from '@aragon/ui'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { mustGetPreference, storePreference } from '../../utils/storage'
import moment from 'moment'

import { Steps } from './steps'

export function GuideCarousel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const theme = useTheme()
  const nextShowGuide = mustGetPreference('next_show_guide')
  const [checked, setChecked] = useState(nextShowGuide === '')
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const handleChanged = (checked: boolean) => {
    setChecked(checked)
  }

  const handleClose = () => {
    storePreference('next_show_guide', checked ? '' : moment().add(1, 'day').toISOString())
    onClose()
  }

  return (
    <Modal visible={open} onClose={handleClose} padding={'5%'}>
      <div style={{ padding: 30 }}>
        <Slider {...settings}>{Steps()}</Slider>
      </div>

      <div style={{ display: 'flex', paddingTop: 20 }}>
        <label style={{ marginLeft: 'auto', display: 'flex', alignItems: 'flex-end' }}>
          <Checkbox checked={checked} onChange={checked => handleChanged(checked)} />
          <h1 style={{ color: theme.contentSecondary, fontSize: 14 }}>Don't show this guide again</h1>
        </label>
      </div>
    </Modal>
  )
}
