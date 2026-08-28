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
            Explore curated fashion, beauty, wellness,
            and everyday lifestyle products made to inspire
            your next find.
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


        {/* =================================================
            HERO IMAGE GALLERY
        ================================================= */}

        <div className="hero-gallery">

          {/* FASHION */}

          <Link
            to="/category/fashion"
            className="hero-card hero-card-1"
          >

            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=85"
              alt="Fashion lifestyle"
            />

          </Link>


          {/* EYEWEAR / ACCESSORIES */}

          <Link
            to="/category/fashion"
            className="hero-card hero-card-2"
          >

            <img
              src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&q=85"
              alt="Fashion accessories and eyewear"
            />

          </Link>


          {/* BEAUTY */}

          <Link
            to="/category/beauty"
            className="hero-card hero-card-3"
          >

            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&q=85"
              alt="Beauty and skincare"
            />

          </Link>


          {/* FITNESS & WELLNESS */}

          <Link
            to="/category/fitness-wellness"
            className="hero-card hero-card-4"
          >

            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&q=85"
              alt="Fitness and wellness lifestyle"
            />

          </Link>

        </div>

      </div>

    </section>
  );
}