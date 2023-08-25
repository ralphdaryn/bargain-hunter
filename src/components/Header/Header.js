import logo from "../../assets/logos/bhlogo.png";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="logo pic" />
      </div>
    <div className="header__searchbar-container">
        <input className="header__searchbar" type="text" name="search" />
      </div>
    </div>
  );
};

export default Header;
