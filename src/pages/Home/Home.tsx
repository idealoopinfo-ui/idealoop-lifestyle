import Hero from "../../components/Hero/Hero";

import SpotlightSection from "../../components/SpotlightSection/SpotlightSection";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import FeaturedProducts from "../../components/Home/FeaturedProducts";
import CategoryShowcase from "../../components/CategoryShowcase/CategoryShowcase";
import TrendingProducts from "../../components/TrendingProducts/TrendingProducts";
import WhyChoose from "../../components/WhyChoose/WhyChoose";


import "./Home.css";

export default function Home(){

return(

<div className="home-page">


<section className="home-section">
  <Hero/>
</section>

<section className="home-section">
  <WelcomeSection/>
</section>

<section className="home-section">
  <CategoryShowcase/>
</section>


<section className="home-section">
  <FeaturedProducts/>
</section>


<section className="home-section">
  <TrendingProducts/>
</section>


<section className="home-section">
  <SpotlightSection/>
</section>


<section className="home-section">
  <WhyChoose/>
</section>

</div>

);

}