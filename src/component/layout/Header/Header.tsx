import { Link } from "react-router-dom";
import { lightModeLogo } from "../../../assets/image/index";

function Header() {
  return (
    <header className="header">
      <img src={lightModeLogo} alt="logo" />
    </header>
  );
}

export default Header;
