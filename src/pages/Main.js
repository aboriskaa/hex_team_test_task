import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShortLinks from '../components/ShortLinks';
export default function Main() {

    return (<>
        {
            !localStorage.getItem('userAuth') ?
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto">Short links service
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="auto">Please, login for use it...
                        </Col>
                    </Row>
                </Container> :
                <ShortLinks />
        }
    </>
    )
}
