import { useParams } from "react-router-dom";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();

  return (
    <div className="product-details">

      <div className="product-image">
        <img
          src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c"
          alt="Product"
        />
      </div>

      <div className="product-info">
        <h2>Product Title #{id}</h2>

        <p className="price">$29.99</p>

        <p className="desc">
          This is a sample product description for your affiliate lifestyle store.
          Replace this with real product data from your API or Supabase later.
        </p>

        <button className="buy-btn">
          Check Price / Buy Now
        </button>

      </div>

    </div>
  );
}