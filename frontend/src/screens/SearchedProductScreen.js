import {React, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { Helmet } from "react-helmet";

const SearchedProductScreen = ({history, match}) => {

    const keyword = match.params.keyword;

    const pageNumber = match.params.pageNumber || 1;
  
    const dispatch = useDispatch();
  
    const productList = useSelector((state) => state.productList);
  
    const { loading, error, products, page, pages } = productList;
  
    const userLogin = useSelector((state) => state.userLogin);
  
    const { userInfo } = userLogin;
  
    useEffect(() => {
      if (!userInfo) {
        history.push("/login");
      }
      dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, history, keyword, pageNumber, userInfo]);
    

  return (
    <>
        <Helmet>
        <title>Auto Junction: Search results</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
        <h1 className='d-flex justify-content-center'>Search Results for: {keyword}</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={6} md={5} lg={4}>
                <Product product={product} />
              </Col>
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
  )
}

export default SearchedProductScreen