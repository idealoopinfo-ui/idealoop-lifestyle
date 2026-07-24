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

    const { data, error } = await supabase

      .from("products")
      .select("*")
      .or(
        `title.ilike.%${value}%,
        brand.ilike.%${value}%,
        category.ilike.%${value}%,
        subcategory.ilike.%${value}%`
        )
      .limit(8);

    if (error) {
      console.log("SEARCH ERROR:", error);
      return;
    }

    setResults(data || []);
    setShowDropdown(true);
    setActiveIndex(-1);

  };

  const handleSelect = (product: any) => {

    setQuery("");
    setResults([]);
    setShowDropdown(false);
    setActiveIndex(-1);

    navigate(`/product/${product.product_id}`);

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

        handleSelect(results[activeIndex]);

      }

    }

    if (e.key === "Escape") {

      setShowDropdown(false);

    }

  };

  return (

    <div className="search-container">

      <input
        type="text"
        value={query}
        placeholder="Search products..."
        className="search-input"
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        onKeyDown={handleKeyDown}
      />

      {showDropdown && (

        <div className="search-dropdown">

          {results.length === 0 ? (

            <div className="search-empty">

              No products found

            </div>

          ) : (

            results.map((item, index) => (

              <div
                key={item.id}
                className={`search-item ${index === activeIndex ? "active" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleSelect(item)}
              >

<img
src={item.image_1 || "/placeholder.png"}
alt={item.title}
className="search-thumb"
/>

                <div className="search-info">

                <h4>
{item.title.length > 55
? item.title.substring(0,55)+"..."
: item.title}
</h4>

                  <p>

                    {item.category}

                    {item.subcategory
                      ? ` • ${item.subcategory}`
                      : ""}

                  </p>

                </div>

              </div>

            ))

          )}

        </div>

      )}

    </div>

  );

}