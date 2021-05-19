import React from 'react'

import beer2 from '../imgs/beer2.png'

export const stateBeer = (defaultTitle, defaultSub, loadingTitle, loadingSub) => {
  return {
    default: {
      title: defaultTitle,
      subtitle: defaultSub,
      illustration: <img src={beer2} height={120} alt="b2" />,
    },
    loading: {
      title: loadingTitle,
      subtitle: loadingSub,
      illustration: <img src={beer2} height={120} alt="b2" />,
    },
  }
}
