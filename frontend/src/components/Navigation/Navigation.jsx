import { Link } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";


function Navigation() {

  return (
    <nav style={{ width: "500px", display: "flex", justifyContent: "space-between" }}>
      <Link to={"/"} >Home</Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/settings"}>Settings</Link>

      <LogoutButton />
    </nav>
  );
}

export default Navigation;