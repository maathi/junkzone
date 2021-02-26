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

export { listItems }
