import { useState } from "react";
import { Link } from "react-router-dom";
import "./DiscoverNavbar.css";

export default function DiscoverNavbar() {
  const [open] = useState(false);
  return (
    <nav className="discover-navbar">

      <div className="nav-left">

        <img
          src="https://lxvoytlpnbzwxplxfnxj.supabase.co/storage/v1/object/public/my/Untitled_design-removebg-preview.png"
          className="logo-icon"
        />

<div className="category-wrapper">
<span className="category-btn">
  Category
</span>

  {open && (
    <div className="dropdown">
      <Link to="/category/fashion">Fashion</Link>
      <Link to="/category/home">Home</Link>
      <Link to="/category/beauty">Beauty</Link>
      <Link to="/category/tech">Tech</Link>
      <Link to="/category/travel">Travel</Link>
    </div>
  )}
</div>
</div>

      <div className="nav-description">
        <h1>Discover</h1>
        <p>
          Find inspiration and products you'll love — curated collections across fashion, home, beauty, tech, and lifestyle ideas.
        </p>
      </div>

    </nav>
  );
}