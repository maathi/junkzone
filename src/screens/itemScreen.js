import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  Comment,
  Form,
  Select,
  Rating,
  Message,
  Icon,
} from "semantic-ui-react"
import Ratings from "../components/ratings"
import { listItemDetails, itemreview } from "../actions/itemActions"
import Page404 from "../components/page404"
import Loader from "../components/loader"
import Meta from "../components/meta"
import { ITEM_DETAILS_RESET } from "../constants/itemConstants"

const ItemScreen = ({ match, history }) => {
  const dispatch = useDispatch(0)

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState(" ")

  const itemDetails = useSelector((state) => state.itemDetails)

  const itemReview = useSelector((state) => state.itemReview)
  const {
    success: successItemReview,
    loading: loadingItemReview,
    error: errorItemReview,
  } = itemReview

  const { loading, item, error } = itemDetails

  useEffect(() => {
    dispatch({ type: ITEM_DETAILS_RESET })
    if (successItemReview) {
      setRating(0)
      setComment(" ")
    }
    dispatch(listItemDetails(match.params.id))
  }, [dispatch, match, successItemReview])

  const qtyOptions = item
    ? [...Array(item.numInStock).keys()].map((p) => ({
        text: `${p + 1}`,
        value: `${p + 1}`,
      }))
    : []

  const getQty = (e, { value }) => {
    setQty(Number(value))
  }
  const ratingHandler = (e, { rating }) => {
    setRating(rating)
  }

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
  const reviewHandler = (e) => {
    e.preventDefault()
    if (!rating) {
      alert("Please enter an overall rating")
    } else {
      dispatch(
        itemreview(match.params.id, {
          rating,
          comment,
        })
      )
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Page404 />
      ) : item ? (
        <div className="item-container">
          <Meta title={item.name} />
          <div className="item">
            <div className="item__info">
              <div>
                <Ratings rating={item.rating} />
              </div>
              <h1 className="item__name">{item.name}</h1>
              <div className="item__price">${item.price}</div>
              <div className="item__detail">
                <p>{item.detail}</p>
                <div>
                  {item.numInStock > 0 ? (
                    <span style={{ color: "green" }}>In Stock.</span>
                  ) : (
                    <span style={{ color: "#f68872" }}>Out Of Stock.</span>
                  )}
                </div>
              </div>

              <Form className="item__form">
                <Form.Field
                  control={Select}
                  onChange={getQty}
                  options={qtyOptions}
                  defaultValue="1"
                  disabled={item.numInStock === 0}
                />
                <Button
                  color="black"
                  type="button"
                  disabled={item.numInStock === 0}
                  onClick={() => addToCartHandler()}
                >
                  ADD TO CART
                </Button>
              </Form>
              <div className="item__social">
                <Icon name="mail outline" size="large" color="black" inverted />
                <Icon name="twitter" size="large" color="black" inverted />
                <Icon name="pinterest" size="large" color="black" inverted />
                <Icon name="facebook" size="large" color="black" inverted />
              </div>
            </div>
            <div className="item__image">
              <img
                src={`${process.env.REACT_APP_STORAGE}/${item.image}?alt=media`}
                alt={item.name}
              />
            </div>
          </div>
          <div className="review">
            {loadingItemReview && <Loader />}
            <h3>Customer Reviews</h3>
            <Comment.Group className="item__review">
              {item.reviews.length > 0 ? (
                item.reviews.map((r) => (
                  <Comment key={r._id}>
                    <Comment.Avatar
                      as="a"
                      src="https://react.semantic-ui.com/images/avatar/small/christian.jpg"
                    />
                    <Comment.Content>
                      <Comment.Metadata>
                        <Ratings rating={r.rating} />
                      </Comment.Metadata>
                      <Comment.Author>{r.name}</Comment.Author>
                      <Comment.Metadata>
                        <div>{r.updatedAt.split("T")[0]}</div>
                      </Comment.Metadata>
                      <Comment.Text>
                        <p>{r.comment}</p>
                      </Comment.Text>
                    </Comment.Content>
                  </Comment>
                ))
              ) : (
                <span className="review__span">
                  Be the first to review this item.
                </span>
              )}

              <h3>Review this item</h3>
              {errorItemReview && (
                <Message>Sorry. You have already reviewed this item</Message>
              )}
              <span className="review__span">
                Share your thoughts with other customers
              </span>
              <Form reply>
                <Form.TextArea onChange={(e) => setComment(e.target.value)} />
                <div className="review-rating">
                  <p>Overall Rating</p>{" "}
                  <Rating
                    maxRating={5}
                    onRate={ratingHandler}
                    size="huge"
                    required
                    clearable
                  />
                </div>
                <Button
                  content="Write a review"
                  basic
                  type="button"
                  onClick={(e) => reviewHandler(e)}
                />
              </Form>
            </Comment.Group>
          </div>
        </div>
      ) : null}
    </>
  )
}
export default ItemScreen
