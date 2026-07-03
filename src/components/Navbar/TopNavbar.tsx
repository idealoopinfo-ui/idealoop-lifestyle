import { Link, useLocation, useNavigate } from "react-router-dom";
import CountryButton from "../Country/CountryButton";
import { useTheme } from "../../context/ThemeContext";
import "./TopNavbar.css";

export default function TopNavbar() {
  const user = null;
  const isLoggedIn = Boolean(user);

  const location = useLocation();
  const navigate = useNavigate();

  const isDiscover = location.pathname.startsWith("/discover");

  const handleToggle = () => {
    navigate(isDiscover ? "/" : "/discover");
  };

  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <div className="top-navbar">

      {/* LEFT */}
      <div className="top-left">
        <Link to="/" className="logo">
          <img
            src="https://lxvoytlpnbzwxplxfnxj.supabase.co/storage/v1/object/public/my/Untitled_design-removebg-preview.png"
            alt="logo"
            className="logo-img"
          />

          <span className="company-name">
            Idealoop Lifestyle Store
          </span>
        </Link>
      </div>

      {/* RIGHT */}
      <div className="top-right">

        {/* TOGGLE BUTTON ALWAYS */}
        <button className="nav-toggle-btn" onClick={handleToggle}>
          {isDiscover ? "Home" : "Discover"}
        </button>

        {/* HIDE EVERYTHING ELSE ON DISCOVER */}
        {!isDiscover && (
          <>
            {isLoggedIn && (
              <>
                <Link to="/wishlist" className="nav-btn">❤️ Wishlist</Link>
                <Link to="/deals" className="nav-btn highlight">🔥 Deals</Link>
              </>
            )}

            <CountryButton />

            {!isLoggedIn ? (
              <div className="auth-group">
                <Link to="/login" className="auth-btn">Login</Link>
                <Link to="/register" className="auth-btn">Register</Link>
              </div>
            ) : (
              <div className="profile-dropdown">
                <div className="profile-btn">
                  <div className="avatar">A</div>
                  <span>Amitha ▾</span>
                </div>

                <div className="profile-menu">
                  <Link to="/profile" className="menu-item">👤 Profile</Link>
                  <Link to="/wishlist" className="menu-item">❤️ Wishlist</Link>

                  <button className="logout-btn" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}