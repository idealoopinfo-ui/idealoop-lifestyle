import { useParams, useNavigate } from "react-router-dom";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  return (
    <div className="category-page">

      {/* HERO */}
      <div className="category-hero">
        <h1>{slug?.replace("-", " ")}</h1>
        <p>Explore the best products in this category</p>
      </div>

      {/* FILTERS */}
      <div className="category-filters">
        <select>
          <option>Sort by: Popular</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>

        <select>
          <option>All Brands</option>
          <option>Amazon</option>
          <option>AliExpress</option>
        </select>
      </div>

      {/* PRODUCT GRID */}
      <div className="product-grid">

        <div className="product-card">
          <div className="product-image"></div>

          <h3>Minimal Desk Lamp</h3>

          {/* ACTIONS */}
          <div className="product-actions">

            <button
              className="shop-btn"
              onClick={() => navigate("/product/1")}
            >
              🛒 Shop Now
            </button>

            <button
              className="view-btn"
              onClick={() => navigate("/product/1")}
            >
              View Details
            </button>

          </div>
        </div>

        <div className="product-card">
          <div className="product-image"></div>

          <h3>Modern Chair</h3>

          <div className="product-actions">
            <button className="shop-btn" onClick={() => navigate("/product/2")}>
              🛒 Shop Now
            </button>

            <button className="view-btn" onClick={() => navigate("/product/2")}>
              View Details
            </button>
          </div>
        </div>

        <div className="product-card">
          <div className="product-image"></div>

          <h3>Wooden Table</h3>

          <div className="product-actions">
            <button className="shop-btn" onClick={() => navigate("/product/3")}>
              🛒 Shop Now
            </button>

            <button className="view-btn" onClick={() => navigate("/product/3")}>
              View Details
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}