import React, { useState } from "react";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/User/userAction";

const Header = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const toggleNav = () => {
    setNavIsOpen(!navIsOpen);
  };
  const { isAuthenticated, currentUser, role } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout());
  };
  return (
    <nav className={`${navIsOpen ? "active" : ""}`}>
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

        {role === "admin" ? (
          <>
            <li className="nav-link">
              <Link to="/admin">Dashboard</Link>
            </li>
            <li className="nav-link">
              <Link to="/admin">Manage Tour</Link>
            </li>
            <li className="nav-link">
              <Link to="/admin/user">User</Link>
            </li>
          </>
        ) : (
          <></>
        )}
        {isAuthenticated ? (
          <>
            <li className="nav-link">
              <Link onClick={logoutUser}>logout</Link>
            </li>
            <li className="nav-link">
              <Link to={"/user"}>
                <img
                  src={`/img/users/${currentUser.photo}`}
                  alt="avatar"
                  className="avatar"
                />
              </Link>
            </li>
          </>
        ) : (
          <li className="nav-link">
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
