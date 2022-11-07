import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; Auto Junction{' '}
          </Col>
        </Row>
        <Row>
          <Col className='text-center py-3'>
            Developed By <a href='https://www.facebook.com/Shafinul98/' target='_blank' rel="noreferrer">Shafinul Islam</a>{' '}
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
