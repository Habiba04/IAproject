// Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // for navbar toggle
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";


const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

const renderCenterLinks = () => {
    if (!user?.isLoggedIn) {
    return (
        <>
        <NavItem to="/" label="Home" />
        <NavItem to="/about" label="About" />
        </>
    );
    }

    switch (user.role) {
    case "doctor":
        return (
        <>
            <NavItem to="/" label="Home" />
            <NavItem to="/about" label="About" />
            <NavItem to="/appointments" label="Appointments" />
        </>
        );
    case "admin":
        return (
        <>
            <NavItem to="/dashboard" label="Dashboard" />
            <NavItem to="/doctors" label="Doctor List" />
            <NavItem to="/appointments" label="Appointments" />
        </>
        );
    case "patient":
        return (
        <>
            <NavItem to="/" label="Home" />
            <NavItem to="/doctors" label="Doctor List" />
            <NavItem to="/about" label="About" />
            <NavItem to="/appointments" label="Appointments" />
        </>
        );
    default:
        return null;
    }
};

const renderRightLinks = () => {
    if (!user?.isLoggedIn) {
    return (
        <>
        {location.pathname !== "/login" && <NavItem to="/login" label="Login" />}
        {location.pathname !== "/register" && <NavItem to="/register" label="Register" />}
        </>
    );
    }

    return (
    <div className="d-flex align-items-center flex-wrap">
        <li className="nav-item d-flex align-items-center">
            <FontAwesomeIcon icon={faCommentDots} style={{ width: "25px", height: "25px" }}/>
        </li>
        <li className="nav-item">
            <img src="/assets/avatar.png" alt="profile" style={{maxWidth:"40px", marginLeft: "10px", marginRight: "10px"}} />
        </li>
        <li className="nav-item">
            <span className=" ms-2" style={{ fontWeight: "bold", color: "#1A2142"}} onClick={logout}>
            Logout
            </span>
        </li>
    </div>
    );
};

return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div className="container-fluid">
        {/* Left: Logo */}
        <Link className="navbar-brand" to="/">
        <img src="/assets/logo.jpg" alt="Logo" style={{ borderRadius: "50%", maxWidth: "50px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }} />
        </Link>

        {/* Toggle button for mobile */}
        <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
        <span className="navbar-toggler-icon" />
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
        {/* Centered nav */}
        <div className="position-absolute top-50 start-50 translate-middle d-none d-lg-block">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">{renderCenterLinks()}</ul>
        </div>

        {/* Right-aligned links */}
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex flex-row gap-2">
            {renderRightLinks()}
        </ul>
        </div>
    </div>
    </nav>
);
};

const NavItem = ({ to, label }) => (
<li className="nav-item">
    <Link className="nav-link fw-semibold text-dark" to={to}>
    {label}
    </Link>
</li>
);

export default Navbar;