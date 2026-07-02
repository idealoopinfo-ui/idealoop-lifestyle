import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-container">

  <div className="hero">

    {/* LEFT TEXT */}
    <div className="hero-content">
      <h1>Discover a Better Lifestyle</h1>

      <p>
        Curated Home, Clothing & Beauty essentials made simple.
      </p>
    </div>

    {/* RIGHT IMAGE AREA */}
    <div className="hero-images">

      <div className="hero-main">
        <img
          src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
          alt="Main"
        />
      </div>

      <div className="hero-side">
        <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9" />
        <img src="https://images.unsplash.com/photo-1612810436541-336d12d8e3a2" />
      </div>

    </div>

  </div>

</section>
  );
}