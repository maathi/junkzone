import React from "react"
// import Ratings from "../components/Ratings"
import { Link } from "react-router-dom"

const Item = ({ item }) => {
  return (
    <div className="card">
      <div className="card__image">
        <Link to={`/item/${item._id}`}>
          <img
            src={`${process.env.REACT_APP_STORAGE}/${item.image}?alt=media`}
            alt={item.name}
          />
        </Link>
        {item.numInStock === 0 ? (
          <Link to={`/item/${item._id}`}>
            <span className="card__addtocart">Add to Cart</span>
          </Link>
        ) : (
          <Link to={`/cart/${item._id}?qty=${1}`}>
            <span className="card__addtocart">Add to Cart</span>
          </Link>
        )}
      </div>
      <Link to={`/item/${item._id}`}>
        <div className="card__title">{item.name}</div>
      </Link>
      <div className="card__rating">
        {/* <Ratings rating={item.rating} /> */}
      </div>

      <div className="card__price">${item.price}</div>
    </div>
  )
}

export default Item
