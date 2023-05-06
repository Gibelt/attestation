import { useEffect } from 'react'
import Pagination from 'react-bootstrap/Pagination'

function PaginationComponent({
  itemsCount,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  prevPage,
  nextPage,
  alwaysShown = true,
}) {
  const pagesCount = Math.ceil(itemsCount / itemsPerPage)
  const isPaginationShown = alwaysShown ? true : pagesCount > 1
  const isCurrentPageFirst = currentPage === 1
  const isCurrentPageLast = currentPage === pagesCount

  const changePage = (number) => {
    if (currentPage === number) return
    setCurrentPage(number)
  }

  const handelPageClick = (pageNumber) => {
    changePage(pageNumber)
  }

  const setLastPageAsCurrent = () => {
    if (currentPage > pagesCount) {
      setCurrentPage(pagesCount)
    }
  }

  let isPageNumberOutOfRange

  const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1
    const isPageNumberFirst = pageNumber === 1
    const isPageNumberLast = pageNumber === pagesCount
    const isCurrentPageWithinTwoPageNumbers =
      Math.abs(pageNumber - currentPage) <= 2

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false
      return (
        <Pagination.Item
          key={pageNumber}
          onClick={() => handelPageClick(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </Pagination.Item>
      )
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true
      return <Pagination.Ellipsis key={pageNumber} className="muted" />
    }
    return null
  })

  useEffect(setLastPageAsCurrent, [pagesCount])

  return (
    <>
      {isPaginationShown && (
        <Pagination className="justify-content-center mt-3">
          <Pagination.Prev onClick={prevPage} disabled={isCurrentPageFirst} />
          {pageNumbers}
          <Pagination.Next onClick={nextPage} disabled={isCurrentPageLast} />
        </Pagination>
      )}
    </>
  )
}

export default PaginationComponent
