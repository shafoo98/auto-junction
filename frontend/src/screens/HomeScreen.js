import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { Helmet } from "react-helmet";

const HomeScreen = ({ history, match }) => {
  const categories = ["Engine Oil", "Filters", "Transmission Fluid", "Spark Plugs", "Brake Pads", "Additives"];

  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, history, keyword, pageNumber, userInfo]);

  return (
    <>
      <Helmet>
        <title>Auto Junction: Home</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {!keyword && <ProductCarousel></ProductCarousel>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {categories.map((category) => (
              <div>
                <Row>
                <h1 className='display-5 fw-bold'>{category}</h1>
                  {products.map((product) =>
                    category === product.category ? (
                        <Col key={product._id} sm={12} md={6} lg={6}>
                          <Product product={product} />
                        </Col>
                    ) : (
                      <div> </div>
                    )
                  )}
                </Row>
              </div>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          ></Paginate>
        </>
      )}
    </>
  );
};

export default HomeScreen;
