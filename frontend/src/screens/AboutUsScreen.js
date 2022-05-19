import React from 'react'
import { Container } from 'react-bootstrap'

const AboutUsScreen = () => {
  return (
    <Container>
      <h1 style={{ height: '7.5vh' }}>About Us: </h1>
      <h5 style={{ fontSize: '1.25rem' }}></h5>
      <h1 style={{ height: '7.5vh' }}>Contact Us: </h1>
      <p>
        Contact us at our <a href='www.facebook.com'>page</a> for any of your
        order or delivery queries
      </p>
      <p>
        You may also call the number 01794520843 for your order or delivery
        queries
      </p>
    </Container>
  )
}

export default AboutUsScreen
