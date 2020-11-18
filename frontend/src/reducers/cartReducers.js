import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
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

    default:
      return state;
  }
};
