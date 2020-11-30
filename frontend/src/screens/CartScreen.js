import React, { useEffect, } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartAction'

const CartScreen = ({ match, history }) => {

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const productId = match.params.id
    const qty = Number(new URLSearchParams(useLocation().search).get("qty"))

    const dispatch = useDispatch()

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFronCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect= shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping cart</h1>

                {cartItems.length === 0
                    ? (<Message>
                        Your cart is empty   <Link to='/' className={'ml-2'}><strong> Go Back</strong></Link>
                    </Message>
                    )
                    : (<ListGroup variant="flush">
                        {
                            cartItems.map(item => {
                                return (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>${item.price}</Col>
                                            <Col md={2}>
                                                <Form.Control as="select" value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {
                                                        [...Array(item.countInStock).keys()].map(key => {
                                                            return <option key={key + 1} value={key + 1}>
                                                                {key + 1}
                                                            </option>
                                                        })
                                                    }
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Button
                                                    type='button'
                                                    onClick={() => removeFronCartHandler(item.product)} >
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            })
                        }
                    </ListGroup>
                    )
                }

            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>
                                Subtotal
                                ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                items
                            </h3>
                            <h3>
                                ${cartItems.reduce((acc, item) => acc + (item.qty * item.price), 0).toFixed(2)}
                            </h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}>
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>

        </Row >
    )
}

export default CartScreen
