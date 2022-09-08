import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-2 p-2 w-100 rounded shadow-lg p-3 mb-5 bg-body'>
      <Link to={`/product/${product._id}`}>
        <Card.Img className='img-thumbnail  hover-zoom' src={product.image} variant='top' style={{height:'30rem'}} rounded loading='lazy'/>
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
