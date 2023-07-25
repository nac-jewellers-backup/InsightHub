import React, { useEffect, useState } from 'react'
import Header from '../header/header';
import Footer from '../footer/footer';
import './users.css';
import { Container, Col, Row, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import TextAlign from '../csscomponent/textalign';
import Padding from '../csscomponent/padding';
import Text from '../csscomponent/fontweight';
import FontSize from '../csscomponent/fontsize';
import { useNavigate, NavLink } from 'react-router-dom';
import DataTable from 'react-data-table-component';

export default function Users() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [confirmShow, setConfirmShow] = useState(false);
    const [del, setDel] = useState('');
    const [delMsg, setDelMsg] = useState({ title: '', msg: '' });
    const editUser = (id) => { navigate(`/user/${id}`); }

    const deleteUser = () => {
        alert(del);
        setShow(false);
        setConfirmShow(true);
        setDelMsg({ title: 'Deleted', msg: 'Deleted Successfully' });
    }

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Mobile',
            selector: row => row.mobile,
            sortable: true
        },
        {
            name: 'EMail',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true
        },
        {
            name: 'Actions',
            button: true,
            cell: (row) => (
                <>
                    <FontAwesomeIcon icon={faEdit} className='text-primary me-1' style={{ 'cursor': 'pointer' }} title='Edit' onClick={() => editUser(row.id)} />
                    <FontAwesomeIcon icon={faTrash} className='text-danger ms-1' style={{ 'cursor': 'pointer' }} title='Delete' onClick={() => { setShow(true); setDel(row.id) }} />
                </>
            )
        },
    ];

    const data = [
        {
            id: 1,
            name: 'Raman',
            mobile: '8056553720',
            email: 'r.v.raman2312@gmail.com',
            status: 'Active',
            role: 'Super Admin'
        },
        {
            id: 2,
            name: 'Raman R V',
            mobile: '8056553720',
            email: 'r.v.raman2312@gmail.com',
            status: 'Active',
            role: 'Admin'
        },
    ]

    useEffect(() => {
        document.getElementById('navUsers').classList.add('active');
        document.title = 'Users List | Insight Hub';
    }, [])
    return (
        <div>
            <Header />
            <Container fluid className='pt-5 px-5'>
                <Row>
                    <Col sm={6}>
                        <TextAlign alignment="left">
                            <Text fontWeight="bold">
                                <FontSize fontSize="22px">User List</FontSize>
                            </Text>
                        </TextAlign>
                    </Col>
                    <Col sm={6}>
                        <TextAlign alignment="right">
                            <Text fontWeight="bold">
                                <Col sm={{ span: 12 }}>
                                    <NavLink to="/user/new" className='btn btn-success'>
                                        <Padding size="5px">
                                            <FontAwesomeIcon icon={faAdd} /> Add Users
                                        </Padding>
                                    </NavLink>
                                </Col>
                            </Text>
                        </TextAlign>
                    </Col>

                    <DataTable
                        pagination
                        columns={columns}
                        data={data}
                    />
                </Row>
            </Container>
            <Footer />
            <Modal show={show} onHide={() => setShow(false)} animation={false} >
                <Modal.Header closeButton className='text-center'>
                    <Modal.Title className='text-center text-bold'>Delete ?</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center exit'>Do you want Delete the User </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='cutomof' onClick={() => setShow(false)}>No</Button>
                    <Button variant="danger" className='cutomof' onClick={deleteUser}>Yes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={confirmShow} onHide={() => setConfirmShow(false)} animation={false} >
                <Modal.Header closeButton className='text-center'>
                    <Modal.Title className='text-center text-bold'>{delMsg.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center exit'>{delMsg.msg}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='cutomof' onClick={() => setConfirmShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
