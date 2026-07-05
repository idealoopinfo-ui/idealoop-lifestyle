import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";
import "./Categories.css";

type Product = {
  id: string;
  title: string;
  category: string;
  main_image_url: string;
};

export default function Categories() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  };

  // group products by category
  const grouped = products.reduce((acc: any, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section className="categories">

      {Object.keys(grouped).map((cat) => (
        <Link key={cat} to={`/category/${cat}`} className="category-box">

          <h2>{cat}</h2>

          <div className="image-grid">
            {grouped[cat].slice(0, 4).map((p: Product) => (
              <img key={p.id} src={p.main_image_url} />
            ))}
          </div>

        </Link>
      ))}

    </section>
  );
}