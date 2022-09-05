import React, { useState, useCallback, useEffect } from 'react';
import { authAPI } from '../api/api'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Error from '../components/Error'
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import AddLink from './AddLink';
import styles from './ShortLinks.module.css'
import copy from 'copy-to-clipboard';

export default function ShortLinks() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [order, setOrder] = useState("asc_counter");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [dataLinks, setDataLinks] = useState([]);
  const [pagination, setPagination] = useState([]);

  const baseURL = "http://79.143.31.216/"

  const dataL = useCallback(async () => {
    setLoading(true);
    let fetchData;
    try {
      fetchData = await authAPI.showLinks(order, offset, limit)
      setDataLinks([...fetchData.data])
      let paginationArray = [];
      for (let number = offset; number < offset + 6; number++) {
        paginationArray.push(
          <Pagination.Item key={number} active={number === offset} onClick={() => {
            setOffset(number);
          }}>
            {number + 1}
          </Pagination.Item>
        );
      }
      setPagination(paginationArray);
    } catch (error) {
      setError(error);
      setShow(true);
    }


  }, [order, offset, limit])


  useEffect(() => {
    dataL().then(() => setLoading(false)).catch(console.error);;
  }, [dataL])

  function prevHandler() {
    setOffset((prev) => prev - 1);
  }
  function nextHandler() {
    setOffset((prev) => prev + 1);
  }

  function limitHandler(e) {
    setLimit(e.target.value)
  }
  function toggleShortLinkHandler() {
    order === "asc_short" ? setOrder("desc_short") : setOrder("asc_short")
  }
  function toggleNativeLinksHandler() {
    order === "asc_target" ? setOrder("desc_target") : setOrder("asc_target")
  }

  function toggleCounterHandler() {
    order === "asc_counter" ? setOrder("desc_counter") : setOrder("asc_counter")
  }

  return (
    <Container>

      <Error show={show} error={error} setShow={setShow} />
      <Row className="justify-content-md-center p-3 border bg-light">
        <Col md="auto">
          <Stack gap={2} className={styles.linksGrid}>

            <AddLink />
            <Form.Group className="mb-12">
              <Form.Label>Select the number of entries on the page</Form.Label>
              <Form.Select onChange={limitHandler}>
                <option selected>10</option>
                <option>20</option>
                <option>30</option>
              </Form.Select>
            </Form.Group>

            {!loading ?
              <Table striped bordered hover variant="dark" responsive="md">
                <thead>
                  <tr>
                    <th>
                      #
                    </th>
                    <th>
                      <Nav.Item>
                        <Nav.Link onClick={toggleNativeLinksHandler}>Native link</Nav.Link>
                      </Nav.Item>
                    </th>
                    <th>
                      <Nav.Item>
                        <Nav.Link onClick={toggleShortLinkHandler}>Short link (Click and get link)</Nav.Link>
                      </Nav.Item>
                    </th>
                    <th>
                      <Nav.Item>
                        <Nav.Link onClick={toggleCounterHandler}>Counter</Nav.Link>
                      </Nav.Item>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataLinks.map((el, idx) => {
                    return (
                      <tr key={idx}>
                        <td key={idx + 1}>{el.id}</td>
                        <td key={idx + 2}>{el.target.substring(0, 50) + "..."}</td>
                        <td key={idx + 3}>
                          <Nav.Item>
                            <Nav.Link onClick={() => {
                              copy(baseURL + "s/" + el.short);
                            }}>{el.short}</Nav.Link>
                          </Nav.Item>
                        </td>
                        <td key={idx + 4}>{el.counter}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              : <Row className="justify-content-md-center p-3 border bg-light">
                <Col md="auto">
                  <Spinner animation="grow" variant="success" />
                </Col>
              </Row>
            }
            <Pagination className={styles.paginator}>
              {offset === 0 ? <Pagination.Prev disabled /> : <Pagination.Prev onClick={prevHandler} />}
              {pagination}
              {dataLinks < limit ? <Pagination.Next disabled /> : <Pagination.Next onClick={nextHandler} />}
              {/* <Pagination.Next onClick={nextHandler} /> */}
            </Pagination>

          </Stack>
        </Col>
      </Row>
    </Container >
  )
}
