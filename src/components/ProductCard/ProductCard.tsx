import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

interface ProductCardProps {
  product: {
    id: string; // Supabase UUID
    product_id: string; // Custom product ID e.g. IDLLS5001
    title: string;
    image_1: string;
    affiliate_url: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {

  const navigate = useNavigate();

  const handleShopNow = () => {
    window.open(product.affiliate_url, "_blank");
  };

  const handleViewMore = () => {
    navigate(`/product/${product.product_id}`);
  };


  return (
    <div className="product-card">

      <img
        src={product.image_1}
        alt={product.title}
        className="product-image"
      />

      <h3 className="product-title">
        {product.title}
      </h3>


      <button
        className="view-more-btn"
        onClick={handleViewMore}
      >
        View More →
      </button>


      <button
        className="shop-now-btn"
        onClick={handleShopNow}
      >
        Shop Now
      </button>

    </div>
  );
}