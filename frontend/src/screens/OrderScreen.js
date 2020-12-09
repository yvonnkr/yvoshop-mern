import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
import moment from "moment";
import Message from "../components/Message";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import Loader from "../components/Loader";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const dispatch = useDispatch();

  // Calculate prices
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, successPay]);

  const successPaymentHandler = (paymentResult) => {
    // console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const renderOrderItems = () => (
    <ListGroup variant="flush">
      {order.orderItems.map(({ product, name, image, qty, price }, index) => (
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
          <strong>Name: </strong>
          {order.user.name}{" "}
        </p>
        <p>
          <strong>Email: </strong>
          <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
        </p>
        <p>
          <strong>Address: </strong>
          {order.shippingAddress.address},{order.shippingAddress.city},
          {order.shippingAddress.postalCode},{order.shippingAddress.country}
        </p>
        {order.isDelivered ? (
          <Message variant="success">
            Delivered on{" "}
            {moment(order.deliveredAt).format("Do MMM YYYY, h:mm a")}
          </Message>
        ) : (
          <Message variant="danger">Not Delivered</Message>
        )}
      </ListGroup.Item>

      <ListGroup.Item>
        <h2>Payment Method</h2>
        <p>
          <strong>Method: </strong>
          {order.paymentMethod}
        </p>
        {order.isPaid ? (
          <Message variant="success">
            Paid on {moment(order.paidAt).format("Do MMM YYYY, h:mm a")}
          </Message>
        ) : (
          <Message variant="danger">Not Paid </Message>
        )}
      </ListGroup.Item>

      <ListGroup.Item>
        <h2>Order Items</h2>

        {order.orderItems.length === 0 ? (
          <Message variant="info">Your order is empty</Message>
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
            <Col>£{order.itemsPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Shipping</Col>
            <Col>£{order.shippingPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Tax</Col>
            <Col>£{order.taxPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Total</Col>
            <Col>£{order.totalPrice}</Col>
          </Row>
        </ListGroup.Item>

        {!order.isPaid && (
          <ListGroup.Item>
            {loadingPay && <Loader />}
            {!sdkReady ? (
              <Loader />
            ) : (
              <PayPalButton
                amount={order.totalPrice}
                onSuccess={successPaymentHandler}
              />
            )}
          </ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );

  if (loading) return <Loader />;

  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <>
      <h1>Order {order._id} </h1>

      <Row>
        <Col md={8}>{renderOrderDetails()}</Col>

        <Col md={4}>{renderOrderSummary()}</Col>
      </Row>
    </>
  );
};

export default OrderScreen;
