import * as actions from "../constants/itemConstants"

const itemListReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case actions.ITEM_LIST_SUCCESS:
      console.log(action.payload.items)
      return {
        items: action.payload.items,
      }
    default:
      return state
  }
}

export { itemListReducer }
