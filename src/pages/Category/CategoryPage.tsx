import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

    let query = supabase
      .from("products")
      .select("*");

    // filter by category slug via join
    if (category) {
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", category)
        .single();

      if (cat) {
        query = query.eq("category_id", cat.id);
      }
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) console.log(error);

    setProducts(data || []);
    setLoading(false);
  };

  return (
    <div className="category-page">
      <h1 className="category-title">
        {category?.replace("-", " ").toUpperCase()}
      </h1>

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
            />
          ))
        )}
      </div>
    </div>
  );
}