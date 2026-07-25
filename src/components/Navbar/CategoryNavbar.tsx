import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCategories } from "../../utils/categoryHelper";
import SearchBar from "../Search/SearchBar";

import "./CategoryNavbar.css";

export default function CategoryNavbar() {

  const navigate = useNavigate();
  const categories = getCategories();
  const [activePath, setActivePath] = useState<any[]>([]);


  return (
    <div
      className="category-navbar"
      onMouseLeave={() => {
        setActivePath([]);
      }}
    >
      {/* LEFT MENU */}
  
      <div className="category-left">
        {categories.map((category: any) => (
          <div
            key={category.slug}
            className="nav-item"
            onMouseEnter={() => {
              setActivePath([category]);
            }}
            onClick={() => navigate(`/category/${category.slug}`)}
          >
            {category.name}
          </div>
        ))}
  
        <Link
          to="/contact"
          className="nav-item static-link"
        >
          Contact Us
        </Link>
  
        <Link
          to="/help"
          className="nav-item static-link"
        >
          Help
        </Link>
      </div>
  
      {/* SEARCH */}
  
      <div className="category-search">
        <SearchBar />
      </div>
  
      {/* RECURSIVE DROPDOWN */}
  
      {activePath.length > 0 && (
        <div className="dropdown">
          {activePath.map((node: any, level: number) => (
            <div
              key={`${node.slug}-${level}`}
              className="dropdown-column"
            >
              {node.children?.map((child: any) => (
                <div
                  key={child.slug}
                  className={`dropdown-item ${
                    activePath[level + 1]?.slug === child.slug ? "active" : ""
                  }`}
                  onMouseEnter={() => {
                    const newPath = activePath.slice(0, level + 1);
                    newPath.push(child);
                    setActivePath(newPath);
                  }}
                  onClick={() => {
                    const path = [...activePath.slice(0, level + 1), child]
                      .map((item) => item.slug)
                      .join("/");
  
                    navigate(`/category/${path}`);
                  }}
                >
                  {child.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
                }