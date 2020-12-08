import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartAction'
import { CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'

const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAdress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }


    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Address'
                        value={address}
                        onChange={(e) => setAdress(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter postalCode'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
