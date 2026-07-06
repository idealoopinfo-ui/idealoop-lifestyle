import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../../data/categories";
import "./CategoryNavbar.css";

export default function CategoryNavbar() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<any | null>(null);
  const [activeChild, setActiveChild] = useState<any | null>(null);

  return (
    <div
      className="category-navbar"
      onMouseLeave={() => {
        setActiveCategory(null);
        setActiveChild(null);
      }}
    >
      {/* LEFT: MAIN CATEGORIES */}
      <div className="nav-left">
        {categories.map((category) => (
          <div
            key={category.slug}
            className="nav-item"
            onMouseEnter={() => {
              setActiveCategory(category);
              setActiveChild(null);
            }}
          >
            {category.name}
          </div>
        ))}
      </div>

      {/* RIGHT: SEARCH */}
      <div className="nav-right">
        {/* <SearchBar /> */}
      </div>

      {/* DROPDOWN */}
      {activeCategory && (
        <div className="dropdown">
          {/* LEVEL 2 */}
          <div className="dropdown-column">
            {activeCategory.children?.map((child: any) => (
              <div
                key={child.slug}
                className={`dropdown-item ${
                  activeChild?.slug === child.slug ? "active" : ""
                }`}
                onMouseEnter={() => setActiveChild(child)}
              >
                {child.name}
              </div>
            ))}
          </div>

          {/* LEVEL 3 */}
          {activeChild && activeChild.children?.length > 0 && (
            <div className="dropdown-column">
              {activeChild.children.map((group: any) => (
                <div key={group.slug} className="dropdown-group">
                  <div className="group-title">{group.name}</div>

                  <div className="group-items">
                    {group.children?.map((item: any) => (
                      <div
                        key={item.slug}
                        className="group-item"
                        onClick={() =>
                          navigate(
                            `/category/${activeCategory.slug}/${activeChild.slug}/${item.slug}`
                          )
                        }
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}