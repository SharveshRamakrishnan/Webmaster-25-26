import React from 'react';
import '../css/navbar.css';


export default function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-inner">
                <h1 className="logo">Coppell Community Resource Hub</h1>
                <nav>
                    <button>Home</button>
                    <button>Resource Directory</button>
                    <button>Highlights</button>
                    <button>Submit a Resource</button>
                    <button>Map</button>
                    <button>Contact</button>
                </nav>
            </div>
        </header>
    );
}