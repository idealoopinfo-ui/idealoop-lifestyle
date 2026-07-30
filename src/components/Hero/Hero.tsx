import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-banner">

      <div className="hero">

        <div className="hero-content">

          <span className="hero-badge">
            ✨ Lifestyle Marketplace
          </span>

          <h1>
            Discover Amazing
            <br />
            Lifestyle Products
          </h1>

          <p>
            Explore curated products, discover new ideas,
            and find inspiration for your everyday lifestyle.
          </p>

          <div className="hero-buttons">

            <Link
              to="/discover"
              className="hero-btn"
            >
              Discover Now
            </Link>

            <Link
              to="/discover"
              className="hero-btn-outline"
            >
              Explore Products
            </Link>

          </div>

        </div>

        <div className="hero-gallery">

          <Link
            to="/discover"
            className="hero-card hero-card-1"
          >
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600"
              alt="Lifestyle fashion"
            />
          </Link>

          <Link
            to="/discover"
            className="hero-card hero-card-2"
          >
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700"
              alt="Lifestyle home"
            />
          </Link>

          <Link
            to="/discover"
            className="hero-card hero-card-3"
          >
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600"
              alt="Lifestyle beauty"
            />
          </Link>

          <Link
            to="/discover"
            className="hero-card hero-card-4"
          >
            <img
              src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600"
              alt="Lifestyle products"
            />
          </Link>

        </div>

      </div>

    </section>
  );
}