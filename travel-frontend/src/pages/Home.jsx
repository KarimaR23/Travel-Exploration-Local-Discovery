import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="page home">
            <h2>Travel Exploration Local</h2>

            <div className="full-bleed-container">
                <img
                    src="/images/Tallahassee Skyline.jpg"
                    alt="Skyline of Tallahassee Florida"
                    className="full-bleed-image"
                />
                </div>
            <p>
                Discover hidden gems, explore local destinations, and create your own travel experiences.
                Start your journey by browsing locations or adding your own unique find.
            </p>

            <div className="dashboard-cards">
                <div className="card">
                    <h3>🌍 Explore Local Gems</h3>

                    <img
                        src="/images/Apalachicola National Forest.jpg"
                        alt="Apalachicola National Forest in Tallahassee Florida"
                        style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
                    />

                    <p>
                        Browse and discover unique places shared by others. Find hidden spots,
                        nature escapes, and local favorites around you.
                    </p>
                    <Link to="/data" className="btn">Explore Now</Link>
                </div>

                <div className="card">
                    <h3>📍 Add a New Discovery</h3>

                    <img src="/images/Tallahassee Automobile Museum.jpg"
                         alt="Tallahassee Automobile Museum showcasing historic vehicles"
                         style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
                    />

                    <p>
                        Found a great place? Share it! Add a new gem to the map and contribute
                        to the growing collection of local discoveries.
                    </p>
                    <Link to="/form" className="btn">Add a Gem</Link>
                </div>

            </div>
        </div>
    );
};
export default Home;