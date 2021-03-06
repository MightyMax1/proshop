import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, FormGroup } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUser } from '../actions/userAction'
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_RESET } from '../constants/userConstant'

const UserEditScreen = ({ match, history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(null)

    const userId = match.params.id

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [dispatch, userId, user, successUpdate])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({
            _id: userId,
            name,
            email,
            isAdmin
        }))
    }

    return (
        <div>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Uder</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading
                    ? <Loader>Loading...</Loader>
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        : (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name'>
                                    <Form.Label>name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter full name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='email'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='isAdmin'>
                                    <Form.Check
                                        type='checkbox'
                                        label='Is Admin'
                                        value={isAdmin}
                                        checked={isAdmin}
                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                    ></Form.Check>
                                </Form.Group>
                                <Button type='submit' variant='primary'  >
                                    Update
                </Button>
                            </Form>
                        )
                }
            </FormContainer >
        </div>
    )
}

export default UserEditScreen
