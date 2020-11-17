import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
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

  if (loading) return <Loader />;

  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <>
      <h1>Latest Products</h1>

      {renderProducts()}
    </>
  );
};

export default HomeScreen;
