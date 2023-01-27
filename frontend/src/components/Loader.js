import React from 'react'
import { Container } from 'react-bootstrap'

const Loader = () => {
  return (
    <Container>
      <article>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
        <div className='shimmer'></div>
      </article>
    </Container>
  )
}

export default Loader
