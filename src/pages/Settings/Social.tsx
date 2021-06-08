import React from 'react'

import SectionTitle from '../../components/SectionHeader'

import { Button } from '@aragon/ui'

import discord from '../../imgs/social-media/discord.png'
import github from '../../imgs/social-media/github.png'
// import twitter from '../../imgs/social-media/twitter.png'

function Social() {
  return (
    <>
      <SectionTitle title="Social Media" />
      <div> Join our community and follow us on social media! </div>

      <SocialLink img={discord} link={'https://discord.gg/3kdYuyzUC2'} />

      <SocialLink img={github} link={'https://github.com/hodlmybeer'} />
    </>
  )
}

function SocialLink({ link, img }: { link: string; img: string }) {
  return (
    <Button
      icon={<img height={32} src={img} alt="icon" />}
      style={{ marginTop: 5, marginRight: 10 }}
      onClick={() => {
        window.open(link, '_blank')
      }}
    />
  )
}

export default Social
