import "./About.css";

export default function About() {
  return (
    <section className="about">
      <div className="about-content">

        <div className="about-text">
          <span>ABOUT US</span>

          <h2>About Idealoop Lifestyle</h2>

          <p>
            Idealoop Lifestyle is your destination for discovering carefully
            selected products across home, fashion, beauty, and everyday
            living. We believe shopping should be inspiring, simple, and help
            you create a lifestyle you'll love.
          </p>

          <button>Learn More</button>
        </div>

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000"
            alt="Lifestyle"
          />
        </div>

      </div>
    </section>
  );
}