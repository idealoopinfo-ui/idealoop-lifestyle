import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

interface Props {
  id: string;
  title: string;
  image: string;
}

export default function ProductCard({ id, title, image }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${id}`)}
    >
      {/* IMAGE CONTAINER (STEP 2 READY FOR ROTATION) */}
      <div className="image-container">
        <img src={image} alt={title} />
      </div>

      <h3>{title}</h3>
    </div>
  );
}