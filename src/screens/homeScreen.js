import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../constants/itemConstants.js"
import axios from "axios"

const HomeScreen = () => {
  const dispatch = useDispatch()
  const itemList = useSelector((state) => state.itemList)

  useEffect(async () => {
    const { data } = await axios.get(process.env.REACT_APP_API + "/items")
    console.log(data)
    dispatch({
      type: actions.ITEM_LIST_SUCCESS,
      payload: {
        items: [...data],
      },
    })
  }, [])

  return (
    <div>
      <h1>hello everyone!!</h1>
      <ul>
        {itemList?.items?.map((i) => (
          <li key={i._id}>
            {i.name} || {i.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomeScreen
