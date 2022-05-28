import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-2 p-2 w-100 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' fluid/>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <br />
        <Card.Text as='h5'>৳{product.price} BDT</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
