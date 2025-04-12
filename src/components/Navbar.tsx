import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import storefrontIcon from "../assets/storefrontIcon.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <img className="logoIcon" src={storefrontIcon} />
      </Link>
      <Link to="/shop">
        <h1 className="appName">A Mock Shopping Cart App</h1>
      </Link>
    </nav>
  );
};

export default Navbar;
