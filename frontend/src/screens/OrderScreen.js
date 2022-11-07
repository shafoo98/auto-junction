import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  deliverOrder,
  payOrder,
} from '../actions/orderActions'
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants'
import { Helmet } from 'react-helmet'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2)
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (!order || successDeliver || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, orderId, order, userInfo, successDeliver, history, successPay])

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  const payHandler = () => {
    dispatch(payOrder(order._id))
  }

  return loading ? (
    <Loader></Loader>
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Helmet>
        <title>Auto Junction: Order Details</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <h1>Order No. {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2 className='mb-4'>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Phone Number: </strong> {order.user.phoneNumber}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}.
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className='mb-4'>Payment Method</h2>
              <p>
                <strong>Method: {order.paymentMethod}</strong>
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Paid on {order.paidAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className='mb-4'>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid='true'
                            rounded
                            loading='lazy'
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          ({item.quantity} x {item.price}) ={' '}
                          {item.quantity * item.price}৳
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2 className='mb-2'>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{order.itemsPrice}৳</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{order.shippingPrice}৳</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total </Col>
                  <Col>{order.totalPrice}৳</Col>
                </Row>
              </ListGroup.Item>
              {loadingPay && <Loader></Loader>}
              {userInfo && userInfo.isAdmin && !order.isPaid && (
                <Button
                  className='btn-md btn-block my-4 rounded mx-5'
                  type='button'
                  onClick={payHandler}
                >
                  Mark As Paid
                </Button>
              )}
              {loadingDeliver && <Loader></Loader>}
              {userInfo && userInfo.isAdmin && !order.isDelivered && (
                <Button
                  className='btn-md btn-block rounded mx-5 mb-4'
                  type='button'
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </Button>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
