import Navbar from '../../components/Navbar/Navbar';
import ProductGrid from '../../components/ProductGrid/ProductGrid';

export default function ClothingCategory() {
  return (
    <>
      <Navbar />
      <ProductGrid category="clothing" />
    </>
  );
}
