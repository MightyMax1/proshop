import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProduct, deleteProduct } from '../actions/productActions'

const ProductListScreen = ({ match, history }) => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const { error: errorDelete, success: successDelete, loading: loadingDelete } = productDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProduct())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete])

    const deleteHandler = (productId) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(productId))
        }
    }

    const createProductHandler = () => {

    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i>Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete
                ? <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : ''
            }
            {loading
                ? <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICR</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <LinkContainer to={`/admin/priduct/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm ml-3' onClick={() => deleteHandler(product._id)}>
                                                <i className='fas fa-trash' ></i>
                                            </Button>
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

export default ProductListScreen
