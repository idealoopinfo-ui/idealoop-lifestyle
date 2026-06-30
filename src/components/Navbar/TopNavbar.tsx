import { Link } from "react-router-dom";
import "./TopNavbar.css";

export default function TopNavbar() {
  return (
    <div className="top-navbar">

      {/* LEFT: LOGO + NAME */}
      <div className="top-left">
        <Link to="/" className="logo">
          🛍 Idealoop
        </Link>
        <span className="company-name">Lifestyle Store</span>
      </div>

      {/* RIGHT: LOGIN */}
      <div className="top-right">
        <div className="login-dropdown">
          <button className="login-btn">Login ▾</button>

          <div className="login-menu">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>

    </div>
  );
}