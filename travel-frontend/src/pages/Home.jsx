import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="page home">
            <h2>Travel Exploration Local</h2>
            <p>
                Discover hidden gems, explore local destinations, and create your own travel experiences.
                Start your journey by browsing locations or adding your own unique find.
            </p>

            <div className="dashboard-cards">
                <div className="card">
                    <h3>🌍 Explore Local Gems</h3>
                    <p>
                        Browse and discover unique places shared by others. Find hidden spots,
                        nature escapes, and local favorites around you.
                    </p>
                    <Link to="/data" className="btn">Explore Now</Link>
                </div>

                <div className="card">
                    <h3>📍 Add a New Discovery</h3>
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