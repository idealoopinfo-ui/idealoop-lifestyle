import { Link } from "react-router-dom";
import "./TopNavbar.css";

export default function TopNavbar() {
  const user = null;
  const isLoggedIn = !!user;

  const firstName = "Amitha";

  const handleLogout = () => {
    console.log("logout clicked");
  };

  return (
    <div className="top-navbar">
      {/* LEFT */}
      <div className="top-left">
        <Link to="/" className="logo">
          🛍 Idealoop
        </Link>
        <span className="company-name">Lifestyle Store</span>
      </div>

      {/* RIGHT */}
      <div className="top-right">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}