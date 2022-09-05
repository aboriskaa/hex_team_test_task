import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from "react-router-dom";

// 'sm', 'md', 'lg', 'xl', 'xxl'

export default function NavBar() {

    let navigate = useNavigate();

    function exitHandler() {
        localStorage.clear();
        navigate('/login')
    }

    return (
        <>
            {['xl'].map((expand) => (
                <Navbar key={expand} bg="light" expand={expand} className="mb-3">
                    <Container fluid>
                        <LinkContainer to="/">
                            <Navbar.Brand>Short links service</Navbar.Brand>
                        </LinkContainer>

                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Menu
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    {!localStorage.getItem('userAuth') ?
                                        <>
                                            <LinkContainer to="/">
                                                <Nav.Link>Home</Nav.Link>
                                            </LinkContainer>
                                            <LinkContainer to="login">
                                                <Button variant="outline-primary" size="md">Login</Button>
                                            </LinkContainer></> :
                                        <>
                                            <Nav.Link eventKey="disabled" disabled>User name:  {localStorage.getItem('userName')}</Nav.Link>
                                            <Button onClick={exitHandler} variant="outline-danger" size="md">Logout</Button>
                                        </>}
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    )
}
