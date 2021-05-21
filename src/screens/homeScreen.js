import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Item from "../components/item"
import { listItems, itemAdd } from "../actions/itemActions"
import { Message } from "semantic-ui-react"
import Loader from "../components/loader"
import Paginate from "../components/paginate"
import Meta from "../components/meta"

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const itemList = useSelector((state) => state.itemList)
  const { loading, items, error, totalPages, selectedPage } = itemList

  useEffect(() => {
    dispatch(listItems(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta title="Welcome" />
      {loading ? (
        <Loader />
      ) : error ? (
        <div>
          <Message
            style={{ margin: "0 auto", width: "50%" }}
            error
            header="Something went wrong. Please try again"
            list={[error]}
          />
        </div>
      ) : (
        <div className="item-card">
          {keyword && !itemList.items.length && (
            <Message
              style={{ margin: "5rem auto", width: "50%" }}
              header={`No results for ${keyword}`}
              content="Try checking your spelling or use more general terms"
            />
          )}
          <div className="card-container">
            {items
              .sort((a, b) => b.price - a.price)
              .filter((r) => r.name !== "Sample name")
              .map((i) => (
                <Item item={i} key={i._id} />
              ))}
          </div>
          <Paginate
            totalPages={totalPages}
            selectedPage={selectedPage}
            keyword={keyword}
          />
        </div>
      )}
    </>
  )
}

export default HomeScreen
