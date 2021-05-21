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

const itemDetailsReducer = (state = { item: { reviews: [] } }, action) => {
  switch (action.type) {
    case actions.ITEM_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case actions.ITEM_DETAILS_SUCCESS:
      return {
        loading: false,
        item: action.payload,
      }
    case actions.ITEM_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case actions.ITEM_DETAILS_RESET:
      return {}

    default:
      return state
  }
}

const itemReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.ITEM_REVIEW_REQUEST:
      return {
        loading: true,
      }
    case actions.ITEM_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case actions.ITEM_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case actions.ITEM_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

const itemAddReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.ITEM_ADD_REQUEST:
      return { loading: true, item: {} }
    case actions.ITEM_ADD_SUCCESS:
      return { loading: false, item: action.payload }
    case actions.ITEM_ADD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export {
  itemListReducer,
  itemReviewReducer,
  itemDetailsReducer,
  itemAddReducer,
}
