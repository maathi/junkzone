import { useState } from "react"
import { useDispatch } from "react-redux"
import {
  Button,
  Comment,
  Form,
  Select,
  Rating,
  Message,
  Icon,
  Input,
} from "semantic-ui-react"
import { itemAdd } from "../actions/itemActions"

const NewItem = () => {
  let [name, setName] = useState()
  let [image, setImage] = useState()
  let [price, setPrice] = useState()
  let [details, setDetails] = useState()
  let [numInStock, setNumInStock] = useState()

  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()

    dispatch(itemAdd({ name, image, price, details, numInStock }))
  }

  return (
    <div id="new-item">
      <h2>Add A New Item</h2>

      <Form>
        <Form.Field
          control={Input}
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <Form.Field
          control={Input}
          placeholder="image"
          value={image}
          onChange={(e) => {
            setImage(e.target.value)
          }}
        />
        <Form.Field
          control={Input}
          placeholder="price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value)
          }}
        />
        <Form.Field
          control={Input}
          placeholder="details"
          value={details}
          onChange={(e) => {
            setDetails(e.target.value)
          }}
        />
        <Form.Field
          control={Input}
          placeholder="number in stock"
          value={numInStock}
          onChange={(e) => {
            setNumInStock(e.target.value)
          }}
        />
        <Button
          color="black"
          type="button"
          onClick={(e) => {
            handleSubmit(e)
          }}
        >
          submit
        </Button>
      </Form>
    </div>
  )
}

export default NewItem
