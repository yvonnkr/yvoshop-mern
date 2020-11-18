import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";

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

  return (
    <div>
      <h2>Cart</h2>
    </div>
  );
};

export default CartScreen;
