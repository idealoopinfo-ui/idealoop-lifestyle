import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Categories from '../../components/Categories/Categories';
import Collections from '../../components/Collections/Collections';
import ProductPreview from '../../components/ProductPreview/ProductPreview';
import Trending from '../../components/Trending/Trending';
import CategoryHighlights from '../../components/CategoryHighlights/CategoryHighlights';

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="container">
        <Hero />
        <Categories />
        <Trending />
        <CategoryHighlights />
        <Collections />
        <ProductPreview />
      </div>
    </>
  );
}
