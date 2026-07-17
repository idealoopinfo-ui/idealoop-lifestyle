import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";

type Product = {
  product_id: string;
  title: string;
  main_image_url?: string;
  image?: string;
  image_1?: string;
  affiliate_url?: string;
};

type Props = {
  search: string;
  category: string;
};

export default function ProductGrid({ search, category }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const fetchProducts = async () => {
    setLoading(true);

    let query = supabase.from("products").select("*");

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const { data, error } = await query;

    if (!error) {
      setProducts(data || []);
    }

    setLoading(false);
  };


  if (loading) return <p>Loading products...</p>;

  return (
    <div className="product-grid">
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((p) => (
          <ProductCard
  key={p.product_id}
  product={p}
/>
        ))
      )}
    </div>
  );
}