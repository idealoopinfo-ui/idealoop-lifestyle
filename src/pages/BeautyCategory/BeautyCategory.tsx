import CategoryNavbar from "../../components/Navbar/CategoryNavbar";
import ProductGrid from '../../components/ProductGrid/ProductGrid';

export default function BeautyCategory() {
  return (
    <>
     <CategoryNavbar />
     <ProductGrid 
  category="beauty"
  search=""
/>
    </>
  );
}
