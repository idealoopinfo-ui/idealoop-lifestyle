import { Link } from "react-router-dom";


import "./Footer.css";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={`footer ${className || ""}`}>

      {/* TOP GRID */}
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <h2 className="footer-logo">
            Idealoop Lifestyle
          </h2>

          <p className="footer-text">
            A modern lifestyle marketplace offering curated
            fashion, beauty, home essentials, and trending products.
          </p>
        </div>

        {/* SHOP */}
        <div className="footer-col">
          <h3>Shop</h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/category/fashion">
            Fashion
          </Link>

          <Link to="/category/beauty">
            Beauty
          </Link>

          <Link to="/category/home-living">
            Home & Living
          </Link>

          <Link to="/category/toys-gifts">
            Toys & Gifts
          </Link>
        </div>

        {/* SUPPORT */}
        <div className="footer-col">
          <h3>Support</h3>

          <Link to="/about">
            About Us
          </Link>

          <Link to="/contact">
            Contact Us
          </Link>
        </div>

        {/* LEGAL */}
        <div className="footer-col">
          <h3>Legal</h3>

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

          <Link to="/affiliate-disclosure">
            Affiliate Disclosure
          </Link>
        </div>

      </div>

      {/* SOCIAL SECTION */}
      <div className="footer-social">

        <h3>Follow Us</h3>

        <div className="social-links">

          {/* FACEBOOK */}
          <a
            href="https://web.facebook.com/idealoop.lifestyle"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            Facebook
          </a>

          {/* TIKTOK */}
          <a
            href="https://www.tiktok.com/@idealooplifestyle"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            TikTok
          </a>

          {/* INSTAGRAM */}
<a
  href="https://www.instagram.com/idealooplifestyle"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Instagram"
>
  Instagram
</a>

          {/* PINTEREST */}
          <a
            href="https://www.pinterest.com/BloomVix/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pinterest Fitness"
          >
            Pinterest-Fitness
          </a>

        </div>

      </div>

      {/* DIVIDER */}
      <div className="footer-divider"></div>

      {/* BOTTOM */}
      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Idealoop Lifestyle.
          All rights reserved.
        </p>

        <p className="footer-note">
          Some links may be affiliate links.
          We may earn a commission at no extra cost to you.
        </p>

      </div>

    </footer>
  );
}