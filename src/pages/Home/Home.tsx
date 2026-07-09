import Hero from "../../components/Hero/Hero";
import Collections from "../../components/Collections/Collections";
import ProductPreview from "../../components/ProductPreview/ProductPreview";

import FeaturedProducts from "../../components/Home/FeaturedProducts";
import CategoryShowcase from "../../components/CategoryShowcase/CategoryShowcase";
import TrendingProducts from "../../components/TrendingProducts/TrendingProducts";
import WhyChoose from "../../components/WhyChoose/WhyChoose";
import About from "../../components/About/About";

import "./Home.css";

export default function Home(){

return(

<div className="home-page">


<section className="home-section">
<Hero/>
</section>


<section className="home-section">
<FeaturedProducts/>
</section>


<section className="home-section">
<CategoryShowcase/>
</section>


<section className="home-section">
<TrendingProducts/>
</section>


<section className="home-section">
<About/>
</section>


<section className="home-section">
<WhyChoose/>
</section>


<section className="home-section">
<ProductPreview/>
</section>


</div>

);

}