import React from 'react'
import SectionTitle from '../../components/SectionHeader'

import { DISCORD, TWITTER, GITHUB } from '../../constants'
import discord from '../../imgs/social-media/discord.png'
import github from '../../imgs/social-media/github.png'
import twitter from '../../imgs/social-media/twitter.png'

function Social() {
  return (
    <>
      <SectionTitle title="Social Media" />
      <div style={{ paddingBottom: 8 }}>Join our community and follow us on social media!</div>

      <SocialLink img={discord} link={DISCORD} />
      <SocialLink img={twitter} link={TWITTER} />
      <SocialLink img={github} link={GITHUB} />
    </>
  )
}

function SocialLink({ link, img }: { link: string; img: string }) {
  return (
    <span
      style={{ marginRight: 15, cursor: 'pointer' }}
      onClick={() => {
        window.open(link, '_blank')
      }}
    >
      <img height={32} src={img} alt="icon" />
    </span>
  )
}

export default Social
