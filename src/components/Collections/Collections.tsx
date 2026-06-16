import './Collections.css';

export default function Collections() {
  return (
    <section className="collections">
      <h2>⭐ Featured Collections</h2>
      <p>Curated lifestyle picks for you</p>

      <div className="grid">
        <div className="card">
          <h3>Minimal Home Living</h3>
          <p>Clean, aesthetic home essentials</p>
        </div>

        <div className="card">
          <h3>Everyday Fashion</h3>
          <p>Simple outfits that always work</p>
        </div>

        <div className="card">
          <h3>Beauty Routine Kit</h3>
          <p>Skincare & glow essentials</p>
        </div>
      </div>
    </section>
  );
}
