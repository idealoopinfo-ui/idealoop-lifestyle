import './Trending.css';

const items = [
  'Minimal Home Decor',
  'Summer Fashion Picks',
  'Glow Skincare Essentials',
  'Modern Lifestyle Tools',
];

export default function Trending() {
  return (
    <section className="trending">
      <h2>🔥 Trending Now</h2>
      <p>What people are loving this week</p>

      <div className="tags">
        {items.map((item, i) => (
          <span key={i} className="tag">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
