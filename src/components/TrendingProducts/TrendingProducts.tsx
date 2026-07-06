import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import ProductCard from "../ProductCard/ProductCard";

export default function TrendingProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("likes", { ascending: false })
      .limit(8);

    setProducts(data || []);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔥 Trending Products</h2>

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            image={p.main_image_url}
            likes={p.likes}
          />
        ))}
      </div>
    </div>
  );
}