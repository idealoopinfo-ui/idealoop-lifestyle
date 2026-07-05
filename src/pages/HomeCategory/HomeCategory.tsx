import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ProductFilter from '../../components/ProductFilter/ProductFilter';
import ProductGrid from '../../components/ProductGrid/ProductGrid';

export default function HomeCategory() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  return (
    <>
      <Navbar />

      <ProductFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      <ProductGrid search={search} category={category} />
    </>
  );
}