import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import "./ProductCard.css";

interface Props {
  id: string;
  title: string;
  image: string;
  likes?: number;
}

export default function ProductCard({ id, title, image, likes = 0 }: Props) {
  const navigate = useNavigate();

  const [likeCount, setLikeCount] = useState(likes);
  const [loading, setLoading] = useState(false);

  const handleLike = async (e: any) => {
    e.stopPropagation();

    if (loading) return;
    setLoading(true);

    const newLikes = likeCount + 1;

    const { error } = await supabase
      .from("products")
      .update({ likes: newLikes })
      .eq("id", id);

    if (!error) {
      setLikeCount(newLikes);
    }

    setLoading(false);
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${id}`)}
    >
      {/* LIKE BUTTON */}
      <button className="like-btn" onClick={handleLike}>
        ❤️ {likeCount}
      </button>

      {/* IMAGE */}
      <div className="img-wrapper">
        <img src={image} alt={title} />
      </div>

      {/* TITLE */}
      <h3 className="title">{title}</h3>

      {/* HOVER OVERLAY */}
      <div className="overlay">
        <p>View Details</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${id}`);
          }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}