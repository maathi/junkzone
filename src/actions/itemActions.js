import axios from "axios"
import * as actions from "../constants/itemConstants.js"

const listItems = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/items`)

    dispatch({
      type: actions.ITEM_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    console.log("big fat error")
  }
}

export { listItems }
