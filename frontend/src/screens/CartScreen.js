import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MetaHelmet from "../components/MetaHelmet";

const CartScreen = ({ match, location, history }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const productId = match.params.id;
  const queryString = location.search;
  const qty = queryString ? +queryString.split("=")[1] : 1;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const renderShoppingCart = () => {
    return cartItems.length === 0 ? (
      <Message>
        Your cart is empty{" "}
        <Link className="btn" to="/">
          Go Back
        </Link>{" "}
      </Message>
    ) : (
      <ListGroup variant="flush">
        {cartItems.map((item) => (
          <ListGroup.Item key={item.product}>
            <Row>
              <Col md={2}>
                <Image src={item.image} alt={item.name} fluid rounded />
              </Col>
              <Col md={3}>
                <Link to={`/product/${item.product}`} className="all-links">
                  {item.name}
                </Link>
              </Col>
              <Col md={2}>£{item.price}</Col>
              <Col md={3}>
                <Form.Control
                  as="select"
                  value={item.qty}
                  onChange={(e) =>
                    dispatch(addToCart(item.product, +e.target.value))
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Form.Control>
              </Col>
              <Col md={2}>
                <Button
                  type="button"
                  variant="none"
                  onClick={() => removeFromCartHandler(item.product)}
                >
                  <i className="fas fa-trash" style={{ color: "red" }}></i>
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  const renderTotalCheckout = () => (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h3>
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            items
          </h3>
          <h5>
            £
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </h5>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button
            type="button"
            variant="warning"
            className="btn-block"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );

  return (
    <>
      <MetaHelmet title={"YvoShop | Cart"} />

      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {renderShoppingCart()}
        </Col>

        <Col md={4}>{renderTotalCheckout()}</Col>
      </Row>
    </>
  );
};

export default CartScreen;
