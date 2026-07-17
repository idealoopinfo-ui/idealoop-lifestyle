import { useState } from 'react';
import CategoryNavbar from "../../components/Navbar/CategoryNavbar";
import ProductFilter from '../../components/ProductFilter/ProductFilter';
import ProductGrid from '../../components/ProductGrid/ProductGrid';

export default function HomeCategory() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [subcategory,setSubcategory] = useState('');

  return (
    <>
      <CategoryNavbar />

      <ProductFilter
 search={search}
 setSearch={setSearch}
 category={category}
 setCategory={setCategory}
 subcategory={subcategory}
 setSubcategory={setSubcategory}
/>

      <ProductGrid search={search} category={category} />
    </>
  );
}