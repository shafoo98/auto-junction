import { React, useEffect, useState } from 'react'
import { Link, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  Col,
  Container,
  Image,
  Row,
  Accordion,
  Carousel,
  ListGroup,
} from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import SearchBox from '../components/SearchBox'
import { listTopProducts } from '../actions/productActions'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = ({ history, match }) => {
  const categories = [
    {
      name: 'Engine Oil',
      image:
        'https://res.cloudinary.com/auto-junction-store/image/upload/c_scale,h_50,w_50/v1672699172/linear-engine-oil-icon-general-outline-collection-thin-line-isolated-white-background-trendy-illustration-140058334_mpntes.jpg',
    },
    {
      name: 'Accessories',
      image:
        'https://res.cloudinary.com/auto-junction-store/image/upload/c_scale,h_50,w_50/v1672698408/wrench-outline-msidiqf-wrench-industrial-vector-icons-msidiqf-142114512_iuarfr.jpg',
    },
    {
      name: 'Filters',
      image:
        'https://res.cloudinary.com/auto-junction-store/image/upload/v1672696594/car-oil-filter-linear-icon-white-background-editable-stroke-162738209_sogcvo.jpg',
    },
    {
      name: 'Transmission Fluid',
      image:
        'https://res.cloudinary.com/auto-junction-store/image/upload/v1672696594/tranmission_oil_image_xkxbfm.jpg',
    },
    {
      name: 'Spark Plugs',
      image:
        'https://res.cloudinary.com/auto-junction-store/image/upload/v1672696595/spark-plug_xiruog.jpg',
    },
    {
      name: 'Brake Pads',
      image:
        'https://res.cloudinary.com/auto-junction-store/image/upload/c_scale,h_50,w_50/v1672698524/car-brake-pad-linear-icon-modern-outline-logo-con-concept-white-background-parts-collection-suitable-use-web-apps-133515673_vryxrs.jpg',
    },
    {
      name: 'Additives',
      image:
        'https://res.cloudinary.com/auto-junction-store/image/upload/v1672696594/additives_gkcrhx.jpg',
    },
    {
      name: 'Coolants',
      image:
        'https://res.cloudinary.com/auto-junction-store/image/upload/v1672697116/car-radiator-icon-outline-style-vector-web-design-isolated-white-background-142259230_o193sv.jpg',
    },
    {
      name: 'Brake Fluid',
      image:
        'https://res.cloudinary.com/auto-junction-store/image/upload/v1672697013/brake-fluid_izjihq.jpg',
    },
    {
      name: 'Power Steering Fluid',
      image:
        'https://res.cloudinary.com/auto-junction-store/image/upload/v1672697365/oil-bottle-outline-icon-linear-style-sign-mobile-concept-web-design-olive-oil-package-simple-line-vector-icon-symbol-logo-132807956_bfxxkb.jpg',
    },
    {
      name: 'Suspension Parts',
      image:
        'https://res.cloudinary.com/auto-junction-store/image/upload/v1672696594/car-suspension-outline-icon-linear-style-sign-mobile-concept-web-design-shock-absorber-simple-line-vector-icon-symbol-logo-126074624_azpm3z.jpg',
    },
    {
      name: 'Batteries and Misc.',
      image:
        'https://res.cloudinary.com/auto-junction-store/image/upload/v1672696594/car-battery-icon-outline-style-isolated-white-background-vector-illustration-79590601_yswon8.jpg',
    },
  ]

  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    // if (!userInfo) {
    //   history.push("/login");
    // }
    dispatch(listTopProducts())
  }, [dispatch, history, userInfo])

  return (
    <>
      <Helmet>
        <title>Auto Junction: Home</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <Container>
        {userInfo && (
          <Route
            render={({ history }) => <SearchBox history={history}></SearchBox>}
          ></Route>
        )}
      </Container>
      <Accordion className='my-5 ms-3' defaultActiveKey='1'>
        <Card className='mx-auto text-center'>
          <Accordion.Toggle
            as='h5'
            eventKey='0'
            className='display-5 text-center'
            style={{ cursor: 'pointer' }}
          >
            Shop By Categories
          </Accordion.Toggle>
        </Card>
        <Accordion.Collapse eventKey='0'>
          <Row className='mt-3'>
            {categories.map((category) => (
              <Col xs={12} md={4} className='my-4'>
                <ListGroup>
                  <ListGroup.Item>
                    <Link
                      to={`/category/${category.name}`}
                      style={{ textDecoration: 'none', cursor: 'pointer' }}
                      className='d-flex flex-column justify-content-between'
                    >
                      <img
                        style={{
                          width: '50px',
                          height: '50px',
                          margin: '0 auto',
                        }}
                        src={category.image}
                        alt=''
                      />
                      <h5 className='text-center'>{category.name}</h5>
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            ))}
          </Row>
        </Accordion.Collapse>
      </Accordion>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <div className='mx-auto w-100'>
            <Image
              className='d-block w-100 h-100'
              src='/uploads/Auto Junction Cover Photo.jpg'
              alt='Cover Photo'
              rounded='false'
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className='mx-auto w-100 mt-5'>
            <Image
              className='d-block w-100 h-100'
              src='/uploads/Free Delivery.png'
              alt='Cover Photo'
              rounded='false'
            />
          </div>
        </Carousel.Item>
      </Carousel>
      <div className='mt-5'>
        <Card className='mb-5 mx-auto'>
          <Card.Title>
            <h1 className='display-5 d-flex justify-content-center'>
              Top Rated Products
            </h1>
          </Card.Title>
        </Card>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Row>
            {products.map((product) => (
              <Col sm={12} md={4} className='my-2'>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  )
}

export default HomeScreen
