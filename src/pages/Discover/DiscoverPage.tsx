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
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const navigate = useNavigate();

  const user = null; // replace with real auth later

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
    if (!user) {
      alert("Please login to like products");
      return;
    }

    // 🚫 prevent multiple clicks in UI
    if (likedIds.includes(productId)) return;

    // 🚨 check DB (real restriction)
    const { data } = await supabase
      .from("product_likes")
      .select("*")
      .eq("product_id", productId)
      .eq("user_id", user.id);

    if (data && data.length > 0) {
      setLikedIds((prev) => [...prev, productId]);
      return;
    }

    // ➕ insert like record
    const { error: insertError } = await supabase
      .from("product_likes")
      .insert({
        product_id: productId,
        user_id: user.id,
      });

    if (insertError) {
      console.error(insertError.message);
      return;
    }

    // ➕ update likes count
    const newLikes = (currentLikes || 0) + 1;

    await supabase
      .from("products")
      .update({ likes: newLikes })
      .eq("id", productId);

    // UI update
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, likes: newLikes } : p
      )
    );

    setLikedIds((prev) => [...prev, productId]);
  };

  return (
    <>
      {/* HEADER */}
      <div className="discover-header">
        <h1>Discover</h1>
        <p>Find inspiration and products you'll love</p>
      </div>

      {/* GRID */}
      <div className="pinterest-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="pin-card"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="image-wrapper">
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
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="mini-footer">
        © {new Date().getFullYear()} Idealoop
      </div>
    </>
  );
}