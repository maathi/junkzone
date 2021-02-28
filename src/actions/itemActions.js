import axios from "axios"
import * as actions from "../constants/itemConstants.js"

const listItems = (keyword = "", pageNumber = "") => async (dispatch) => {
  try {
    dispatch({ type: actions.ITEM_LIST_REQUEST })

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/items?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: actions.ITEM_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actions.ITEM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const listItemDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.ITEM_DETAILS_REQUEST })

    const { data } = await axios.get(`${process.env.REACT_APP_API}/items/${id}`)

    dispatch({
      type: actions.ITEM_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actions.ITEM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const Itemreview = (id, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: actions.ITEM_REVIEW_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(
      `${process.env.REACT_APP_API}/items/${id}/reviews`,
      review,
      config
    )

    dispatch({
      type: actions.ITEM_REVIEW_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: actions.ITEM_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export { listItems }
