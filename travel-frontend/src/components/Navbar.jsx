import React from "react";
import { Link } from "react-router-dom";

 function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-brand">Travel Exploration Local</div>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/data">Data Display</Link>
                <Link to="/form">Form Page</Link>
            </div>
        </nav>
    );
}

export default Navbar;