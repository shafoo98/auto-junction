import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
import { Helmet } from 'react-helmet'

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)

  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)

  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
  }
  return (
    <>
      <Helmet>
        <title>Auto Junction: User List</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <h1>Users</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table
          striped='true'
          bordered='true'
          hover='true'
          responsive='sm'
          className='table-sm'
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm rounded'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  {!user.isAdmin ? (
                    <></>
                  ) : (
                    <Button
                      variant='danger'
                      className='ms-2 btn-sm rounded'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
