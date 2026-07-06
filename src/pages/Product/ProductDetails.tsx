import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("Error loading product:", error);
      return;
    }

    if (data) {
      setProduct(data);
      setMainImage(data.main_image_url);
    }
  };

  if (!product) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  const images = [
    product.main_image_url,
    product.image_1,
    product.image_2,
    product.image_3,
    product.image_4,
  ].filter(Boolean);

  return (
    <div className="product-details">

      {/* LEFT - IMAGES */}
      <div className="left">
        <img
          className="main-img"
          src={mainImage}
          alt={product.title}
        />

        <div className="thumbs">
          {images.map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              onClick={() => setMainImage(img)}
              className={img === mainImage ? "active" : ""}
              alt="thumb"
            />
          ))}
        </div>
      </div>

      {/* RIGHT - INFO */}
      <div className="right">
        <h1>{product.title}</h1>

        <p className="desc">{product.description}</p>

        <h3>{product.shop_name}</h3>

        <div className="actions">
          <a href={product.product_url} target="_blank" rel="noreferrer">
            <button className="shop">Shop Now</button>
          </a>

          <button className="like">♡ Like</button>
        </div>
      </div>

    </div>
  );
}