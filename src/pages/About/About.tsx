import "./About.css";

export default function About() {

return (

<div className="about-page">


<section className="about-hero">

  <div className="about-text">

    <h1>
      Discover Better Lifestyle Products
    </h1>

    <p>
      Idealoop Lifestyle helps you discover carefully selected products across fashion, beauty, fitness, home, and everyday essentials.
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
    How We Help You Discover Products
  </h2>


  <div className="mission-grid">


    <div>

      <h3>
        Curated Selection
      </h3>

      <p>
        We research and highlight products that are useful, popular, and relevant to modern lifestyles.
      </p>

    </div>



    <div>

      <h3>
        Simple Discovery
      </h3>

      <p>
        We make it easier to explore product ideas without searching across many different websites.
      </p>

    </div>



    <div>

      <h3>
        Lifestyle Categories
      </h3>

      <p>
        Explore fashion, beauty, wellness, home essentials, and gifts in one organized marketplace.
      </p>

    </div>


  </div>

</section>




<section className="about-goal">

  <h2>
    Our Goal
  </h2>


  <p>
    Our goal is to help shoppers discover useful products through simple recommendations, helpful information, and trusted shopping links.
  </p>


</section>




<section className="affiliate-note">

  <p>
    Some links on Idealoop Lifestyle may be affiliate links. We may earn a commission when you purchase through these links at no extra cost to you.
  </p>

</section>


</div>

);

}