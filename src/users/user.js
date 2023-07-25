import React, {useState, useEffect} from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import './users.css';
import { Form, Container, Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import TextAlign from '../csscomponent/textalign';
import Padding from '../csscomponent/padding';
import Width from '../csscomponent/width';
import Text from '../csscomponent/fontweight';
import FontSize from '../csscomponent/fontsize';
import Color from '../csscomponent/color';
export default function User() {
    const [err, setErr] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const type = (id === 'new') ? 'Add' : 'Edit';

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect (()=>{
        document.getElementById('navUsers').classList.add('active');

    },[])
    return (
        <div>
            <Header />
            <Container>
                <Form method='POST' className='my-5' onSubmit={handleSubmit}>
                    <Width width="100%">
                        <Form.Group>
                            <Row>
                                <Col sm={6}>
                                    <TextAlign alignment="left">
                                        <Text fontWeight="bold">
                                            <FontSize fontSize="22px">{type} User</FontSize>
                                        </Text>
                                    </TextAlign>
                                </Col>
                                <Col sm={6}>
                                    <TextAlign alignment="right">
                                        <Text fontWeight="bold">
                                            <Col sm={{ span: 12 }}>
                                                <Button type="submit" className='btn btn-success me-1'>
                                                    <Padding size="5px">
                                                        <FontAwesomeIcon icon={type==='Add'? faAdd : faEdit} /> {type}
                                                    </Padding>
                                                </Button>

                                                <NavLink to="/users" className='btn btn-danger ms-1'>
                                                    <Padding size="5px">
                                                        <FontAwesomeIcon icon={faClose} /> Cancel
                                                    </Padding>
                                                </NavLink>
                                            </Col>
                                        </Text>
                                    </TextAlign>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="text-center">
                            <Text>{err && <Color color="red">{err}</Color>}</Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formName">
                            <TextAlign alignment="left">Name</TextAlign>
                            <Form.Control type="text" placeholder="Enter Name" style={{ padding: "10px" }} autoComplete='off' />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formMoble">
                            <TextAlign alignment="left">Mobile Number</TextAlign>
                            <Form.Control type="text" placeholder="Enter Mobile Number" style={{ padding: "10px" }} autoComplete='off' />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEMail">
                            <TextAlign alignment="left">EMail Address</TextAlign>
                            <Form.Control type="email" placeholder="Enter EMail Address" style={{ padding: "10px" }} autoComplete='off' />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <TextAlign alignment="left">Password</TextAlign>
                            <Form.Control type="password" placeholder="Enter Password" style={{ padding: "10px" }} autoComplete='off' />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formStatus">
                            <TextAlign alignment="left">Status</TextAlign>
                            <Form.Select>
                                <option disabled selected>Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formRoles">
                            <TextAlign alignment="left">Roles</TextAlign>
                            <Form.Select>
                                <option disabled selected>Select Roles</option>
                                <option value="Superadmin">Super Admin</option>
                                <option value="Admin">Admin</option>
                            </Form.Select>
                        </Form.Group>
                    </Width>
                </Form>
            </Container>
            <Footer />
        </div>
    )
}
