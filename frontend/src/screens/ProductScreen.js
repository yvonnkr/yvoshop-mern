import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails } from "../actions/productActions";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;
  const productId = match.params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  const renderImage = () => (
    <Col md={6}>
      <Image src={product.image} alt={product.name} fluid></Image>
    </Col>
  );

  const renderDescription = () => (
    <Col md={3}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h3>{product.name}</h3>
        </ListGroup.Item>
        <ListGroup.Item>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </ListGroup.Item>
        <ListGroup.Item>Price: £{product.price}</ListGroup.Item>
        <ListGroup.Item>Description: {product.description}</ListGroup.Item>
      </ListGroup>
    </Col>
  );

  const renderPrice = () => (
    <ListGroup.Item>
      <Row>
        <Col>Price:</Col>
        <Col>
          <strong>£{product.price}</strong>
        </Col>
      </Row>
    </ListGroup.Item>
  );

  const renderCountInStock = () => (
    <ListGroup.Item>
      <Row>
        <Col>Status:</Col>
        <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
      </Row>
    </ListGroup.Item>
  );

  const renderQtySelect = () =>
    product.countInStock > 0 && (
      <ListGroup.Item>
        <Row>
          <Col>Qty:</Col>
          <Col md={8}>
            <Form.Control
              as="select"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            >
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Row>
      </ListGroup.Item>
    );

  const addToCart = () => (
    <ListGroup.Item>
      <Button
        className="btn-block"
        variant="warning"
        type="button"
        disabled={product.countInStock === 0}
        onClick={addToCartHandler}
      >
        Add To Cart
      </Button>
    </ListGroup.Item>
  );

  const renderProduct = () => (
    <Row>
      {renderImage()}

      {renderDescription()}

      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            {renderPrice()}

            {renderCountInStock()}

            {renderQtySelect()}

            {addToCart()}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );

  if (loading) return <Loader />;

  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {renderProduct()}
    </>
  );
};

export default ProductScreen;
