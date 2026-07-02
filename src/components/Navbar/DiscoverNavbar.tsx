import { Link } from "react-router-dom";
import "./DiscoverNavbar.css";

export default function DiscoverNavbar() {
  return (
    <div className="discover-navbar">

      <Link to="/" className="logo">
        🛍 Idealoop
      </Link>

      <div className="nav-center">
        <Link to="/discover" className="active">
          📌 Discover
        </Link>

        <Link to="/" className="nav-link">
          Shop
        </Link>
      </div>

    </div>
  );
}