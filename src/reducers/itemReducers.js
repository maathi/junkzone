import * as actions from "../constants/itemConstants"

const itemListReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case actions.ITEM_LIST_REQUEST:
      return {
        loading: true,
        items: [],
      }
    case actions.ITEM_LIST_SUCCESS:
      return {
        loading: false,
        items: action.payload.items,
        selectedPage: action.payload.selectedPage,
        totalPages: action.payload.totalPages,
      }
    case actions.ITEM_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export { itemListReducer }
