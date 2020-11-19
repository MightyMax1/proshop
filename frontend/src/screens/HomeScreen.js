import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Product from '../components/product'


const HomeScreen = () => {
    const [Products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('api/products');
            const { data } = res;
            setProducts(data)
        }
        fetchProducts()
    }, [])

    return (
        <>
            <h3>LATEST PRODUCTS</h3>
            <Row>
                {Products.map(product => (
                    <Col key={product._id} xs={12} sm={6} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
