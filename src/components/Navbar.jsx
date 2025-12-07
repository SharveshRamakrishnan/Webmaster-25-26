import React from 'react';
import '../css/navbar.css';


export default function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-inner">
                <h1 className="logo">Coppell Community Resource Hub</h1>
                <nav>
                    <button className="navbar-button">Home</button>
                    <button className="navbar-button">Resource Directory</button>
                    <button className="navbar-button">Highlights</button>
                    <button className="navbar-button">Submit a Resource</button>
                    <button className="navbar-button">Map</button>
                    <button className="navbar-button">Contact</button>
                </nav>
            </div>
        </header>
    );
}