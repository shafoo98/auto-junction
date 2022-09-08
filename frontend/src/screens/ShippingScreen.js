import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import { Helmet } from 'react-helmet'

const ShippingScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  if (!userInfo) {
    history.push('/login')
  }

  const cart = useSelector((state) => state.cart)

  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode }))
    history.push('/payment')
  }

  return (
    <>
      <Helmet>
        <title>Auto Junction: Shipping</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <FormContainer>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='address' className='mb-2'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter address'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='city' className='mb-2'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter city'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='postalCode' className='mb-2'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter postal Code'
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary' className='mt-2 rounded'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ShippingScreen
