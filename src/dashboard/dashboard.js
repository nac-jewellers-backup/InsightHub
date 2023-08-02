import React, { useEffect, useState } from 'react'
import Header from '../header/header';
import Footer from '../footer/footer';
import './dashboard.css';
import { getUser } from '../misc/authService';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const setWindowDimensions = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    }

    useEffect(() => {
        if (!getUser()) { navigate('/'); }
        document.title = 'Dashboard | Insight Hub';
        document.getElementById('navDashboard').classList.add("active");
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
                    src='https://us-east-2.quicksight.aws.amazon.com/sn/embed/share/accounts/185714328388/dashboards/a8170bdd-2457-408c-be2d-3607fdc65b49?directory_alias=infographicanalytics'
                />
            </div>
            <Footer />
        </div>
    )
}