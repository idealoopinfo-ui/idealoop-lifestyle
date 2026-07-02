import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./DiscoverPage.css";

interface Product {
  id: number;
  main_image_url: string;
  likes?: number;
}

export default function DiscoverPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, main_image_url, likes");

      if (error) {
        console.error(error.message);
        return;
      }

      setProducts(data || []);
    };

    fetchProducts();
  }, []);

  const handleLike = async (productId: number, currentLikes: number) => {
    const newLikes = (currentLikes || 0) + 1;

    const { error } = await supabase
      .from("products")
      .update({ likes: newLikes })
      .eq("id", productId);

    if (error) {
      console.error(error.message);
      return;
    }

    // update UI instantly
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, likes: newLikes } : p
      )
    );
  };

  return (
    <div className="discover-page">

      {/* HEADER */}
      <div className="discover-header">
        <h1>Discover</h1>
        <p>Find inspiration and products you'll love</p>
      </div>

      {/* PINTEREST GRID */}
      <div className="pinterest-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="pin-card"
            onClick={() => navigate(`/product/${product.id}`)}
          >

            {/* IMAGE */}
            <img
              src={product.main_image_url}
              alt=""
              loading="lazy"
            />

            {/* LIKE BUTTON */}
            <div
              className="like-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleLike(product.id, product.likes || 0);
              }}
            >
              ❤️ {product.likes || 0}
            </div>

          </div>
        ))}
      </div>

      {/* MINIMAL FOOTER */}
      <div className="mini-footer">
        © {new Date().getFullYear()} Idealoop
      </div>

    </div>
  );
}