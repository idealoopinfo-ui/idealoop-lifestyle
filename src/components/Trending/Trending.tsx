import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";
import "./Trending.css";

type Product = {
  id: string;
  title: string;
  main_image_url: string;
  category: string;
};

export default function Trending() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("trending", true);

    setItems(data || []);
  };

  return (
    <section>

      <h2>🔥 Trending This Week</h2>
      <p>Discover what's popular right now</p>

      <div className="trending-grid">
        {items.length === 0 ? (
          <p>No trending products yet</p>
        ) : (
          items.map((item) => (
            <Link
              to={`/category/${item.category}`}
              className="trend-card"
              key={item.id}
            >
              <img src={item.main_image_url} alt={item.title} />

              <div className="trend-content">
                <h3>{item.title}</h3>
                <span>Explore →</span>
              </div>
            </Link>
          ))
        )}
      </div>

    </section>
  );
}