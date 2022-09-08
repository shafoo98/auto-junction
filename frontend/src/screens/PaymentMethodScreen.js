import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import { Helmet } from 'react-helmet'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  if (!userInfo) {
    history.push('/login')
  }

  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery (COD)')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <>
      <Helmet>
        <title>Auto Junction: Payment Method</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <FormContainer>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label className='mb-4' as='legend'>
              Select Method
            </Form.Label>
            <Col>
              <Form.Check
                className='mt-4'
                type='radio'
                label='Cash on delivery'
                id='Cash On Delivery (COD) '
                name='paymentMethod'
                value='Cash On Delivery (COD) '
                checked='true'
                onChanged={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type='submit' variant='primary' className='mt-4 rounded'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen
