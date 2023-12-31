import "./Header.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logos/bhlogo.png";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import SearchBar from "../../components/Searchbar/Searchbar";

const Header = ({
  onBestSellerClick,
  onTopReviewsClick,
  onHighestRatedClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="header">
      <div className="header__container">
        <FaBars className="header__menu" onClick={() => setIsOpen(!isOpen)} />
        <img className="header__logo" src={logo} alt="logo pic" />
        <nav className={`header__nav ${isOpen ? "active" : ""}`}>
          <ul>
            <li className="header__nav-link">
              <NavLink
                to="/best-seller"
                className={({ isActive }) =>
                  isActive ? "header__nav-link active" : "header__nav-link"
                }
                onClick={onBestSellerClick}
              >
                Best Seller
              </NavLink>
            </li>
            <li className="header__nav-link">
              <NavLink
                to="/highest-rated"
                className={({ isActive }) =>
                  isActive ? "header__nav-link active" : "header__nav-link"
                }
                onClick={onHighestRatedClick}
              >
                Highest Rated
              </NavLink>
            </li>
            <li className="header__nav-link">
              <NavLink
                to="/top-reviews"
                className={({ isActive }) =>
                  isActive ? "header__nav-link active" : "header__nav-link"
                }
                onClick={onTopReviewsClick}
              >
                Top Reviews
              </NavLink>
            </li>
          </ul>
        </nav>
        <SearchBar active={isSearchOpen} />
        <FaSearch
          className="header__search"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        />
      </div>
    </div>
  );
};

export default Header;
