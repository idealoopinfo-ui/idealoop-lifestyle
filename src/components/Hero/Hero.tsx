import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Discover a Better Lifestyle</h1>

        <p>
          Curated Home, Clothing & Beauty essentials made simple.
        </p>

        <div className="buttons">
          <button>Shop Home</button>
          <button>Shop Clothing</button>
          <button>Shop Beauty</button>
        </div>
      </div>

      <div className="hero-images">
        <img
          src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
          alt="Home essentials"
        />
        <img
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
          alt="Clothing fashion"
        />
        <img
          src="https://images.unsplash.com/photo-1612810436541-336d12d8e3a2"
          alt="Beauty products"
        />
      </div>
    </section>
  );
}