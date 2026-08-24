import Hero from "../../components/Hero/Hero";
import SpotlightSection from "../../components/SpotlightSection/SpotlightSection";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import FeaturedProducts from "../../components/Home/FeaturedProducts";
import CategoryShowcase from "../../components/CategoryShowcase/CategoryShowcase";
import TrendingProducts from "../../components/TrendingProducts/TrendingProducts";
import BeautyComingSoon from "../../components/BeautyComingSoon/BeautyComingSoon";
import WhyChoose from "../../components/WhyChoose/WhyChoose";

import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="home-section home-section-1">
        <Hero />
      </section>


      {/* =========================
          WELCOME
      ========================= */}

      <section className="home-section home-section-2">
        <WelcomeSection />
      </section>


      {/* =========================
          CATEGORIES
      ========================= */}

      <section className="home-section home-section-3">
        <CategoryShowcase />
      </section>


      {/* =========================
          FEATURED PRODUCTS
      ========================= */}

      <section className="home-section home-section-4">
        <FeaturedProducts />
      </section>


      {/* =========================
          TRENDING PRODUCTS
      ========================= */}

      <section className="home-section home-section-5">
        <TrendingProducts />
      </section>


      {/* =========================
          SPOTLIGHT
      ========================= */}

      <section className="home-section home-section-6">
        <SpotlightSection />
      </section>

      {/* =========================
          BEAUTY COMING SOON
        ========================= */}

      <section className="home-section home-section-7">
      <BeautyComingSoon />
      </section>



      {/* =========================
          WHY CHOOSE US
      ========================= */}

      <section className="home-section home-section-7">
        <WhyChoose />
      </section>

    </div>
  );
}