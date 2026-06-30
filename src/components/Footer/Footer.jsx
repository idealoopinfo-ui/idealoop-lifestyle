import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      {/* TOP GRID */}
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-col">
          <h2 className="footer-logo">🛍 Idealoop</h2>
          <p className="footer-text">
            A modern lifestyle marketplace offering curated furniture,
            fashion, beauty, and home essentials.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h3>Shop</h3>
          <Link to="/products?category=furniture">Furniture</Link>
          <Link to="/products?category=home-decor">Home Decor</Link>
          <Link to="/products?category=fashion">Fashion</Link>
          <Link to="/products?category=beauty">Beauty</Link>
        </div>

        {/* SUPPORT */}
        <div className="footer-col">
          <h3>Support</h3>
          <Link to="/contact">Contact Us</Link>
          <Link to="/help">Help Center</Link>
          <Link to="/shipping">Shipping Info</Link>
          <Link to="/returns">Returns</Link>
        </div>

        {/* LEGAL */}
        <div className="footer-col">
          <h3>Legal</h3>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/disclosure">Affiliate Disclosure</Link>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="footer-divider"></div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Idealoop Lifestyle. All rights reserved.</p>
        <p className="footer-note">
          Some links may be affiliate links. We may earn a commission at no extra cost to you.
        </p>
      </div>

    </footer>
  );
}