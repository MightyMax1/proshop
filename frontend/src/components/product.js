import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { LinkContainer } from 'react-router-bootstrap'

const product = ({ product }) => {
    return (

        <Card className={'my-3  p-3 rounded'}>
            <LinkContainer to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </LinkContainer>
            <Card.Body>
                <LinkContainer to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong> {product.name}</strong>
                    </Card.Title>
                </LinkContainer>
                <Card.Text as='div' className='py-2'>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </Card.Text>
                <Card.Text as='h4'>
                    ${product.price}
                </Card.Text>

            </Card.Body>

        </Card>
    )
}

export default product
