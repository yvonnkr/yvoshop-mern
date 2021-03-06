import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import MetaHelmet from "../components/MetaHelmet";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    history.push("/placeorder");
  };

  const renderForm = () => (
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label as="legend">Select Method</Form.Label>

        <Col>
          <Form.Check
            type="radio"
            label="PayPal or Credit Card"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>

          {/* <Form.Check
            type="radio"
            label="Stripe"
            id="Stripe"
            name="paymentMethod"
            value="Stripe"
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check> */}
        </Col>
      </Form.Group>

      <Button type="submit" variant="primary">
        Continue
      </Button>
    </Form>
  );

  return (
    <>
      <MetaHelmet title={"YvoShop | Payment"} />

      <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <h1>Payment Method</h1>

        {renderForm()}
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
