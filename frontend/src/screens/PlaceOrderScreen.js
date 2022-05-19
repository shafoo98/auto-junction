import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, ListGroup, Button, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { Helmet } from 'react-helmet'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  if (!cart.shippingAddress.address) {
    history.push('/shipping')
  } else if (!cart.paymentMethod) {
    history.push('/payment')
  }

  //   Calculate prices

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2)

  cart.shippingPrice = cart.itemsPrice > 1000 ? 200 : 100

  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const { order, success, error } = orderCreate

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }
  return (
    <>
      <Helmet>
        <title>Auto Junction: Place Order</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2 className='mb-2'>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}.
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className='mb-2'>Payment Method</h2>
              <strong>Method: {cart.paymentMethod}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className='mb-2'>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid='true'
                            rounded
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
                  <Col>{cart.itemsPrice}৳</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{cart.shippingPrice}৳</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total </Col>
                  <Col>{cart.totalPrice}৳</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block w-100'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
