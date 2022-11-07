import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import { Helmet } from 'react-helmet'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setconfirmedPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)

  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    //Dispatch Register here
    if (password !== confirmedPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password, phoneNumber))
    }
  }
  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' className='mb-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email' className='mb-2'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password' className='mb-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmedPassword' className='mb-2'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm your password'
              value={confirmedPassword}
              onChange={(e) => setconfirmedPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='phoneNumber' className='mb-2'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your phone number'
              value={phoneNumber}
              minLength='11'
              maxLength='14'
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <div className='d-grid col-6 mx-auto'>
            <Button type='submit' variant='primary' className='my-4 rounded'>
              Register
            </Button>
          </div>
        </Form>
        <Row classname='py-3'>
          <Col>
            Have an Account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login here
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default RegisterScreen
