import React from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';
import { Col, Container, Row, Image, Nav, Navbar, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { resetUserSession } from '../misc/authService';

export default function Header() {
	const navigate = useNavigate();
	const logout = () => {
		resetUserSession();
		navigate("/");
	};
	return (
		<Container fluid>
			<Row>
				<Col lg={1} />
				<Col lg={2}>
					<Image src="logo.png" rounded className='logo_icon' />
				</Col>
			</Row>
			<Row>
				<Navbar bg="transparent" expand="lg" variant="dark">
					<Container fluid>
						<Col lg={1} />
						<Navbar.Brand to="#home" className='mob-hide'>Menu</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								<Nav.Link to="#home"><FontAwesomeIcon icon={faHouse} /> Home</Nav.Link>
								<Button onClick={logout} ><FontAwesomeIcon icon={faSignOut}/> Logout</Button>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</Row>
		</Container>
	);
};