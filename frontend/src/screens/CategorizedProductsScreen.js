import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listCategoryProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const CategorizedProductsScreen = ({ history, match }) => {
  const category = match.params.category

  const dispatch = useDispatch()

  const categoryProductList = useSelector((state) => state.categoryProductList)

  const { loading, error, categoryProducts } = categoryProductList

  useEffect(() => {
    dispatch(listCategoryProducts(category))
  }, [category, dispatch, history])

  return (
    <>
      <Helmet>
        <title>Auto Junction: Category/Products</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <Link to='/' className='btn btn-light my-3 rounded'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h1 className='fs-1 text-center'>{category}</h1>
          {categoryProducts.length === 0 ? (
            <Message className=''>No Products of this category found</Message>
          ) : (
            <Row>
              {categoryProducts.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </>
  )
}

export default CategorizedProductsScreen
