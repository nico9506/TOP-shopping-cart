import "../styles/Navbar.css";
import storefrontIcon from "../assets/storefrontIcon.svg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img className="logoIcon" src={storefrontIcon} />
      <h1 className="appName">A Mock Shopping Cart App</h1>
    </nav>
  );
};

export default Navbar;
