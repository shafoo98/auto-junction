import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '', category= '' }) => {
  return (
    pages > 1 && (
      <Pagination className='mt-3 w-25'>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? category
                : `/${category}`   
                ? keyword
                  : `/search/${keyword}/page/${x + 1}`
                  ? `/page/${x + 1}`
                : `/admin/productList/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
