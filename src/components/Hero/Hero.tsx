import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {

  return (

    <section className="hero-banner">

      <div className="hero">

        {/* LEFT CONTENT */}
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
            Explore trending Fashion, Beauty,
            Home & Living and Gifts curated
            for your everyday lifestyle.
          </p>


          <div className="hero-buttons">


            <Link
              to="/discover"
              className="hero-btn"
            >
              Discover Now
            </Link>



            <Link
              to="/"
              className="hero-btn-outline"
            >
              Shop Collection
            </Link>


          </div>

        </div>




        {/* RIGHT IMAGE COLLAGE */}

        <div className="hero-gallery">


          <Link
            to="/category/fashion"
            className="hero-card hero-card-1"
          >

            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600"
              alt="Fashion"
            />

          </Link>




          <Link
            to="/category/home-living"
            className="hero-card hero-card-2"
          >

            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700"
              alt="Home Living"
            />

          </Link>




          <Link
            to="/category/beauty"
            className="hero-card hero-card-3"
          >

            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600"
              alt="Beauty"
            />

          </Link>




          <Link
            to="/category/toys-gifts"
            className="hero-card hero-card-4"
          >

            <img
              src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600"
              alt="Toys"
            />

          </Link>


        </div>


      </div>


    </section>

  );

}