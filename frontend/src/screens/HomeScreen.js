import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const { products, loading, error } = useSelector(
    (state) => state.productList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const renderProducts = () => (
    <Row>
      {products.map((product) => (
        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      <h1>Latest Products</h1>

      {loading ? (
        <h2>LOADING.......</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        renderProducts()
      )}
    </>
  );
};

export default HomeScreen;
