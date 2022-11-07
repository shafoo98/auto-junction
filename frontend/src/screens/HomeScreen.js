import { React, useEffect, useState} from "react";
import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Container, Image, Row, Accordion, Carousel } from "react-bootstrap";
import { Helmet } from "react-helmet";
import SearchBox from "../components/SearchBox";
import { listTopProducts } from "../actions/productActions";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = ({ history, match }) => {
  const categories = [
    "Engine Oil",
    "Accessories",
    "Filters",
    "Transmission Fluid",
    "Spark Plugs",
    "Brake Pads",
    "Additives",
    "Coolants",
    "Brake Fluid",
    "Power Steering Fluid",
    "Suspension Parts",
    "Batteries and Misc."
  ];

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    // if (!userInfo) {
    //   history.push("/login");
    // } 
    dispatch(listTopProducts());
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Helmet>
        <title>Auto Junction: Home</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <Container>
        {userInfo && (
          <Route
            render={({ history }) => <SearchBox history={history}></SearchBox>}
          ></Route>
        )}
      </Container>
      <Accordion className="my-5 ms-3" defaultActiveKey="1">
        <Card className="mx-auto text-center">
          <Accordion.Toggle
            as="h5"
            eventKey="0"
            className="display-5 text-center"
            style={{ cursor: "pointer" }}
          >
            Shop By Categories ⬇️
          </Accordion.Toggle>
        </Card>
        <Accordion.Collapse eventKey="0">
          <Row className="mt-3">
            {categories.map((category) => (
              <Col xs={4} className="my-4">
                <Link
                  to={`/category/${category}`}
                  style={{ textDecoration: "none", cursor: "pointer" }}
                >
                  <h5 className="text-center">{category}</h5>
                </Link>
              </Col>
            ))}
          </Row>
        </Accordion.Collapse>
      </Accordion>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <div className="mx-auto w-100">
            <Image
              className="d-block w-100 h-100"
              src="/uploads/Auto Junction Cover Photo.jpg"
              alt="Cover Photo"
              rounded='false'
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
        <div className="mx-auto w-100 mt-5">
            <Image
              className="d-block w-100 h-100"
              src="/uploads/Free Delivery.png"
              alt="Cover Photo"
              rounded='false'
            />
          </div>
        </Carousel.Item>
      </Carousel>
      <div className="mt-5">
        <Card className="mb-5 mx-auto">
          <Card.Title>
            <h1 className="display-5 d-flex justify-content-center">
              Top Rated Products ⬇️
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
              <Col sm={12} md={4} className="my-2">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
