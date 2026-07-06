import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";
import Collections from "../../components/Collections/Collections";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import TrendingProducts from "../../components/TrendingProducts/TrendingProducts";
import WhyChoose from "../../components/WhyChoose/WhyChoose";
import About from "../../components/About/About";

import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">

      {/* HERO */}
      <section>
        <Hero />
      </section>

      {/* TRENDING */}
      <section>
        <TrendingProducts />
      </section>

      {/* CATEGORIES */}
      <section>
        <Categories />
      </section>

      {/* COLLECTIONS */}
      <section>
        <Collections />
      </section>

      {/* PRODUCT PREVIEW */}
      <section>
        <ProductPreview />
      </section>

      {/* WHY CHOOSE */}
      <section>
        <WhyChoose />
      </section>

      {/* ABOUT */}
      <section>
        <About />
      </section>

    </div>
  );
}