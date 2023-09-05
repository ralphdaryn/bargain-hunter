import "./Header.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logos/bhlogo.png";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import SearchBar from "../../components/Searchbar/Searchbar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="header">
      <div className="header__container">
        <FaBars className="header__menu" onClick={() => setIsOpen(!isOpen)} />
        <img className="header__logo" src={logo} alt="logo pic" />
        <SearchBar />
        <FaSearch className="header__search" />
      </div>
      <nav className={`header__nav ${isOpen ? "active" : ""}`}>
        <ul>
          <li>
            <NavLink
              to="/today"
              className={({ isActive }) =>
                isActive ? "header__nav-link active" : "header__nav-link"
              }
            >
              Today's Bargain!
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
