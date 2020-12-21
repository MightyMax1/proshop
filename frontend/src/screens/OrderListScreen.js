import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listAllOrders } from '../actions/orderAction'

const OrderListScreen = ({ match, history }) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderListAll = useSelector(state => state.orderListAll)
    const { error, loading, orders } = orderListAll


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listAllOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    return (
        <div>
            <h1>Orders</h1>
            {loading
                ? <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <th>ID</th>
                                <th>User</th>
                                <th>Created</th>
                                <th>Price</th>
                                <th>Paid</th>
                                <th>Deliverd</th>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order.user.name}</td>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 19)}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            {
                                                order.isPaid
                                                    ? (<i className='fas fa-check' style={{ color: 'green' }}></i>)
                                                    : (<i className='fas fa-times' style={{ color: 'red' }}></i>)
                                            }
                                        </td>
                                        <td>
                                            {
                                                order.isDelivered
                                                    ? (<i className='fas fa-check' style={{ color: 'green' }}></i>)
                                                    : (<i className='fas fa-times' style={{ color: 'red' }}></i>)
                                            }
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-info-circle'></i>
                                                    {' '} More Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
            }
        </div>
    )
}

export default OrderListScreen
