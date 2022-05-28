import React from 'react'
import {Helmet} from 'react-helmet'
import { Container, Image } from 'react-bootstrap'
import { BsFacebook } from 'react-icons/bs'

const AboutUsScreen = () => {
  return (
    <>
    <Helmet>
            <title>Auto Junction: About</title>
            <meta name='description' content='Helmet application' />
    </Helmet>
    <Container>
    <Image fluid='true' src='https://scontent.fdac7-1.fna.fbcdn.net/v/t39.30808-6/284405127_101206955952299_2234381641446318810_n.png?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeEiuZsnleIgPyloq72is6wiIh7hUAAMsCQiHuFQAAywJB1ELwLslk8ImRq8SEhgXJghAzhRC-0ubh3K89W8DYMp&_nc_ohc=7cjrYKpVelwAX-0842d&_nc_ht=scontent.fdac7-1.fna&oh=00_AT9YAob_-4pZUTa7JJaZoHlrt_oI_iCFcqOxSVlgCoWS4A&oe=6296FA6C'></Image>
      <p></p>
      <h1 style={{ height: '5.5vh', fontSize:'2rem', fontWeight: 'bold' }}>About us: </h1>
      <span style={{ fontSize: '1rem', marginTop: '1rem'}}>We are Auto Junction, an online shop that provides you with the best quality of all your automotive needs and parts at the best price delivered to your doorstep. </span>
      <h1 style={{ height: '5.5vh', fontSize:'2rem', fontWeight: 'bold' }}>Contact us: </h1>
      <span style={{ fontSize: '1rem', marginTop: '1rem'}}>
        Contact us at our <a rel='nopener noreferrer' target='_blank' href='https://www.facebook.com/auto.junction.store/'><BsFacebook /> page</a> for any of your
        order or delivery queries
      </span>
      <p style={{ fontSize: '1rem'}}>
        You may also call the number 01792651900 for your order or delivery
        queries
      </p>
    </Container>
    </>
  )
}

export default AboutUsScreen
