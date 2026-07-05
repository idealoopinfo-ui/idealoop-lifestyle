import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import ProductCard from "../../components/ProductCard/ProductCard";

export default function CategoryPage() {
  const { category } = useParams();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);

    let query = supabase.from("products").select("*");

    if (category && category !== "all") {
      query = query.eq("category", category.toLowerCase());
    }

    const { data, error } = await query;

    if (error) {
      console.log("Error loading products:", error);
    }

    setProducts(data || []);
    setLoading(false);
  };

  return (
    <div className="category-page">

      {/* ✅ CATEGORY TITLE */}
      <h1 className="category-title">
        {category ? category.toUpperCase() : "CATEGORY"}
      </h1>

      {/* ✅ CONTENT */}
      <div className="product-grid">

        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((p: any) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              image={p.main_image_url}
            />
          ))
        )}

      </div>

    </div>
  );
}