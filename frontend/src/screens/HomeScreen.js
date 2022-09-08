import { React, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, Card, Container, Image } from "react-bootstrap";
import ProductCarousel from "../components/ProductCarousel";
import { Helmet } from "react-helmet";
import SearchBox from "../components/SearchBox";

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
      <Container>
        {userInfo && (
          <Route
            render={({ history }) => <SearchBox history={history}></SearchBox>}
          ></Route>
        )}
      </Container>
      <div className="mx-auto w-100 mt-5">
        <Image
          className="d-block w-100 h-100"
          src="/uploads/Auto Junction Cover Photo.jpg"
          alt="Cover Photo"
        />
      </div>
      <div className="mt-5">
        <Card className="my-2 shadow-lg">
          <Card.Title>
            <h1 className="display-1 d-flex justify-content-center">
              Top Rated Products
            </h1>
          </Card.Title>
        </Card>
        <ProductCarousel />
      </div>
      <div>
        <h1
          as="div"
          className="d-flex justify-content-center display-3 shadow-lg"
        >
          SHOP BY CATEGORIES
        </h1>
        <Row className="mx-auto">
          {categories.map((category) => (
            <>
              <Col sm={12} md={6} lg={4}>
                <Link to={`/${category}`} style={{'textDecoration': 'none'}}>
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
