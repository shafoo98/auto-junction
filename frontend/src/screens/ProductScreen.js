import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { Helmet } from 'react-helmet'

const ProductScreen = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`)
  }

  const goBackHandler = () => {
    history.goBack()
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productCreateReview = useSelector((state) => state.productCreateReview)
  const {
    loading: loadingProductReview,
    success: successProductReview,
    error: errorProductReview,
  } = productCreateReview

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(match.params.id))
  }, [history, match, successProductReview, userInfo, dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Helmet>
            <title>{product.name}</title>
            <meta name='description' content='Helmet application' />
          </Helmet>
          <Button
            className='btn-md btn-block rounded my-4'
            onClick={goBackHandler}
          >
            Go back to previous page
          </Button>
          <Row>
            <Col sm={12} md={9} lg={4} className='d-flex align-items-center'>
              <Image
                src={product.image}
                alt={product.name}
                loading='lazy'
                fluid
                className='user-select-none'
                onContextMenu={(e) => e.preventDefault()}
              />
            </Col>
            <Col md={6} lg={4} className='mt-2'>
              <ListGroup variant='flush' className='user-select-none'>
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ৳{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3} lg={4} className='mt-2'>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>
                        <strong>{product.price}৳</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className='w-100 rounded my-3'
                      onClick={addToCartHandler}
                      variant='dark'
                      block
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant='light'>No reviews</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating}></Rating>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h3>Write a review for the product</h3>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader></Loader>}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        className='mt-2'
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant='light'>
                      Please
                      <Link to='/login' style={{ textDecoration: 'none' }}>
                        {' '}
                        Sign in{' '}
                      </Link>
                      to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
