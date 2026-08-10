
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  categories,
  type CategoryNode,
} from "../../data/categories";

import SearchBar from "../Search/SearchBar";

import "./CategoryNavbar.css";

export default function CategoryNavbar() {
  const navigate = useNavigate();

  const [activePath, setActivePath] = useState<CategoryNode[]>([]);

  const handleEnter = (
    node: CategoryNode,
    level: number
  ) => {
    setActivePath((current) => [
      ...current.slice(0, level),
      node,
    ]);
  };
  const handleNavigate = (path: CategoryNode[]) => {
    const slugs = path
      .map((item) => item.slug)
      .filter(Boolean);

    if (!slugs.length) return;

    navigate(`/category/${slugs.join("/")}`);

    setActivePath([]);
  };

  const handleLeave = () => {
    setActivePath([]);
  };

  return (
    <div
      className="category-navbar"
      onMouseLeave={handleLeave}
    >
      {/* =========================
          LEFT MENU
      ========================== */}

      <div className="category-left">
        {categories.map((department) => (
          <div
            key={department.slug}
            className="nav-item"
            onMouseEnter={() =>
              handleEnter(department, 0)
            }
            onClick={() =>
              handleNavigate([department])
            }
          >
            {department.name}
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

      {/* =========================
          SEARCH
      ========================== */}

      <div className="category-search">
        <SearchBar />
      </div>

      {/* =========================
          MULTI-LEVEL DROPDOWN
      ========================== */}

      {activePath.length > 0 && (
        <div className="dropdown">
          {activePath.map((node, level) => {
            if (!node.children?.length) {
              return null;
            }

            return (
              <div
                className="dropdown-column"
                key={`${node.slug}-${level}`}
              >
                {node.children.map((child) => {
                  const isActive =
                    activePath[level + 1]?.slug ===
                    child.slug;

                  const hasChildren =
                    child.children?.length > 0;

                  const childPath = [
                    ...activePath.slice(0, level + 1),
                    child,
                  ];

                  return (
                    <div
                      key={`${child.slug}-${level}`}
                      className={`dropdown-item ${
                        isActive ? "active" : ""
                      }`}
                      onMouseEnter={() =>
                        handleEnter(
                          child,
                          level + 1
                        )
                      }
                      onClick={(event) => {
                        event.stopPropagation();

                        handleNavigate(childPath);
                      }}
                    >
                      <span>{child.name}</span>

                      {hasChildren && (
                        <span className="dropdown-arrow">
                          ›
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

