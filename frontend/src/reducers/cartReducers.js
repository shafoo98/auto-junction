import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_RESET_ITEMS,
} from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const existsItem = state.cartItems.find((i) => i.product === item.product)

      if (existsItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existsItem.product ? item : x
          ),
        }
      } else {
        return { ...state, cartItems: [...state.cartItems, item] }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    case CART_RESET_ITEMS:
      return {
        ...state,
        cartItems: [],
      }
    default:
      return state
  }
}
