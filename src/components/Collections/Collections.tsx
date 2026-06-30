import "./Collections.css";

const products = [
  {
    name: "Minimal Home Living",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
  },
  {
    name: "Everyday Fashion",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
  },
  {
    name: "Beauty Essentials",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
  },
  {
    name: "Modern Lifestyle",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
  },
];

export default function Collections() {
  return (
    <section className="collections">

      <div className="section-header">
        <h2>Featured Products</h2>
        <p>Discover handpicked lifestyle collections from across platforms</p>
      </div>

      <div className="scroll-container">
        {products.map((item, index) => (
          <div className="scroll-card" key={index}>
            <img src={item.image} alt={item.name} />
            <div className="overlay">
              <h3>{item.name}</h3>
              <button>Explore</button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}