import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders, deleteOrder } from '../actions/orderActions'
import { Helmet } from 'react-helmet'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)

  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const orderDelete = useSelector((state) => state.orderDelete)

  const { success: successDelete } = orderDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteOrder(id))
    }
  }

  return (
    <>
      <Helmet>
        <title>Auto Junction: Orders List</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
      <h1>Orders</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {orders.length === 0 ? (
            <h1 className='fs-1 text-center'>No orders found</h1>
          ) : (
            <Table
              striped='true'
              bordered='true'
              hover='true'
              responsive='true'
              className='table-sm'
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>Total Price</th>
                  <th>Delivered On</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <Button
                        variant='danger'
                        className='btn-sm rounded'
                        onClick={() => deleteHandler(order._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant='light' className='btn-sm rounded'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  )
}

export default OrderListScreen
