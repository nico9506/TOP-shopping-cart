import githubIcon from "../assets/githubIcon.svg";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer>
      <a href="https://github.com/nico9506/TOP-shopping-cart" target="_blank">
        <img src={githubIcon} alt="github icon" />
        <h1>nico9506</h1>
      </a>
    </footer>
  );
};

export default Footer;
