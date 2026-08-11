import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  categories,
  type CategoryNode,
} from "../../data/categories";

import SearchBar from "../Search/SearchBar";

import "./CategoryNavbar.css";

export default function CategoryNavbar() {
  const navigate = useNavigate();

  const [activePath, setActivePath] = useState<
    CategoryNode[]
  >([]);

  // =========================================
  // HOVER NODE
  // =========================================

  const handleEnter = (
    node: CategoryNode,
    level: number
  ) => {
    setActivePath((current) => [
      ...current.slice(0, level),
      node,
    ]);
  };

  // =========================================
  // NAVIGATE
  // =========================================

  const handleNavigate = (
    path: CategoryNode[]
  ) => {
    const slugs = path
      .map((item) => item.slug)
      .filter(Boolean);

    if (slugs.length === 0) {
      return;
    }

    navigate(
      `/category/${slugs.join("/")}`
    );

    setActivePath([]);
  };

  // =========================================
  // LEAVE NAVBAR
  // =========================================

  const handleLeave = () => {
    setActivePath([]);
  };

  return (
    <div
      className="category-navbar"
      onMouseLeave={handleLeave}
    >

      {/* =====================================
          LEFT MENU
      ====================================== */}

      <div className="category-left">

        {categories.map(
          (department) => (
            <div
              key={department.slug}
              className="nav-item"
              onMouseEnter={() =>
                handleEnter(
                  department,
                  0
                )
              }
              onClick={() =>
                handleNavigate([
                  department,
                ])
              }
            >
              {department.name}
            </div>
          )
        )}

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

      {/* =====================================
          SEARCH
      ====================================== */}

      <div className="category-search">
        <SearchBar />
      </div>

      {/* =====================================
          DROPDOWN
      ====================================== */}

      {activePath.length > 0 && (
        <div className="dropdown">

          {activePath.map(
            (node, level) => {

              if (
                !node.children ||
                node.children.length === 0
              ) {
                return null;
              }

              return (
                <div
                  key={`${node.slug}-${level}`}
                  className="dropdown-column"
                >

                  {node.children.map(
                    (child) => {

                      const hasChildren =
                        child.children &&
                        child.children.length > 0;

                      const isActive =
                        activePath[
                          level + 1
                        ]?.slug ===
                        child.slug;

                      const childPath = [
                        ...activePath.slice(
                          0,
                          level + 1
                        ),
                        child,
                      ];

                      return (
                        <div
                          key={`${child.slug}-${level}`}
                          className={`dropdown-item ${
                            isActive
                              ? "active"
                              : ""
                          }`}
                          onMouseEnter={() =>
                            handleEnter(
                              child,
                              level + 1
                            )
                          }
                          onClick={(event) => {
                            event.stopPropagation();

                            handleNavigate(
                              childPath
                            );
                          }}
                        >

                          <span>
                            {child.name}
                          </span>

                          {hasChildren && (
                            <span className="dropdown-arrow">
                              ›
                            </span>
                          )}

                        </div>
                      );
                    }
                  )}

                </div>
              );
            }
          )}

        </div>
      )}

    </div>
  );
}