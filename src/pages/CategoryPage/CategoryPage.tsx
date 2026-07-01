import { useParams } from "react-router-dom";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { slug } = useParams();

  return (
    <div className="category-page">

      <div className="category-hero">
        <h1>Category: {slug}</h1>
        <p>Explore the best products in this category</p>
      </div>

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

      <div className="product-grid">

        {/* Sample Product Cards */}
        <div className="product-card">
          <div className="product-image"></div>
          <h3>Minimal Desk Lamp</h3>
          <p>$29.99</p>
        </div>

        <div className="product-card">
          <div className="product-image"></div>
          <h3>Modern Chair</h3>
          <p>$89.99</p>
        </div>

        <div className="product-card">
          <div className="product-image"></div>
          <h3>Wooden Table</h3>
          <p>$129.99</p>
        </div>

      </div>

    </div>
  );
}