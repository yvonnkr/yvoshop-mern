import { combineReducers } from "redux";
import { productDetailsReducer, productListReducer } from "./productReducers";
import { cartReducer } from "./cartReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

export default reducer;
