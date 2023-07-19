import React, { useEffect } from 'react'
import Header from '../header/header';
import Footer from '../footer/footer';
import './dashboard.css';
import { getUser } from '../misc/authService';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    // const setWindowDimensions = () => {
    //     setWindowWidth(window.innerWidth);
    //     setWindowHeight(window.innerHeight);
    // }

    useEffect(() => {
        if (!getUser()) { navigate('/'); }
        document.title = 'Dashboard | NAC IntelliDash';
        document.getElementById('navDashboard').classList.add("active");
        // window.addEventListener('resize', setWindowDimensions);
        // return () => { window.removeEventListener('resize', setWindowDimensions); }
    }, [navigate]);

    return (
        <div>
            <Header />
            <div>
            {/* <iframe
                width={windowWidth - 15}
                height={windowHeight - 206}
                title='NAC Reports'
                src='https://us-east-2.quicksight.aws.amazon.com/sn/embed/share/accounts/185714328388/dashboards/4c5ba9bd-094d-4267-930a-b28fc23ea496?directory_alias=infographicanalytics'
            /> */}
            </div>
            <Footer />
        </div>
    )
}