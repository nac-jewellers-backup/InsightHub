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
            <div className='text-center py-2'>
                <iframe
                    width={windowWidth - 310}
                    height={windowHeight - 225}
                    title='NAC Reports'
                    src='https://us-east-2.quicksight.aws.amazon.com/sn/embed/share/accounts/185714328388/dashboards/00157b58-53d2-4093-8ed3-72f0b6245902?directory_alias=infographicanalytics'
                />
            </div>
            <Footer />
        </div>
    )
}