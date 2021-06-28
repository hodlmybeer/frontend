import React, { useState } from 'react'
import { Modal, Header, Checkbox, useTheme } from '@aragon/ui'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../../App.css'
import { mustGetPreference, storePreference } from '../../utils/storage'
import moment from 'moment'

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
  //TODO: revise real guides
  const getGuides = () => {
    return [1, 2, 3, 4].map(e => {
      return (
        <div key={e.toString()}>
          <img alt="demo" src="http://placekitten.com/g/400/200" />
        </div>
      )
    })
  }

  const handleChanged = (checked: boolean) => {
    setChecked(checked)
  }

  const handleClose = () => {
    storePreference('next_show_guide', checked ? '' : moment().add(1, 'day').toISOString())
    onClose()
  }

  return (
    <Modal visible={open} onClose={handleClose}>
      <Header primary={`User Guide`} />
      <div className="container">
        <Slider {...settings}>{getGuides()}</Slider>
      </div>
      <label style={{ marginLeft: 'auto', display: 'flex', alignItems: 'flex-start' }}>
        <Checkbox checked={checked} onChange={checked => handleChanged(checked)} />
        <h1 style={{ color: theme.content }}>Don't show this guide again</h1>
      </label>
    </Modal>
  )
}
