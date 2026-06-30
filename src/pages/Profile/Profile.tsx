import "./Profile.css";
import { Link } from "react-router-dom";

export default function Profile() {
  const user = {
    name: "Guest User",
    email: "guest@idealoop.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  return (
    <div className="profile-container">

      {/* HEADER */}
      <div className="profile-header">

        <img src={user.avatar} alt="Profile" className="profile-avatar" />

        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>

      </div>

      {/* ACTIONS */}
      <div className="profile-actions">

        <h3>My Account</h3>

        <Link to="/wishlist">❤️ Wishlist</Link>
        <Link to="/saved">⭐ Saved Products</Link>
        <Link to="/settings">⚙️ Settings</Link>

        <button className="logout-btn">Logout</button>

      </div>

    </div>
  );
}