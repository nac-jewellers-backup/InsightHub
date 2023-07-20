import React, { useEffect, useState } from 'react'
import Header from '../header/header';
import Footer from '../footer/footer';
import './salesreport.css';
import { getUser } from '../misc/authService';
import { useNavigate } from 'react-router-dom';

export default function SalesReport() {
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const setWindowDimensions = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    }
    useEffect(() => {
        if (!getUser()) { navigate('/'); }
        document.title = 'Sales Report | Insight Hub';
        document.getElementById('navSalesReport').classList.add("active");
        window.addEventListener('resize', setWindowDimensions);
        return () => { window.removeEventListener('resize', setWindowDimensions); }
    }, [navigate]);
    return (
        <div>
            <Header />
            <div>
                <iframe
                    width={windowWidth - 15}
                    height={windowHeight - 210}
                    title='NAC Reports'
                    src='https://us-east-2.quicksight.aws.amazon.com/sn/embed/share/accounts/185714328388/dashboards/931753bf-95c1-4f72-a77d-44145cd5e4bc?directory_alias=infographicanalytics'
                />
            </div>
            <Footer />
        </div>
    )
}