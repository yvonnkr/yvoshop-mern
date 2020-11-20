import { combineReducers } from "redux";
import { productDetailsReducer, productListReducer } from "./productReducers";
import { cartReducer } from "./cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
} from "./userReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
});

export default reducer;
