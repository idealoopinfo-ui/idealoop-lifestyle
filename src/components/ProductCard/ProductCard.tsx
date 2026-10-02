import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import { supabase } from "../../lib/supabase";

import "./ProductCard.css";

interface ProductCardProps {
  product: {
    product_id: string;
    title: string;
    category?: string;
    department?: string;
    main_image_url?: string;
    image?: string;
    image_1?: string;
    image_2?: string;
    image_3?: string;
    image_4?: string;
    affiliate_url?: string;
    product_url?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [liked, setLiked] = useState(false);

  // Large image viewer
  const [showImageViewer, setShowImageViewer] = useState(false);

  const productImage =
    product.image_1 ||
    product.main_image_url ||
    product.image ||
    "/placeholder.png";

  useEffect(() => {
    checkUser();
  }, [product.product_id]);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (user) {
      checkWishlist(user.id);
    }
  };

  const checkWishlist = async (userId: string) => {
    const { data, error } = await supabase
      .from("wishlist")
      .select("id")
      .eq("user_id", userId)
      .eq("product_id", product.product_id);

    if (error) {
      console.log(
        "CHECK WISHLIST ERROR DETAILS:",
        error.message,
        error.details,
        error.hint,
        error.code
      );

      return;
    }

    if (data && data.length > 0) {
      setLiked(true);
    }
  };

  const handleWishlist = async () => {
    if (!user) {
      alert("Please login to add wishlist items");
      return;
    }

    const newLiked = !liked;

    setLiked(newLiked);

    if (liked) {
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", product.product_id);

      if (error) {
        console.log("REMOVE ERROR:", error);

        setLiked(true);
        return;
      }
    } else {
      const { error } = await supabase.from("wishlist").insert({
        user_id: user.id,
        product_id: product.product_id,
        title: product.title,
        image_url: product.image_1,
      });

      if (error) {
        console.log("ADD ERROR:", error);

        setLiked(false);
        return;
      }
    }
  };

  const handleShopNow = () => {
    window.open(product.affiliate_url, "_blank");
  };

  const handleViewMore = () => {
    navigate(`/product/${product.product_id}`);
  };

  const handleImageClick = () => {
    setShowImageViewer(true);
  };

  const closeImageViewer = () => {
    setShowImageViewer(false);
  };

  useEffect(() => {
    if (!showImageViewer) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowImageViewer(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    // Prevent background page scrolling while viewer is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [showImageViewer]);

  return (
    <>
      <div className="product-card">
        <div className="product-image-wrapper">
          <img
            className="product-image"
            src={productImage}
            alt={product.title}
            loading="lazy"
            onClick={handleImageClick}
          />

          <div className="product-category-badge">
            {product.department && product.category
              ? `${product.department} ${product.category}`
              : product.category || product.department}
          </div>

          <button
            type="button"
            className={`wishlist-hover-btn ${liked ? "liked" : ""}`}
            onClick={handleWishlist}
          >
            <FaHeart />
          </button>
        </div>

        <h3 className="product-title">{product.title}</h3>

        <div className="product-actions">
          <span className="view-more-link" onClick={handleViewMore}>
            View More →
          </span>

          <button
            type="button"
            className="shop-now-btn"
            onClick={handleShopNow}
          >
            Shop Now
          </button>
        </div>
      </div>

      {showImageViewer && (
        <div
          className="product-image-viewer"
          onClick={closeImageViewer}
          role="dialog"
          aria-modal="true"
          aria-label={`Large image of ${product.title}`}
        >
          <button
            type="button"
            className="product-image-viewer-close"
            onClick={closeImageViewer}
            aria-label="Close image"
          >
            ×
          </button>

          <img
            className="product-image-viewer-large"
            src={productImage}
            alt={product.title}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}