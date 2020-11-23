import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const cartItems = state.cartItems;
      const item = action.payload;
      const existingProduct = cartItems.find((i) => i.product === item.product);

      if (existingProduct) {
        return {
          ...state,
          cartItems: cartItems.map((i) =>
            i.product === existingProduct.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    default:
      return state;
  }
};
