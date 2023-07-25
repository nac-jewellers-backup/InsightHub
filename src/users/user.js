import React, {useState, useEffect} from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import './users.css';
import { Form, Container, Col, Modal,Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import TextAlign from '../csscomponent/textalign';
import Padding from '../csscomponent/padding';
import Width from '../csscomponent/width';
import Text from '../csscomponent/fontweight';
import FontSize from '../csscomponent/fontsize';
import Color from '../csscomponent/color';
export default function User() {
    const [data, setData] = useState({
        name:'',mobile:'',email:'',password:'',status:'',role:''
    });
    const [err, setErr] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const type = (id === 'new') ? 'Add' : 'Edit';

    const handleChange = (e) => {
        const { id,value} = e.target;
        setData({...data,[id]:value});
    }
    const [confirmShow,setConfirmShow] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();        
        
        if(!data.name.trim()){
            setConfirmShow(true);
            setErr('Enter the Name')
        }
        else if(!data.mobile.trim()){
            setErr('Enter the Mobile Number')
        }
        else if(!data.email.trim()){
            setErr('Enter the Email Id')
        }
        else if(!data.password.trim()){
            setErr('Enter the password')
        }
        else if(!data.status.trim()){
            setErr('Select the Status')
        }
        else if(!data.role.trim()){
            setErr('Select the Role')
        }
        else{
            setErr('');
            console.log(data);
        }
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
                        <Form.Group className="mb-3" controlId="name">
                            <TextAlign alignment="left">Name</TextAlign>
                            <Form.Control type="text" placeholder="Enter Name" style={{ padding: "10px" }} autoComplete='off' value={data.name} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="mobile">
                            <TextAlign alignment="left">Mobile Number</TextAlign>
                            <Form.Control type="text" placeholder="Enter Mobile Number" style={{ padding: "10px" }} autoComplete='off' value={data.mobile} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <TextAlign alignment="left">EMail Address</TextAlign>
                            <Form.Control type="email" placeholder="Enter EMail Address" style={{ padding: "10px" }} autoComplete='off' value={data.email} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <TextAlign alignment="left">Password</TextAlign>
                            <Form.Control type="password" placeholder="Enter Password" style={{ padding: "10px" }} autoComplete='off' value={data.password} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="status">
                            <TextAlign alignment="left">Status</TextAlign>
                            <Form.Select value={data.status} onChange={handleChange}>
                                <option value='' disabled selected>Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="role">
                            <TextAlign alignment="left">Role</TextAlign>
                            <Form.Select value={data.role} onChange={handleChange}>
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
