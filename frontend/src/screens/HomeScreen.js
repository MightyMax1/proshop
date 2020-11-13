import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Products from '../products'
import Product from '../components/product'

const HomeScreen = () => {
    return (
        <>
            <h3>LATEST PRODUCTS</h3>
            <Row>
                {Products.map(product => (
                    <Col xs={12} sm={6} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}

            </Row>

        </>
    )
}

export default HomeScreen
