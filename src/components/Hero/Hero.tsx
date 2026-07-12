import { Link } from "react-router-dom";
import "./Hero.css";


export default function Hero() {

return (

<div className="hero">


  {/* LEFT TEXT */}
  <div className="hero-content">

    <h1>
      Discover a Better Lifestyle
    </h1>
    <p>
      Curated Home, Clothing & Beauty essentials made simple.
    </p>


    <Link
      to="/discover"
      className="hero-btn"
    >
      Explore Now
    </Link>


  </div>
  {/* RIGHT IMAGE AREA */}
  <div className="hero-images">


    <Link
      to="/category/home-living"
      className="hero-main"
    >

      <img
        src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
        alt="Home & Living"
      />

    </Link>
    <div className="hero-side">
      <Link to="/category/beauty">

        <img
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
          alt="Beauty"
        />

      </Link>
      <Link to="/category/fashion">

        <img
          src="https://images.unsplash.com/photo-1612810436541-336d12d8e3a2"
          alt="Fashion"
        />

      </Link>
    </div>
  </div>
</div>

);

}