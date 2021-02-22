import { createStore, combineReducers } from "redux"
import { itemListReducer } from "./reducers/itemReducers.js"

const reducer = combineReducers({ itemList: itemListReducer })
const store = createStore(reducer)

export default store
