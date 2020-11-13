import Rceact from 'react'
import { Card } from 'react-bootstrap'

const product = ({ product }) => {
    return (

        <Card>
            <a href={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </a>
            <Card.Body>
                <a href={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong> {product.name}</strong>
                    </Card.Title>
                </a>
                <Card.Text className='py-1'>
                    rate {product.rating} of {product.numReviews} reviews
                    </Card.Text>
                <Card.Text as='h5'>
                    ${product.price}
                </Card.Text>

            </Card.Body>

        </Card>
    )
}

export default product
