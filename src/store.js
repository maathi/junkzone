import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { createStore, combineReducers, applyMiddleware } from "redux"
import {
  itemListReducer,
  itemReviewReducer,
  itemDetailsReducer,
} from "./reducers/itemReducers.js"
import {
  userRegisterReducer,
  userLoginReducer,
} from "./reducers/userReducers.js"
import { cartReducer } from "./reducers/cartReducers.js"

const reducer = combineReducers({
  itemList: itemListReducer,
  itemReview: itemReviewReducer,
  itemDetails: itemDetailsReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  cart: cartReducer,
})

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
  cart: { cartItems: cartItemsFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
