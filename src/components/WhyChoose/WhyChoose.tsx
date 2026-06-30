import "./WhyChoose.css";

const features = [
  {
    icon: "🛍️",
    title: "All Products in One Place",
    text: "Discover items from multiple platforms in one simple view.",
  },
  {
    icon: "⚡",
    title: "Fast Discovery",
    text: "Quickly find trending and useful products without searching everywhere.",
  },
  {
    icon: "🔗",
    title: "Affiliate Picks",
    text: "We curate products from trusted external stores and platforms.",
  },
  {
    icon: "💡",
    title: "Smart Selection",
    text: "Only relevant, useful, and trending products are shown.",
  },
];

export default function WhyChoose() {
  return (
    <section className="why-choose">
      <div className="section-header">
        <h2>Why Idealoop?</h2>
        <p>Simple product discovery across multiple platforms.</p>
      </div>

      <div className="feature-grid">
        {features.map((item, index) => (
          <div className="feature-card" key={index}>
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}