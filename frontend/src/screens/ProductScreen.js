import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Image, ListGroup, Button } from 'react-bootstrap'
import Rating from '../components/Rating'



const ProductScreen = ({ match }) => {

    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios(`/api/products/${match.params.id}`)
            const product = res.data;
            setProduct(product)
        }
        fetchProduct()
    }, [match.params.id])

    return (
        <>
            <Link className='btn btn-dark my-3 ' to='/' >
                go back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush" className='text-center'>
                        <ListGroup.Item>
                            <h3><strong>{product.name}</strong></h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: {product.price}$
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup className='text-center'>
                            <ListGroup.Item>
                                Price: {product.price}$
                        </ListGroup.Item>
                            <ListGroup.Item>
                                status: {product.countInStock > 1 ? 'in stock' : 'out of stock'}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    disabled={product.countInStock === 0}
                                >
                                    Add to cart
                            </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen
