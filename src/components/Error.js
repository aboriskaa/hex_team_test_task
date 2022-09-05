import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';


export default function Error({ show, error, setShow }) {
    return (
        <Row className="justify-content-md-center">
            <Col md="auto">
                {show && <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        {error}
                    </p>
                </Alert>}

            </Col>
        </Row>
    )
}
