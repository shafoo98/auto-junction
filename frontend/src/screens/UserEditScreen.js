import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, editUser } from '../actions/userActions'
import { USER_EDIT_RESET } from '../constants/userConstants'
import { Helmet } from 'react-helmet'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)

  const { loading, error, user } = userDetails

  const userEdit = useSelector((state) => state.userEdit)

  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = userEdit

  useEffect(() => {
    if (successEdit) {
      dispatch({ type: USER_EDIT_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, successEdit, user._id, user.email, user.name, userId])

  const submitHandler = (e) => {
    e.preventDefault()
    //Dispatch Edit user here
    dispatch(editUser({ _id: userId, name, email }))
  }
  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3 rounded'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingEdit && <Loader></Loader>}
        {errorEdit && <Message variant='danger'>{errorEdit}</Message>}
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Helmet>
              <title>User edit screen</title>
              <meta name='description' content='Helmet application' />
            </Helmet>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name' className='mb-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='email' className='mb-2'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary' className='my-2 rounded'>
                Edit
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
