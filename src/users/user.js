import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import './users.css';
import { Form, Container, Col, Modal, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import TextAlign from '../csscomponent/textalign';
import Padding from '../csscomponent/padding';
import Width from '../csscomponent/width';
import Text from '../csscomponent/fontweight';
import FontSize from '../csscomponent/fontsize';

export default function User() {
    const [data, setData] = useState({ userName: '', userMobile: '', userEmail: '', userPassword: '', userStatus: '', userRole: '' });
    const [confirmShow, setConfirmShow] = useState(false);
    const [err, setErr] = useState('');
    const { id } = useParams();
    const type = (id === 'new') ? 'Add' : 'Edit';

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    }

    const handleMobileChange = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value.replace(/\D/g, '') });
    }

    const handleBlur = (e) => {
        e.target.value = e.target.value.trim();
        const { id, value } = e.target;
        setData({ ...data, [id]: value.trim() });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const nameRegex = new RegExp(/^[A-Za-z\s]*$/)
        if (!data.userName.trim()) {
            setConfirmShow(true);
            setErr('Enter the Name');
        } else if (data.userName.length < 5) {
            setConfirmShow(true);
            setErr('Minimum Name length should be atleast 5 Character Long');
        } else if (!nameRegex.test(data.userName)) {
            setConfirmShow(true);
            setErr('Invalid User Name');
        } else if (!data.userMobile.trim()) {
            setConfirmShow(true);
            setErr('Enter the Mobile Number');
        } else if (!data.userEmail.trim()) {
            setConfirmShow(true);
            setErr('Enter the Email ID');
        } else if (!data.userPassword.trim()) {
            setConfirmShow(true);
            setErr('Enter the password');
        } else if (!data.userStatus.trim()) {
            setConfirmShow(true);
            setErr('Select the Status');
        } else if (!data.userRole.trim()) {
            setConfirmShow(true);
            setErr('Select the Role');
        } else {
            setConfirmShow(false);
            setErr('');
            console.log(data);
        }
    }

    useEffect(() => {
        document.getElementById('navUsers').classList.add('active');

    }, [])
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
                                                        <FontAwesomeIcon icon={type === 'Add' ? faAdd : faEdit} /> {type}
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
                        <Form.Group className="mb-3" controlId="userName">
                            <TextAlign alignment="left">Name</TextAlign>
                            <Form.Control type="text" placeholder="Enter Name" style={{ padding: "10px" }} autoComplete='off' value={data.userName} maxLength={50} onChange={handleChange} onBlur={handleBlur} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="mobile">
                            <TextAlign alignment="left">Mobile Number</TextAlign>
                            <Form.Control type="text" placeholder="Enter Mobile Number" style={{ padding: "10px" }} autoComplete='off' maxLength={10} value={data.userMobile} onChange={handleMobileChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <TextAlign alignment="left">EMail Address</TextAlign>
                            <Form.Control type="email" placeholder="Enter EMail Address" style={{ padding: "10px" }} autoComplete='off' value={data.userEmail} onChange={handleChange} onBlur={handleBlur} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <TextAlign alignment="left">Password</TextAlign>
                            <Form.Control type="password" placeholder="Enter Password" style={{ padding: "10px" }} autoComplete='off' value={data.userPassword} onChange={handleChange} onBlur={handleBlur} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="status">
                            <TextAlign alignment="left">Status</TextAlign>
                            <Form.Select value={data.userStatus} onChange={handleChange}>
                                <option value='' disabled selected>Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="role">
                            <TextAlign alignment="left">Role</TextAlign>
                            <Form.Select value={data.userRole} onChange={handleChange}>
                                <option value='' disabled selected>Select Role</option>
                                <option value="Superadmin">Super Admin</option>
                                <option value="Admin">Admin</option>
                            </Form.Select>
                        </Form.Group>
                    </Width>
                </Form>
            </Container>
            <Footer />
            <Modal show={confirmShow} onHide={() => setConfirmShow(false)} animation={false} >
                <Modal.Header closeButton className='text-center'>
                    <Modal.Title className='text-center text-bold'>Required Filed</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center exit'>{err}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='cutomof' onClick={() => setConfirmShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
