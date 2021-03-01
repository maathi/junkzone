import { act } from "react-dom/test-utils"
import * as actions from "../constants/cartConstants"

export function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case actions.CART_ADD_REQUEST:
      let item = action.payload
      let itemFound = state.cartItems.find((i) => i._id === item._id)

      if (itemFound) {
        return {
          cartItems: state.cartItems.map((i) =>
            i._id === itemFound._id ? item : i
          ),
        }
      } else return { cartItems: [...state.cartItems, item] }

    case actions.CART_REMOVE_REQUEST:
      return {
        cartItems: state.cartItems.filter((i) => i._id !== action.payload),
      }
    default:
      return state
  }
}
