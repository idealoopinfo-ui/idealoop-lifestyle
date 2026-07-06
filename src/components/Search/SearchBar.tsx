import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./SearchBar.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const navigate = useNavigate();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      fetchResults(query);
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const fetchResults = async (value: string) => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${value}%`)
      .limit(8);

    setResults(data || []);
    setShowDropdown(true);
    setActiveIndex(-1);
  };

  const handleSelect = (id: number) => {
    setQuery("");
    setResults([]);
    setShowDropdown(false);
    setActiveIndex(-1);
    navigate(`/product/${id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : results.length - 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) {
        handleSelect(results[activeIndex].id);
      }
    }

    if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <div className="search-bar">
      <input
        value={query}
        placeholder="Search products..."
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        onKeyDown={handleKeyDown}
      />

      {showDropdown && results.length > 0 && (
        <div className="search-dropdown">
          {results.map((item, index) => (
            <div
              key={item.id}
              className={`search-item ${
                index === activeIndex ? "active" : ""
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => handleSelect(item.id)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}