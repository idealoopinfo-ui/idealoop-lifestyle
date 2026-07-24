import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import "./SpotlightSection.css";

export default function SpotlightSection() {

  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchSpotlightProducts();
  }, []);

  const fetchSpotlightProducts = async () => {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("spotlight", true);

    if (error) {
      console.log(error);
      return;
    }

    if (!data) return;

    // Randomize products
    const shuffled = [...data].sort(() => Math.random() - 0.5);

    // Keep only first 3
    setProducts(shuffled.slice(0, 3));
  };

  useEffect(() => {
    if (products.length === 0) return;
  
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);
  
    return () => clearInterval(timer);
  }, [products]);

  return (

    <section className="spotlight-section">
  
      {products.length > 0 && (
  
        <div
          className="spotlight-slider"
          onClick={() =>
            navigate(`/product/${products[currentIndex].product_id}`)
          }
        >
  
          <div
            className="spotlight-bg"
            style={{
              backgroundImage: `url(${products[currentIndex].image_1})`,
            }}
          />
  
          <img
            className="spotlight-image"
            src={products[currentIndex].image_1}
            alt={products[currentIndex].title}
          />

<div className="spotlight-content">

<p className="spotlight-category">
{products[currentIndex].category || "Lifestyle"}
</p>


<h2>
{products[currentIndex].title}
</h2>


<button
type="button"
onClick={() =>
navigate(`/product/${products[currentIndex].product_id}`)
}
>
View Product →
</button>

</div>
  
        </div>
  
      )}
  
      <div className="spotlight-dots">
  
        {products.map((_, index) => (
  
          <button
            key={index}
            type="button"
            className={
              currentIndex === index
                ? "dot active"
                : "dot"
            }
            onClick={() => setCurrentIndex(index)}
          />
  
        ))}
  
      </div>
  
    </section>
  
  );
          }