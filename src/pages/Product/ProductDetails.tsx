import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="product-details">
  
      {/* BACK BUTTON */}
      <button className="back-btn" onClick={goBack}>
        ← Back
      </button>
  
      {/* LEFT SIDE - IMAGES */}
      <div className="product-gallery">
  
        <div className="image-container">
          <img
            src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c"
            alt="Product"
          />
        </div>
  
        <div className="thumbnails">
          <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" />
          <img src="https://images.unsplash.com/photo-1503602642458-232111445657" />
          <img src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4" />
        </div>
  
      </div>
  
      {/* RIGHT SIDE - INFO */}
      <div className="product-info">
  
        <h2>Premium Product #{id}</h2>
  
        <p className="product-id">
          Product ID: #{id}
        </p>
  
        <ul className="desc">
          <li>High quality premium material build</li>
          <li>Modern design suitable for home & office</li>
          <li>Durable and long-lasting performance</li>
          <li>Easy to use and maintain</li>
          <li>Best value for money product</li>
        </ul>
  
        {/* TRUST BOX */}
        <div className="trust-box">
          ✔ 100% Genuine Product <br />
          ✔ Secure Checkout <br />
          ✔ Fast Delivery Available
        </div>
  
        {/* FEATURE CARDS (FILLS EMPTY SPACE) */}
        <div className="feature-grid">

  <div className="feature-card">🚚 Delivery Available</div>

  <div className="feature-card">🔒 Secure Checkout</div>

  <div className="feature-card">⭐ Verified Listings</div>

  <div className="feature-card">🔄 Easy Return Options</div>

</div>
  
        <button className="buy-btn">
          🛒 Shop Now
        </button>
  
      </div>
  
    </div>
  );
}