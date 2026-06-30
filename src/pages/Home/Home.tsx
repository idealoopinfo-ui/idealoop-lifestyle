import Hero from '../../components/Hero/Hero';
import Categories from '../../components/Categories/Categories';
import Collections from '../../components/Collections/Collections';
import ProductPreview from '../../components/ProductPreview/ProductPreview';
import Trending from '../../components/Trending/Trending';
import CategoryHighlights from '../../components/CategoryHighlights/CategoryHighlights';
import WhyChoose from "../../components/WhyChoose/WhyChoose";
import About from "../../components/About/About";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  return (
    <>
     

      <div className="container">
        <Hero />
        <Categories />
        <Trending />
        
        <Collections />
        <WhyChoose />
        <About />
        <ProductPreview />
        
      </div>
    </>
  );
}
