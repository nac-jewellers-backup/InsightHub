import React from 'react';
import './login.css';
import TextAlign from '../csscomponent/textalign';
import Padding from '../csscomponent/padding';
import {Form, Container, Col, Row, Button, Image, Card} from 'react-bootstrap';
import Width from '../csscomponent/width';
import Text from '../csscomponent/fontweight';
import FontSize from '../csscomponent/fontsize';
import Color from '../csscomponent/color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faChartColumn, faChartGantt, faChartPie, faChartSimple, faSignIn } from '@fortawesome/free-solid-svg-icons';

function login() {
  return (
    <Container fluid>
      <Row>
      <Col lg="6" style={{background:"#eee",margin:"10px 0"}}>
      
      <Form className='box center desktop-vmiddle'>
          <Width width="100%">
           <Image src="logo.png" rounded className='login-logo' />
           <TextAlign alignment="center"><Text fontWeight="bold"><FontSize fontSize="22px"> NAC IntelliDash</FontSize></Text></TextAlign>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <TextAlign alignment="left">Email address</TextAlign>
              <Form.Control type="email" placeholder="Enter email" style={{padding:"10px"}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <TextAlign alignment="left">Password</TextAlign>
              <Form.Control type="password" placeholder="Password" style={{padding:"10px"}}/>
            </Form.Group>
            <Form.Group>
              <Text>
                <Color color="red">
                  fhsfks
                </Color>
              </Text>
          <Col sm={{ span: 12,}}>
            <Button type="submit" className='width100'><Padding size="5px">Sign in <FontAwesomeIcon icon={faSignIn} /> </Padding></Button>
          </Col>
        </Form.Group>
        </Width>
      </Form>
    </Col>
    <Col lg="6" style={{background: "#383990",height:"100vh"}} className='mobpad'>
      <Padding size="25px">
      <TextAlign  alignment="left">
        <Color color="white">
          <Width width="300px">
            <TextAlign alignment="center">
              <Card.Text><Padding size="25px"><FontSize fontSize="25px"><Color color="#3ee3ff"> <FontAwesomeIcon icon={faChartBar}  /></Color></FontSize> Operational Reports</Padding></Card.Text>
            </TextAlign>
          </Width>
          <Width width="300px">
            <TextAlign alignment="center">
              <Card.Text><Padding size="25px"><FontSize fontSize="25px"><Color color="#3ee3ff"><FontAwesomeIcon icon={faChartColumn}  /></Color></FontSize>Financial Reports</Padding></Card.Text>
            </TextAlign>
          </Width>
          <Width width="300px">
            <TextAlign alignment="center">
              <Card.Text><Padding size="25px"><FontSize fontSize="25px"><Color color="#3ee3ff"><FontAwesomeIcon icon={faChartGantt}  /></Color></FontSize>Performance Reports</Padding></Card.Text>
            </TextAlign>
          </Width>
          <Width width="300px">
          <TextAlign alignment="center">
            <Card.Text><Padding size="25px"><FontSize fontSize="25px"><Color color="#3ee3ff"><FontAwesomeIcon icon={faChartPie}  /></Color></FontSize>Analytical Reports</Padding></Card.Text>
            </TextAlign>
          </Width>
          <Width width="300px">
          <TextAlign alignment="center">
            <Card.Text><Padding size="25px"><FontSize fontSize="25px"><Color color="#3ee3ff"><FontAwesomeIcon icon={faChartSimple}  /></Color></FontSize>Executive Dashboard</Padding></Card.Text>
            </TextAlign>
          </Width>
        </Color> 
      </TextAlign>
      </Padding>
      <Image src='man-img.png' rounded className='man-img'/>
    </Col>
    </Row>
    </Container>
  );
   
}

export default login;