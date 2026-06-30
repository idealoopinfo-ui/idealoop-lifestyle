import { Link } from "react-router-dom";
import "./TopNavbar.css";

export default function TopNavbar() {
  // TEMP user (later you will replace with Supabase auth)
  const user = null; 
  const isLoggedIn = !!user;

  const firstName = "Amitha"; // later from user?.user_metadata?.first_name

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

        {!isLoggedIn ? (
          <div className="login-dropdown">
            <button className="login-btn">
              Login ▾
            </button>

            <div className="login-menu">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </div>
        ) : (
          <div className="profile-dropdown">

            <div className="profile-btn">
              <div className="avatar">
                {firstName.charAt(0)}
              </div>
              <span>Hi, {firstName} ▾</span>
            </div>

            <div className="profile-menu">
              <Link to="/profile">👤 My Profile</Link>
              <Link to="/wishlist">❤️ Wishlist</Link>
              <Link to="/orders">📦 Orders</Link>
              <button className="logout-btn">🚪 Logout</button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}