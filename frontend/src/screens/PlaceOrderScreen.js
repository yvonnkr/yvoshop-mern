import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { createOrder } from "../actions/orderActions";
import MetaHelmet from "../components/MetaHelmet";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { address, city, postalCode, country } = cart.shippingAddress;

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [dispatch, success, history, order]);

  // PlaceOrder
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  const renderOrderItems = () => (
    <ListGroup variant="flush">
      {cart.cartItems.map(({ product, name, image, qty, price }, index) => (
        <ListGroup.Item key={index}>
          <Row>
            <Col md={1}>
              <Image src={image} alt={name} fluid rounded></Image>
            </Col>
            <Col>
              <Link to={`/product/${product}`} className="all-links">
                {name}
              </Link>
            </Col>
            <Col md={5}>
              {qty} x £{price} = £{qty * price}
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );

  const renderOrderDetails = () => (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <h2>Shipping</h2>
        <p>
          <strong>Address: </strong>
          {address},{city},{postalCode},{country}
        </p>
      </ListGroup.Item>

      <ListGroup.Item>
        <h2>Payment Method</h2>
        <p>
          <strong>Method: </strong>
          {cart.paymentMethod}
        </p>
      </ListGroup.Item>

      <ListGroup.Item>
        <h2>Order Items</h2>

        {cart.cartItems.length === 0 ? (
          <Message variant="info">Your cart is empty</Message>
        ) : (
          <>{renderOrderItems()}</>
        )}
      </ListGroup.Item>
    </ListGroup>
  );

  const renderOrderSummary = () => (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h2>Order Summary</h2>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Items</Col>
            <Col>£{cart.itemsPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Shipping</Col>
            <Col>£{cart.shippingPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Tax</Col>
            <Col>£{cart.taxPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Total</Col>
            <Col>£{cart.totalPrice}</Col>
          </Row>
        </ListGroup.Item>

        {error && (
          <ListGroup.Item>
            <Message variant="danger">{error}</Message>
          </ListGroup.Item>
        )}

        <ListGroup.Item>
          <Button
            type="button"
            className="btn-block"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );

  return (
    <>
      <MetaHelmet title={"YvoShop | Place Order"} />

      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>{renderOrderDetails()}</Col>

        <Col md={4}>{renderOrderSummary()}</Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
