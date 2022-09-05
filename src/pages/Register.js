import React, { useState } from 'react';

import { authAPI } from '../api/api'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Error from '../components/Error'
// import uuid from 'react-uuid';


export default function Register() {

    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [register, setRegister] = useState(false);

    function usernameHandler(e) {
        setUsername(e.currentTarget.value)
    }

    function passwordHandler(e) {
        setPassword(e.currentTarget.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        authAPI.register(username, password).then(result => {
            if (result.ethError !== null) {
                setError(`Error data: ${result.ethError}`)
                setShow(true);
            }
            if (result.status !== 200) {
                let errorMes = '';
                for (let key in result.data) {
                    errorMes += result.data[key]
                }
                setError(` Error code: ${result.status}, Error data: ${errorMes}`);
                setLoading(false);
                setShow(true);

            }
            if (result.status === 200) return true
        }).then(result => {
            if (result) {
                // console.log('local storage set: userAuth: true')
                // localStorage.setItem('userAuth', true);
                // localStorage.setItem('userName', username);
                setLoading(false);
                setRegister(true);
            }
        })
    }

    return (
        <Container>
            {!loading ?
                <>
                    {register ?
                        <Row className="justify-content-md-center p-3 border bg-light">
                            <Col md="auto">
                                <Alert variant="success">
                                    Congratulations! You can  <Link to="/login">log in</Link> to the app!
                                </Alert>
                            </Col>
                        </Row>
                        :
                        <>
                            <Error show={show} error={error} setShow={setShow} />
                            <Row className="justify-content-md-center p-3 border bg-light">
                                <Col md="auto">
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicUsername">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control as="input" onChange={usernameHandler} value={username} placeholder="Enter username" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control onChange={passwordHandler} value={password} type="password" placeholder="Password" />
                                        </Form.Group>

                                        <Button variant="primary" type="submit">
                                            Sign Up
                                        </Button>
                                    </Form>
                                </Col>
                            </Row></>
                    }
                </>
                :
                <Row className="justify-content-md-center p-3 border bg-light">
                    <Col md="auto">
                        <Spinner animation="grow" variant="success" />
                    </Col>
                </Row>
            }
        </Container>
    )
}
