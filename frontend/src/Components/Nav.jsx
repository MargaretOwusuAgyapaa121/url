// src/components/Navbar.jsx
import React from 'react';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Shortify</div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/analytics">Analytics</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
