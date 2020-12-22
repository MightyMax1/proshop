import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProduct } from '../actions/productActions'


const HomeScreen = ({ match }) => {

    const keyword = match.params.keyword

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList


    useEffect(() => {
        dispatch(listProduct(keyword))
    }, [dispatch, keyword])

    return (
        <>
            <h3>LATEST PRODUCTS</h3>
            {loading ? <Loader /> :
                error ? <Message variant={'danger'} text={error} /> :
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} xs={12} sm={6} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
            }
        </>
    )
}

export default HomeScreen
