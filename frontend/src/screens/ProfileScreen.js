import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserDetails } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { Helmet } from 'react-helmet'

const ProfileScreen = ({ location, history, match }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setconfirmedPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)

  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const userUpdate = useSelector((state) => state.userUpdate)

  const { success } = userUpdate

  const orderListMy = useSelector((state) => state.orderListMy)

  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
        setPhoneNumber(user.phoneNumber)
      }
    }
  }, [dispatch, history, user, userInfo])

  const submitHandler = (e) => {
    //Dispatch Profile here
    if (password !== confirmedPassword) {
      setMessage('Passwords do not match')
    } else {
      //Dispatch update profile
      dispatch(updateUserDetails({ id: user._id, name, email, password }))
    }
  }
  return (
    <>
      <Helmet>
        <title>Auto Junction: Profile</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {success && <Message variant='success'>Profile Updated</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmedPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm your password'
                value={confirmedPassword}
                onChange={(e) => setconfirmedPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='phoneNumber'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Change your phone number'
                value={phoneNumber}
                minLength='11'
                maxLength='14'
                onChange={(e) => setPhoneNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button
              type='submit'
              variant='primary'
              className='my-2 d-flex
              justify-content-end'
            >
              Update
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader></Loader>
          ) : errorOrders ? (
            <Message variant='danger'>No orders found</Message>
          ) : (
            <Table
              striped='true'
              bordered='true'
              responsive='true'
              className='table-md'
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total Price</th>
                  <th>Delivered On</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`order/${order._id}`}>
                        <Button variant='light'>Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ProfileScreen
