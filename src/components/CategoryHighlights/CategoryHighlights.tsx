import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";
import "./CategoryHighlights.css";

type Product = {
  id: string;
  category: string;
};

export default function CategoryHighlights() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("products")
      .select("category");

    if (!data) return;

    // group categories
    const grouped: Record<string, number> = {};

    data.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = 0;
      }
      grouped[item.category]++;
    });

    const result = Object.keys(grouped).map((key) => ({
      name: key,
      count: grouped[key],
    }));

    setCategories(result);
  };

  return (
    <section className="highlight">

      {categories.slice(0, 3).map((cat) => (
        <Link
          to={`/category/${cat.name}`}
          className="box"
          key={cat.name}
        >
          <h3>
            {cat.name === "home" && "🏡 "}
            {cat.name === "clothing" && "👗 "}
            {cat.name === "beauty" && "💄 "}
            {cat.name}
          </h3>

          <p>{cat.count} products</p>
        </Link>
      ))}

    </section>
  );
}