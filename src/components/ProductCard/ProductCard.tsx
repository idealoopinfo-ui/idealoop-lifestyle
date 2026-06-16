import './productCard.css';

type Product = {
  title: string;
  price: string;
  image: string;
  category: string;
};

export default function ProductCard({
  title,
  price,
  image,
  category,
}: Product) {
  return (
    <div className="product-card">
      <div className="image-wrapper">
        <span className="tag">{category}</span>
        <span className="wishlist">♡</span>
        <img src={image} alt={title} />
      </div>

      <div className="content">
        <h3>{title}</h3>
        <p className="price">{price}</p>

        <button>Shop Now</button>
      </div>
    </div>
  );
}
