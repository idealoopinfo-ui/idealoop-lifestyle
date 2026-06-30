import "./ProductPreview.css";

const products = [
  {
    title: "Minimal Desk Lamp",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
  },
  {
    title: "Soft Cotton Shirt",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    title: "Glow Skincare Kit",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571",
  },
  {
    title: "Modern Vase Decor",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  },
];

export default function ProductPreview() {
  return (
    <section className="product-preview">

      <div className="section-header">
        <h2>✨ Category Spotlight</h2>
        <p>Discover curated lifestyle picks in one place</p>
      </div>

      <div className="spotlight-container">

        {/* LARGE IMAGE */}
        <div className="big-image">
          <img src={products[0].image} alt={products[0].title} />
        </div>

        {/* 3 SMALL IMAGES */}
        <div className="small-grid">

          {products.slice(1, 4).map((item, index) => (
            <div className="small-card" key={index}>
              <img src={item.image} alt={item.title} />
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}