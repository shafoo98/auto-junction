import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { resetUserPassword } from '../actions/userActions'
import { Helmet } from 'react-helmet'

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userPasswordUpdate = useSelector((state) => state.userPasswordUpdate);

  const { success, error, loading } = userPasswordUpdate;

  useEffect(() => {
    if (success) {
      history.push('/login')
    }
  }, [history, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(resetUserPassword(email, password))
  }
  return (
    <>
      <Helmet>
        <title>Reset Password</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <FormContainer>
        <h1 className='mt-5'>Reset Password</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email' className='mb-2'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password' className='mb-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter a new password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <div className='d-grid col-5 mx-auto'>
            <Button type='submit' variant='primary' className=' my-4 w-100 rounded'>
              Reset Password
            </Button>
          </div>
        </Form>
      </FormContainer>
    </>
  )
}

export default LoginScreen
