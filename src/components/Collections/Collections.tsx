import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import "./Collections.css";

type Product = {
  id: string;
  title: string;
  main_image_url: string;
  category: string;
};

export default function Collections() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("featured", true);

    setProducts(data || []);
  };

  return (
    <section>

      <div className="section-header">
        <h2>Featured Products</h2>
        <p>Discover handpicked lifestyle collections</p>
      </div>

      <div className="scroll-container">
        {products.length === 0 ? (
          <p>No featured products yet</p>
        ) : (
          products.map((item) => (
            <div className="scroll-card" key={item.id}>
              <img src={item.main_image_url} alt={item.title} />

              <div className="overlay">
                <h3>{item.title}</h3>
                <button>
                  Explore
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </section>
  );
}