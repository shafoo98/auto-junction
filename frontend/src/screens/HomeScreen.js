import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, Card} from "react-bootstrap";
import ProductCarousel from "../components/ProductCarousel";
import { Helmet } from "react-helmet";

const HomeScreen = ({ history, match }) => {
  const categories = [
    "Engine Oil",
    "Filters",
    "Transmission Fluid",
    "Spark Plugs",
    "Brake Pads",
    "Additives",
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
        <Card className="my-2">
          <Card.Title>
            <h1 className="display-2 d-flex justify-content-center">
              Top Rated Products
            </h1>
          </Card.Title>
        </Card>
        <ProductCarousel></ProductCarousel>
      </div>
      <div>
        <h1 as="div" className="d-flex justify-content-center display-3">
          SHOP BY CATEGORIES
        </h1>
        <Row>
          {categories.map((category) => (
            <>
              <Col sm={12} md={9} lg={3}>
                <Link to={`/${category}`}>
                  <Card className="my-2 p-2 w-100 rounded">
                    <Card.Body>
                      <Card.Text>{category}</Card.Text>
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
