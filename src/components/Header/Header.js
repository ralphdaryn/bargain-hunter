import "./Header.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logos/bhlogo.png";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="header">
      <div className="header__container">
        <FaBars className="header__menu" onClick={() => setIsOpen(!isOpen)} />
        <img className="header__logo" src={logo} alt="logo pic" />
        <FaSearch className="header__search" />
      </div>
      <nav className={`header__nav ${isOpen ? "active" : ""}`}>
        <ul>
          <li className="header__nav-link">
            <NavLink to="/today" activeClassName="active">
              Today's Bargain!
            </NavLink>
          </li>
          <li className="header__nav-link">
            <NavLink to="/best-seller" activeClassName="active">
              Best Seller
            </NavLink>
          </li>
          <li className="header__nav-link">
            <NavLink to="/review" activeClassName="active">
              Top Reviews
            </NavLink>
          </li>
          <li className="header__nav-link">
            <NavLink to="/categories" activeClassName="active">
              Categories
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
