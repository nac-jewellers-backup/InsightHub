import React, { useEffect } from 'react'
import Header from '../header/header';
import Footer from '../footer/footer';
import { getUser } from '../misc/authService';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

export default function Page404() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!getUser()) { navigate('/'); }
        document.title = 'Page 404 | NAC IntelliDash';
    }, [navigate]);
    return (
        <div>
            <Header />
            <Container>
                <Button onClick={() => navigate('/dashboard')}>Go Back To Home</Button>
            </Container>
            <Footer />
        </div>
    )
}