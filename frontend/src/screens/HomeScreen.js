import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/product'
import { listProduct } from '../actions/productActions'


const HomeScreen = () => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList


    useEffect(() => {
        dispatch(listProduct())
    }, [dispatch])

    return (
        <>
            <h3>LATEST PRODUCTS</h3>
            {loading ? <h2>Loading...</h2> :
                error ? <h3>{error}</h3> :
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
