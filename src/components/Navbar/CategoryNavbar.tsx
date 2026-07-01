import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "../../data/categories";
import "./CategoryNavbar.css";

export default function CategoryNavbar() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <nav className="category-navbar">

      {/* LEFT: MAIN CATEGORIES */}
      <div className="nav-left">

        {categories.map((category) => (
          <div
            key={category.id}
            className="dropdown"
            onMouseEnter={() => setOpenId(category.id)}
            onMouseLeave={() => setOpenId(null)}
          >

            {/* MAIN BUTTON */}
            <button className="drop-btn">
              {category.name} ▼
            </button>

            {/* DROPDOWN */}
            {openId === category.id && (
              <div className="dropdown-content">

                {category.items.map((item: any, index: number) =>
                  typeof item === "string" ? (
                    <div
                      key={item + index}
                      className="dropdown-item"
                      onClick={() =>
                        navigate(`/category/${category.slug}?sub=${item}`)
                      }
                    >
                      {item}
                    </div>
                  ) : (
                    <div key={item.name + index} className="dropdown-group">

                      {/* MAIN SUB CATEGORY */}
                      <div
                        className="dropdown-item main-item"
                        onClick={() =>
                          navigate(
                            `/category/${category.slug}?sub=${item.name}`
                          )
                        }
                      >
                        {item.name}
                      </div>

                      {/* INNER SUB ITEMS */}
                      <div className="dropdown-sub">
                        {item.sub.map((subItem: string, subIndex: number) => (
                          <div
                            key={subItem + subIndex}
                            className="dropdown-sub-item"
                            onClick={() =>
                              navigate(
                                `/category/${category.slug}?sub=${item.name}&type=${subItem}`
                              )
                            }
                          >
                            {subItem}
                          </div>
                        ))}
                      </div>

                    </div>
                  )
                )}

              </div>
            )}

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