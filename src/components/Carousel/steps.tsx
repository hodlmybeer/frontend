import React from 'react'
import { useTheme, Header } from '@aragon/ui'

import depositBarrel from '../../imgs/barrels/barrel-deposit.png'
import hodlTheBeer from '../../imgs/holding-beer.png'
import barrels from '../../imgs/barrels/barrels.png'
import barrelWithRewards from '../../imgs/barrels/barrel-with-rewards.png'
import barrelUnknown from '../../imgs/barrels/barrel-unknown.png'

export const Steps = () => {
  return [
    <Template
      key="1"
      title={'Welcome to HODL My Beer'}
      img={hodlTheBeer}
      description={"Ready to HODL your coins with diamond hands? We're here to help you achieve that in 3 simple steps"}
    />,
    <Template
      key="2"
      title={'Find your favorite Barrel'}
      img={barrels}
      description={
        "Browse through barrels and play around with the filters, find the barrel with your favorite token and expiry you'd like to HODL until."
      }
    />,
    <Template
      key="3"
      title={'Deposit and chill '}
      img={depositBarrel}
      description={'Deposit into the barrel to start HODLing. You will get some untransferable hTokens in return.'}
    />,
    <Template
      key="4"
      title={'Come back and claim rewards'}
      img={barrelWithRewards}
      description={'Come back later and use your shares to claim reward from quitters or additional bonus.'}
    />,
    <Template
      key="5"
      title={'Create new Barrels and earn some extra'}
      img={barrelUnknown}
      description={"Can't find anything interesting? Create your own barrel and start earning fees from quitters!"}
    />,
  ]
}

function Template({ title, img, description }: { title: string; img: string; description: string }) {
  const theme = useTheme()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Header primary={title} />
      <img alt="demo" src={img} height={'180px'} />

      <div style={{ padding: 20, color: theme.contentSecondary, textAlign: 'center' }}> {description} </div>
    </div>
  )
}
