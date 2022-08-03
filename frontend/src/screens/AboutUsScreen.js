import React from 'react'
import {Helmet} from 'react-helmet'
import { Container, Image} from 'react-bootstrap'
import { BsFacebook } from 'react-icons/bs'

const AboutUsScreen = () => {
  return (
    <>
    <Helmet>
            <title>Auto Junction: About</title>
            <meta name='description' content='Helmet application' />
    </Helmet>
    <Container>
    <Image fluid="true" src="\uploads\Auto Junction Cover Photo.jpg"></Image>
      <p></p>
      <h1 className='display-1'>About us: </h1>
      <span className='display-5'>We are Auto Junction, an online shop that provides you with the best quality of all your automotive needs and parts at the best price delivered to your doorstep. </span>
      <h1 className='display-1'>Contact us: </h1>
      <span className='display-5'>
        Contact us at our <a rel='nopener noreferrer' target='_blank' href='https://www.facebook.com/auto.junction.store/'><BsFacebook /> page</a> for any of your
        order or delivery queries
      </span>
      <p className='display-5'>
        You may also call the number 01792651900 for your order or delivery
        queries
      </p>
    </Container>
    </>
  )
}

export default AboutUsScreen
