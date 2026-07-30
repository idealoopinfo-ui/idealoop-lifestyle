
import "./WelcomeSection.css";

function WelcomeSection() {
  return (
    <section className="welcome-section">
      <div className="welcome-content">

        <span className="welcome-label">
          Welcome to Idealoop Lifestyle
        </span>

        <h2>
          Discover products that fit
          <span> your lifestyle.</span>
        </h2>

        <p className="welcome-intro">
          Idealoop Lifestyle is a curated marketplace designed to
          help you discover interesting products, useful ideas, and
          everyday inspiration in one place.
        </p>

        <p className="welcome-description">
          We explore trending products and create simple shopping
          experiences to help you find things worth discovering.
        </p>

      </div>
    </section>
  );
}

export default WelcomeSection;
