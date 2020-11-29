import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { detailsProduct } from '../actions/productActions'



const ProductScreen = ({ match, history }) => {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails


    useEffect(() => {

        dispatch(detailsProduct(match.params.id))

    }, [match.params.id, dispatch])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <>

            <Link className='btn btn-dark my-3 ' to='/' >
                go back
            </Link>
            {loading ? <Loader /> :
                error ? <Message variant={'danger'} text={error} /> :
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
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Qty:
                                                </Col>
                                                <Col>
                                                    <Form.Control as="select" value={qty} onChange={e => setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map(key => {
                                                                return <option key={key + 1} value={key + 1}>
                                                                    {key + 1}
                                                                </option>
                                                            })
                                                        }
                                                    </Form.Control>

                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            disabled={product.countInStock === 0}
                                            onClick={addToCartHandler}
                                        >
                                            <strong>Add to cart</strong>
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
            }

        </>
    )
}

export default ProductScreen
