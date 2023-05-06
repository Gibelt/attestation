import {
  Button,
  InputGroup,
  Form,
  ListGroup,
  Col,
  Image,
  FloatingLabel,
  Spinner,
} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import UserInfo from './components/userInfo/UserInfo'
import Api from './api/api'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import PaginationComponent from './components/pagination/Pagination'

function App() {
  const [users, setUsers] = useState([])
  const [sort, setSort] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [showAllUsers, setShowAllUsers] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [login, setLogin] = useState('')
  const [activePage, setActivePage] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)

  const handelSortChange = (e) => {
    setSort(e.target.value)
    setActivePage(1)
  }

  const handleUserClick = (e) => {
    setLogin(e.target.dataset.name)
    setIsOpen(!isOpen)
  }

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    Api.get(`/users/${searchValue}`).then((res) => {
      setUsers([res.data])
      setTotalUsers(1)
      setShowAllUsers(true)
      setSearchValue('')
      setIsLoading(false)
    })
  }

  const handelShowAllUserClick = () => {
    setShowAllUsers(false)
    setSort('def')
    setActivePage(1)
    Api.get(`/search/users?q=type:user&page=${activePage}`).then((res) => {
      setUsers(res.data.items)
      setTotalUsers(res.data.total_count)
      setIsLoading(false)
    })
  }

  const handelPageClick = (number) => {
    setActivePage(number)
  }

  const handelPrevPageClick = () => {
    if (activePage > 1) {
      handelPageClick(activePage - 1)
    }
  }

  const handelNextPageClick = () => {
    if (activePage < 34) {
      handelPageClick(activePage + 1)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    switch (sort) {
      case 'asc':
        Api.get(
          `search/users?q=type:user&sort=repositories&order=asc&page=${activePage}`
        ).then((res) => {
          setUsers(res.data.items)
          setTotalUsers(res.data.total_count)
          setIsLoading(false)
        })
        break
      case 'desc':
        Api.get(
          `search/users?q=type:user&sort=repositories&order=desc&page=${activePage}`
        ).then((res) => {
          setUsers(res.data.items)
          setTotalUsers(res.data.total_count)
          setIsLoading(false)
        })
        break
      default:
        Api.get(`/search/users?q=type:user&page=${activePage}`).then((res) => {
          setUsers(res.data.items)
          setTotalUsers(res.data.total_count)
          setIsLoading(false)
        })
        break
    }
  }, [sort, activePage])

  const list = users.map((user) => (
    <ListGroup.Item
      data-name={user.login}
      onClick={handleUserClick}
      key={user.id}
      className="list-group-item d-flex justify-content-between align-items-center stretched-link"
      style={{ cursor: 'pointer' }}
    >
      <div className="fw-bold">{user.login}</div>
      <Col xs={2} md={2}>
        <Image src={user.avatar_url} className="img-fluid" rounded />
      </Col>
    </ListGroup.Item>
  ))

  return (
    <div className="App">
      <div className="wrapper mt-5">
        <Form onSubmit={handleSearchSubmit}>
          <Form.Label htmlFor="search">Поиск по логину</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              id="search"
              aria-describedby="basic-addon3"
              onChange={handleSearchChange}
              value={searchValue}
            />
            <Button type="submit" disabled={isLoading || !searchValue}>
              Найти
            </Button>
          </InputGroup>
        </Form>
        {showAllUsers && (
          <Button onClick={handelShowAllUserClick} className="mb-3">
            Показать всех пользователей
          </Button>
        )}
        {!showAllUsers && (
          <FloatingLabel
            className="mb-3"
            controlId="floatingSelect"
            label="Сортировать по количиеству репозиториев"
          >
            <Form.Select id="sort" onChange={handelSortChange}>
              <option value="def">Без сортировки</option>
              <option value="desc">По убыванию</option>
              <option value="asc">По возростанию</option>
            </Form.Select>
          </FloatingLabel>
        )}
        {isOpen && (
          <UserInfo
            login={login}
            show={isOpen}
            onHide={() => setIsOpen(false)}
          />
        )}
        <ListGroup>
          {isLoading ? (
            <Spinner animation="grow" className="align-self-center mt-5" />
          ) : (
            list
          )}
        </ListGroup>
        {totalUsers >= 1000 && (
          <PaginationComponent
            itemsCount={1000}
            itemsPerPage={30}
            currentPage={activePage}
            setCurrentPage={handelPageClick}
            prevPage={handelPrevPageClick}
            nextPage={handelNextPageClick}
          />
        )}
      </div>
    </div>
  )
}

export default App
