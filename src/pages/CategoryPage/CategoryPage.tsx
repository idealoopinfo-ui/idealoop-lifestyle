import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [slug]);

  const fetchProducts = async () => {
    setLoading(true);

    let query = supabase.from("products").select("*");

    // ✅ FIX: safer category matching
    if (slug && slug !== "all") {
      query = query.eq("category", slug.toLowerCase().trim());
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

      {/* HERO */}
      <div className="category-hero">
        <h1>
          {slug ? slug.replace("-", " ").toUpperCase() : "ALL PRODUCTS"}
        </h1>
        <p>Explore the best products in this category</p>
      </div>

      {/* FILTERS (UI only) */}
      <div className="category-filters">
        <select>
          <option>Sort by: Popular</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>

        <select>
          <option>All Brands</option>
          <option>Amazon</option>
          <option>AliExpress</option>
        </select>
      </div>

      {/* GRID */}
      <div className="product-grid">

        {loading ? (
          <p className="state-text">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="state-text">No products found in this category</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product.id}>

              <img
                src={product.main_image_url}
                alt={product.title}
                className="product-image"
              />

              <h3 className="product-title">
                {product.title}
              </h3>

              <div className="product-actions">

                <button
                  className="shop-btn"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  🛒 Shop Now
                </button>

                <button
                  className="view-btn"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  View Details
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}