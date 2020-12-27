import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import Product from '../components/product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { listProduct } from '../actions/productActions'
import { Link } from 'react-router-dom'



const HomeScreen = ({ match }) => {

    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProduct(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            {!keyword
                ? <ProductCarousel />
                : <Link to='/' className='btn btn-light mb-3'>Go Back</Link>
            }
            <h3>LATEST PRODUCTS</h3>
            {
                loading ? <Loader /> :
                    error ? <Message variant={'danger'} text={error} /> :
                        <>
                            <Row>
                                {products.map(product => (
                                    <Col key={product._id} xs={12} sm={6} md={6} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                ))}
                            </Row>
                            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                        </>
            }
        </>
    )
}

export default HomeScreen
