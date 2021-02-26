import * as actions from "../constants/userConstants"
import axios from "axios"
const registerAction = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: actions.USER_REGISTER_REQUEST })

    const config = {
      headers: { "Content-Type": "application/json" },
    }

    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/users`,
      { name, email, password },
      config
    )

    dispatch({
      type: actions.USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: actions.USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: actions.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: actions.USER_LOGIN_REQUEST })

    const config = {
      headers: { "Content-Type": "application/json" },
    }

    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/users/login`,
      { email, password },
      config
    )

    dispatch({
      type: actions.USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: actions.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const logoutAction = () => async (dispatch) => {
  localStorage.removeItem("userInfo")

  dispatch({
    type: actions.USER_LOGOUT,
  })
}
export { registerAction, loginAction, logoutAction }
