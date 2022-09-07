import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, Card, Image, Carousel } from "react-bootstrap";
import ProductCarousel from "../components/ProductCarousel";
import { Helmet } from "react-helmet";

const HomeScreen = ({ history, match }) => {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const categories = [
    "Engine Oil",
    "Accesories",
    "Filters",
    "Transmission Fluid",
    "Spark Plugs",
    "Brake Pads",
    "Additives",
    "Coolants",
    "Brake Fluid",
    "Power Steering Fluid",
    "Suspension Parts"
  ];

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  return (
    <>
      <Helmet>
        <title>Auto Junction: Home</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <Image
              className="d-block w-100 h-50"
              src="/uploads/Auto Junction Cover Photo.jpg"
              alt="Cover Photo"
              rounded='false'
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100 h-50"
              src="/uploads/Free Delivery Photo.jpg"
              alt="Cover Photo"
              rounded='false'
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="mt-5">
        <Card className="my-2">
          <Card.Title>
            <h1 className="display-1 d-flex justify-content-center">
              Top Rated Products
            </h1>
          </Card.Title>
        </Card>
        <ProductCarousel />
      </div>
      <div>
        <h1 as="div" className="d-flex justify-content-center display-2">
          SHOP BY CATEGORIES
        </h1>
        <Row>
          {categories.map((category) => (
            <>
              <Col sm={12} md={9} lg={6}>
                <Link to={`/${category}`}>
                  <Card className="my-2 p-2 w-100 rounded shadow-lg">
                    <Card.Body>
                      <Card.Text className="fs-3 text-center">
                        {category}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </>
          ))}
        </Row>
      </div>
    </>
  );
};

export default HomeScreen;
