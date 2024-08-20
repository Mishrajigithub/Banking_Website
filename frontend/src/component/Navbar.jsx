import React from "react";
import { Link } from 'react-router-dom'
import '../App.css'


const Navbar = () => {
    return (
        <div className="navbar" style={{ width: "100vw" }}>
            <nav>
                <h1 className="brand" style={{ color: 'white' }}>Akash Bank</h1>
                <ul>
                    <Link to="/" style={{ textDecoration: "none", color: "white" }}>   <li>Home</li></Link>
                    <Link to="/all-profile" style={{ textDecoration: "none", color: "white" }}>   <li>All Customers</li></Link>
                    <Link to="/history" style={{ textDecoration: "none", color: "White" }}> <li>Transaction History</li></Link>
                </ul>
                <div style={{ clear: 'both' }}></div>
            </nav>
            <div className="responsive-bar">
                <h3 className="brand">RB Bank</h3>
                <h4 className="menu">Menu</h4>
                <div style={{ clear: 'both' }}></div>
            </div>
        </div>
    );
};

export default Navbar;
