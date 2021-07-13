import React from 'react'

import { TWITTER, GITHUB, DISCORD } from '../../constants'

function Footer() {
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        bottom: 20,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
      }}
    >
      <ImageLink link={TWITTER} img={require('../../imgs/social-media/twitter.png')} />
      <ImageLink link={GITHUB} img={require('../../imgs/social-media/github.png')} />
      <ImageLink link={DISCORD} img={require('../../imgs/social-media/discord.png')} />
    </div>
  )
}

export default Footer

function ImageLink({ link, img }: { link: string; img: string }) {
  return (
    <div
      style={{
        display: 'inline-block',
        marginTop: 5,
        marginRight: 10,
        cursor: 'pointer',
      }}
      onClick={() => {
        window.open(link, '_blank')
      }}
    >
      <img height={25} src={img} alt="icon" />
    </div>
  )
}
