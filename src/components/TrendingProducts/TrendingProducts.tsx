import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import ProductCard from "../ProductCard/ProductCard";

import "./TrendingProducts.css";

const PRODUCTS_PER_VIEW = 10;

function getRotationIndex(totalProducts: number) {
  if (totalProducts <= PRODUCTS_PER_VIEW) {
    return 0;
  }

  const now = new Date();

  // Two rotations per day:
  // 0 = 9 AM selection
  // 1 = 9 PM selection
  const hour = now.getHours();

  const rotation =
    hour >= 21 || hour < 9 ? 1 : 0;

  const dateKey =
    now.getFullYear() * 10000 +
    (now.getMonth() + 1) * 100 +
    now.getDate();

  return (
    (dateKey * 2 + rotation) %
    totalProducts
  );
}

export default function TrendingProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("trending", true);

    if (error) {
      console.error(
        "Error loading trending products:",
        error
      );
      return;
    }

    const allProducts = data || [];

    if (allProducts.length <= PRODUCTS_PER_VIEW) {
      setProducts(allProducts);
      return;
    }

    const startIndex =
      getRotationIndex(allProducts.length);

    const selectedProducts = [];

    for (let i = 0; i < PRODUCTS_PER_VIEW; i++) {
      selectedProducts.push(
        allProducts[
          (startIndex + i) % allProducts.length
        ]
      );
    }

    setProducts(selectedProducts);
  };

  return (
    <section className="trending-products">

      <h2>🔥 Trending Now</h2>

      <div className="trending-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
}