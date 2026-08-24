import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  categories,
  type CategoryNode,
} from "../../data/categories";

import SearchBar from "../Search/SearchBar";

import "./CategoryNavbar.css";

export default function CategoryNavbar() {
  const navigate = useNavigate();

  const [activePath, setActivePath] = useState<CategoryNode[]>(
    []
  );

  const closeTimer = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);


  // =========================================
  // CANCEL CLOSE
  // =========================================

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };


  // =========================================
  // HOVER NODE
  // =========================================

  const handleEnter = (
    node: CategoryNode,
    level: number
  ) => {

    cancelClose();

    setActivePath((current) => [
      ...current.slice(0, level),
      node,
    ]);
  };


  // =========================================
  // DELAYED CLOSE
  // =========================================

  const handleLeave = () => {

    cancelClose();

    closeTimer.current = setTimeout(() => {

      setActivePath([]);

    }, 600);
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
  
    if (!slugs.length) return;
  
    /*
     * URL structure:
     *
     * /category/:department
     * /category/:department/:category
     * /category/:department/:category/:subcategory
     * /category/:department/:category/:subcategory/:collection
     * /category/:department/:category/:subcategory/:collection/:productType
     *
     * The hierarchy in categories.ts determines
     * how many levels are included.
     */
  
    const url =
      `/category/${slugs.join("/")}`;
  
    navigate(url);
  
    cancelClose();
  
    setActivePath([]);
  };


  // =========================================
  // RENDER
  // =========================================

  return (

    <div
      className="category-navbar-wrapper"
      onMouseEnter={cancelClose}
      onMouseLeave={handleLeave}
    >

      {/* =====================================
          NAVBAR
      ====================================== */}

      <div className="category-navbar">

        <div className="category-left">

          {categories.map((department) => (

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


        {/* =====================================
            SEARCH
        ====================================== */}

        <div className="category-search">

          <SearchBar />

        </div>

      </div>


      {/* =====================================
          DROPDOWN
      ====================================== */}

      {activePath.length > 0 && (

        <div
          className="dropdown"

          onMouseEnter={cancelClose}

          onMouseLeave={handleLeave}
        >

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
                        child.children?.length > 0;


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

                          <span className="dropdown-label">

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