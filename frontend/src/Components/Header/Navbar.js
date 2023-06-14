import React, { useState } from 'react';
import './Navbar.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
const Header = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const toggleNav = () => {
    setNavIsOpen(!navIsOpen);
  };
  return (
    <nav className={`${navIsOpen ? 'active' : ''}`}>
      <h2 className="logo">Trexxplore</h2>
      <div className="bars">
        <GiHamburgerMenu onClick={toggleNav} />
      </div>
      <ul className="nav-links">
        <li className="nav-link">
          <Link to="/">home</Link>
        </li>
        <li className="nav-link">
          <Link to="/alltour">Tour</Link>
        </li>
        <li className="nav-link">
          <Link to="/about">About</Link>
        </li>

        <li className="nav-link">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
