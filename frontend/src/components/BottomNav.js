import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNav.css';

function BottomNav() {
    return (
        <nav className="bottom-nav">
            <NavLink to="/" exact className="nav-item" activeClassName="active">
                <i className="fas fa-home"></i>
            </NavLink>
            <NavLink to="/search" className="nav-item" activeClassName="active">
                <i className="fas fa-search"></i>
            </NavLink>
            <NavLink to="/favorites" className="nav-item" activeClassName="active">
                <i className="fas fa-heart"></i>
            </NavLink>
            <NavLink to="/profile" className="nav-item" activeClassName="active">
                <i className="fas fa-crown"></i>
            </NavLink>
        </nav>
    );
}

export default BottomNav;
