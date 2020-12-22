import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProduct, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstats'

const ProductListScreen = ({ match, history }) => {

    const dispatch = useDispatch()

    const pageNumber = match.params.pageNumber || 1

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const { error: errorDelete, success: successDelete, loading: loadingDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { error: errorCreate, success: successCreate, loading: loadingCreate, product: createdProduct } = productCreate


    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if (!userInfo.isAdmin) {
            history.push('/login')
        }
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProduct('', pageNumber))
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])

    const deleteHandler = (productId) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(productId))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
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
                : errorDelete
                    ? <Message variant='danger'>{errorDelete}</Message>
                    : ''
            }
            {loadingCreate
                ? <Loader />
                : errorCreate
                    ? <Message variant='danger'>{errorCreate}</Message>
                    : ''
            }
            {loading
                ? <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <>
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
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
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
                            <Paginate pages={pages} page={page} isAdmin={true} />
                        </>
                    )

            }
        </div>
    )
}

export default ProductListScreen
