import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel
      className="my-3 bg-dark"
      activeIndex={index}
      onSelect={handleSelect}
      slide={false}
    >
      {products.map((product) => (
        <Carousel.Item key={product._id} interval={2000}>
          <Row>
            <Link to={`/product/${product._id}`}>
              <Carousel.Caption className="carousel-caption">
                <h2 className="fs-2">
                  {product.name} (৳{product.price} BDT)
                </h2>
              </Carousel.Caption>
            </Link>
          </Row>
          <Row className="mt-5 d-flex mx-auto">
            <Col>
              <Image
                className="d-block"
                style={{ width: "25rem", height: "20rem" }}
                src={product.image}
                alt={product.name}
                rounded={false}
              />
            </Col>
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
