import { useMemo } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { useProducts } from '../../hooks/useProducts';

type Props = {
  search: string;
  category: string;
};

export default function ProductGrid({ search, category }: Props) {
  const { products, loading } = useProducts();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = category === 'all' || p.category === category;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [products, search, category]);

  if (loading) return <p style={{ padding: 40 }}>Loading products...</p>;

  return (
    <section className="grid-section">
      <div className="grid">
        {filtered.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
