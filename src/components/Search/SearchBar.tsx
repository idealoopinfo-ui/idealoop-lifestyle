import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./SearchBar.css";

interface Product {
  id: number;
  title: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      const { data } = await supabase
        .from("products")
        .select("id,title")
        .ilike("title", `%${query}%`)
        .limit(6);

      setResults(data || []);
    };

    fetchResults();
  }, [query]);

  const goSearch = () => {
    if (results.length > 0) {
      navigate(`/product/${results[0].id}`);
      setShow(false);
    }
  };

  return (
    <div className="search-wrapper">
  <span className="search-icon">🔍</span>

  <input
    type="text"
    placeholder="Search products..."
    value={query}
    onFocus={() => setShow(true)}
    onBlur={() => setTimeout(() => setShow(false), 200)}
    onChange={(e) => setQuery(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        goSearch();
      }
    }}
  />

  {show && results.length > 0 && (
    <div className="suggestions">
      {results.map((item) => (
        <div
          key={item.id}
          className="suggestion-item"
          onMouseDown={() => navigate(`/product/${item.id}`)}
        >
          <div className="suggestion-title">
            {item.title.length > 50
              ? item.title.substring(0, 50) + "..."
              : item.title}
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  );
}