import React, { useState } from 'react';
import { authAPI } from '../api/api';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddLink() {
    const [url, setUrl] = useState('');
    const [show, setShow] = useState(false);
    const [dataUri, setDataUri] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function resetHandler() {
        setUrl('');
    }
    function typeLinkHandler(e) {
        setUrl(e.target.value);
    }
    function addHandler() {
        authAPI.uriAdd(url).then(result => {
            if (result.status === 200) {
                console.log(result.data)
                setDataUri(result.data);
                handleShow();
                setUrl('');
                return result.data
            }
        })
    }

    return (
        <>
            <ModalWin handleClose={handleClose} show={show} dataUri={dataUri} />
            <Stack direction="horizontal" gap={3}>
                <Form.Control className="me-auto" placeholder="Add your target URI here..." value={url} onChange={typeLinkHandler} />
                <Button variant="secondary" disabled={url === ''} onClick={addHandler}>Add</Button>
                <div className="vr" />
                <Button variant="outline-danger" disabled={url === ''} onClick={resetHandler}>Reset</Button>
            </Stack>
        </>
    )
}

function ModalWin({ show, handleClose, dataUri }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Link added</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your short link is: {dataUri.short}. ID: {dataUri.id}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
