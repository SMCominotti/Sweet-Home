import logo from "../../../assets/image/logo.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img
        className="block md:hidden cursor-pointer select-none"
        src={logo}
        height={40}
        width={40}
        alt="Logo"
      />
      <img
        className="hidden md:block cursor-pointer select-none"
        src={logo}
        height={75}
        width={75}
        alt="Logo"
      />
    </Link>
  );
}

export default Logo;
