import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'

const UserListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userList = useSelector((state) => state.userList)
  const userLogin = useSelector((state) => state.userLogin)
  const userDelete = useSelector((state) => state.userDelete)

  const { userInfo } = userLogin
  const { users, loading, error } = userList
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else if (!userInfo.isAdmin) {
      navigate('/')
    } else {
      dispatch(listUsers())
    }
  }, [userInfo, dispatch, navigate, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <main className='mt-3'>
      <Container>
        <h1>Users</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger' message={error} />
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
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
                    <a href={`mailto:${user.mail}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button className='btn-sm' variant='light'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      className='btn-sm'
                      variant='danger'
                      onClick={() => {
                        deleteHandler(user._id)
                      }}
                    >
                      {' '}
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </main>
  )
}

export default UserListScreen
