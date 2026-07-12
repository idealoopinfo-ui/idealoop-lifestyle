import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {

  const logoUrl =
    "YOUR_SUPABASE_IMAGE_URL";

  return (
    <footer className="footer">

      {/* TOP GRID */}
      <div className="footer-container">


        {/* BRAND */}
        <div className="footer-brand">

        <h2 className="footer-logo">

  <img
    src="https://lxvoytlpnbzwxplxfnxj.supabase.co/storage/v1/object/public/my/Untitled_design-removebg-preview.png"
    alt="Idealoop Lifestyle"
    className="footer-logo-icon"
  />

  Idealoop Lifestyle

</h2>

          <p className="footer-text">

            A modern lifestyle marketplace offering curated
            fashion, beauty, home essentials, and trending products.

          </p>

        </div>



        {/* SHOP */}
        <div className="footer-col">

          <h3>
            Shop
          </h3>


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

          <h3>
            Support
          </h3>


          <Link to="/contact">
            Contact Us
          </Link>

        </div>




        {/* LEGAL */}
        <div className="footer-col">

          <h3>
            Legal
          </h3>


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

        <h3>
          Follow Us
        </h3>


        <div className="social-links">

          <a href="#" target="_blank" rel="noreferrer">
            Facebook
          </a>


          <a href="#" target="_blank" rel="noreferrer">
            Instagram
          </a>


          <a href="#" target="_blank" rel="noreferrer">
            Pinterest
          </a>


          <a href="#" target="_blank" rel="noreferrer">
            X
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