import "./Trending.css";

const items = [
  {
    title: "Minimal Home Decor",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    link: "/category/home",
  },
  {
    title: "Summer Fashion Picks",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    link: "/category/clothing",
  },
  {
    title: "Glow Skincare Essentials",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    link: "/category/beauty",
  },
  {
    title: "Modern Lifestyle Tools",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    link: "/category/tools",
  },
];

export default function Trending() {
  return (
    <section className="trending">
      <div className="section-header">
        <h2>🔥 Trending This Week</h2>
        <p>Discover what's popular right now</p>
      </div>

      <div className="trending-grid">
        {items.map((item, index) => (
          <a href={item.link} className="trend-card" key={index}>
            <img src={item.image} alt={item.title} />

            <div className="trend-content">
              <h3>{item.title}</h3>
              <span>Explore →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}