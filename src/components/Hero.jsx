import React from 'react';
<<<<<<< Updated upstream
=======
import { ArrowRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg';
>>>>>>> Stashed changes
import '../css/hero.css';


export default function Hero() {
<<<<<<< Updated upstream
    return (
        <section className="hero">
            <div className="hero-overlay">
                <h2>Connecting Coppell Residents with Local Support and Services</h2>
                <p>Your guide to community resources, local services, and volunteer opportunities.</p>
=======
    const navigate = useNavigate();

    const handleExploreClick = () => {
        navigate('/resources');
        window.scrollTo(0, 0);
    };

    const handleSubmitClick = () => {
        const submitSection = document.getElementById('submit-resource');
        if (submitSection) {
            submitSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero" className="hero-section">
            <div className="hero-background">
                <img
                    src={reactLogo}
                    alt="Community gathering"
                    className="hero-image"
                />
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-content">
                <h1>Connecting Coppell Residents with Local Support and Services</h1>
                <p>
                    Your comprehensive guide to community resources, local services, and support networks.
                    Discover opportunities to get help, volunteer, and connect with your neighbors.
                </p>

>>>>>>> Stashed changes
                <div className="hero-buttons">
                    <button className="btn-light">Explore Resources</button>
                    <button className="btn-dark">Submit a Resource</button>
                </div>
            </div>
        </section>
    );
}