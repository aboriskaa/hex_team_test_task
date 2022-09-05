import React, { useState } from 'react';
import { authAPI } from '../api/api'
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Error from '../components/Error';

export default function Login() {
    let navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function usernameHandler(e) {
        setUsername(e.currentTarget.value)
    }

    function passwordHandler(e) {
        setPassword(e.currentTarget.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        authAPI.login(username, password).then(result => {
            if (result.ethError !== null) {
                setError(`Error data: ${result.ethError}`)
                setShow(true);
                setLoading(true);
            }
            if (result.status !== 200) {
                let errorMes = '';
                for (let key in result.data) {
                    errorMes += result.data[key]
                }
                setError(` Error code: ${result.status}, Error data: ${errorMes}`)
                setShow(true);
                setLoading(true);
            }
            if (result.status === 200) return result.data
        }).then(data => {
            if (data) {
                localStorage.setItem('userAuth', true);
                localStorage.setItem('userName', username);
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('token_type', data.token_type);
                setLoading(false);
                navigate("/");
            }
        })
    }

    return (
        <Container>
            {!loading ?
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
                                    Login
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center p-3 border bg-light">
                        <Col md="auto">
                            If you don't have an account yet, you may create it by your own.
                            <LinkContainer to="/register">
                                <Button className="m-2" variant="outline-success">Sign Up</Button>
                            </LinkContainer>
                        </Col>
                    </Row></>
                :
                <Row className="justify-content-md-center p-3 border bg-light">
                    <Col md="auto">
                        <Spinner animation="grow" variant="success" />
                    </Col>
                </Row>}
        </Container>
    )
}
