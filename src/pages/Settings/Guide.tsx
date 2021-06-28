import React from 'react'

import SectionTitle from '../../components/SectionHeader'

import { Button } from '@aragon/ui'

function Guide({ onGuideClick }: { onGuideClick: any }) {
  return (
    <>
      <SectionTitle title="User Guide" />
      <Button label="Show" onClick={onGuideClick} />
    </>
  )
}

export default Guide
