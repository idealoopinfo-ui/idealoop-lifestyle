import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import ProductCard from "../../components/ProductCard/ProductCard";

export default function CategoryPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const sub = searchParams.get("sub");

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Normalize helper (VERY IMPORTANT for DB matching)
  const normalize = (str: string | null) =>
    str ? str.toLowerCase().trim().replace(/\s+/g, "-") : null;

  useEffect(() => {
    fetchProducts();
  }, [category, sub]);

  const fetchProducts = async () => {
    setLoading(true);

    let query = supabase.from("products").select("*");

    // CATEGORY FILTER
    if (category) {
      query = query.eq("category", normalize(category));
    }

    // SUBCATEGORY FILTER
    if (sub) {
      query = query.eq("subcategory", normalize(sub));
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) {
      console.log("Error loading products:", error);
    }

    setProducts(data || []);
    setLoading(false);
  };

  // Format title nicely for UI
  const formatTitle = (text: string | null) => {
    if (!text) return "";
    return text.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="category-page">

      {/* TITLE */}
      <h1 className="category-title">
        {sub
          ? formatTitle(sub)
          : category
          ? formatTitle(category)
          : "Category"}
      </h1>

      {/* PRODUCTS */}
      <div className="product-grid">
        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              image={p.main_image_url}
              likes={p.likes}
            />
          ))
        )}
      </div>

    </div>
  );
}