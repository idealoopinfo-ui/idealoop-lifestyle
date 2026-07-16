import "./About.css";

export default function About() {

  return (
    <div className="about-page">

      <section className="about-hero">

        <div className="about-text">

          <h1>
            Discover Products Worth Finding
          </h1>

          <p>
            IdeaLoop helps you discover useful, trending,
            and innovative products across everyday
            lifestyle categories.
          </p>

          <button>
            Explore Products
          </button>

        </div>


        <div className="about-image">

          <img
            src="https://lxvoytlpnbzwxplxfnxj.supabase.co/storage/v1/object/public/my/1f1ccea0-bfdf-4096-9886-fc7720a77ae1.png"
            alt="Shopping lifestyle"
          />

        </div>

      </section>


      <section className="about-mission">

        <h2>
          Why Choose IdeaLoop?
        </h2>

        <div className="mission-grid">

          <div>
            <h3>Curated Finds</h3>
            <p>
              We discover products that are useful,
              trending, and worth exploring.
            </p>
          </div>


          <div>
            <h3>Easy Shopping</h3>
            <p>
              Find products from different marketplaces
              in one place.
            </p>
          </div>


          <div>
            <h3>Multiple Categories</h3>
            <p>
              Explore home, beauty, fashion,
              fitness, and more.
            </p>
          </div>

        </div>

      </section>


      <section className="affiliate-note">

        <p>
          Some links on IdeaLoop may be affiliate links.
          We may earn a commission when you purchase
          through these links at no extra cost to you.
        </p>

      </section>


    </div>
  );
}