import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "../../data/categories";
import "./CategoryNavbar.css";

export default function CategoryNavbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <nav className="category-navbar">

      {/* LEFT: CATEGORIES */}
      <div className="nav-left">

        {categories.map((category) => (
          <div className="dropdown" key={category.title}>
            <button className="drop-btn">{category.title}</button>

            <div className="dropdown-content">

              {category.gendered ? (
                Object.entries(category.items).map(([gender, items]) => (
                  <div key={gender} className="gender-group">

                    <strong
                      onClick={() =>
                        navigate(`/products?category=${category.title}&gender=${gender}`)
                      }
                    >
                      {gender}
                    </strong>

                    {items.map((item) => (
                      <Link
                        key={item}
                        to={`/products?category=${category.title}&gender=${gender}&subcategory=${item}`}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                ))
              ) : (
                category.items.map((item) => (
                  <Link
                    key={item}
                    to={`/products?category=${category.title}&subcategory=${item}`}
                  >
                    {item}
                  </Link>
                ))
              )}

            </div>
          </div>
        ))}

        <Link to="/contact" className="nav-link">
          Contact Us
        </Link>

      </div>

      {/* RIGHT: SEARCH */}
      <div className="nav-right">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => navigate(`/products?search=${search}`)}>
          Search
        </button>
      </div>

    </nav>
  );
}