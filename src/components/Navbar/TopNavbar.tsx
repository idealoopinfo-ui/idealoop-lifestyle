import { Link } from "react-router-dom";

import CountryButton from "../Country/CountryButton";
import { useTheme } from "../../context/ThemeContext";

import "./TopNavbar.css";

export default function TopNavbar() {
  const user = null;
  const isLoggedIn = !!user;
  const { theme, toggleTheme } = useTheme();
  const firstName = "Amitha";

  const handleLogout = () => {
    console.log("logout clicked");
  };

  return (
    <div className="top-navbar">

      {/* LEFT */}
      <div className="top-left">
      <Link to="/" className="logo">
  <img
    src="https://lxvoytlpnbzwxplxfnxj.supabase.co/storage/v1/object/public/my/Untitled_design-removebg-preview.png"
    alt="Idealoop"
    className="logo-img"
  />
</Link>

        <span className="company-name">
          IDEALOOP Lifestyle Store
        </span>
      </div>

      {/* RIGHT */}
      <div className="top-right">

        {/* 📌 ADD THIS */}
        <Link to="/discover" className="nav-btn">
          📌 Discover
        </Link>

        {isLoggedIn && (
          <>
            <Link to="/wishlist" className="nav-btn">
              ❤️ Wishlist
            </Link>

            <Link to="/deals" className="nav-btn highlight">
              🔥 Deals
            </Link>
          </>
        )}

        <CountryButton />

        {/* AUTH AREA */}
        {!isLoggedIn ? (
          <div className="auth-group">
            <Link to="/login" className="auth-btn">
              Login
            </Link>

            <Link to="/register" className="auth-btn outline">
              Register
            </Link>
          </div>
        ) : (
          <div className="profile-dropdown">
            <div className="profile-btn">
              <div className="avatar">{firstName.charAt(0)}</div>
              <span>{firstName} ▾</span>
            </div>

            <div className="profile-menu">
              <Link to="/profile" className="menu-item">
                👤 Profile
              </Link>

              <Link to="/wishlist" className="menu-item">
                ❤️ Wishlist
              </Link>

              <button className="logout-btn" onClick={handleLogout}>
                🚪 Logout
              </button>

              <button className="theme-btn" onClick={toggleTheme}>
                {theme === "light" ? "🌙 Dark" : "☀ Light"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}