import ProductCard from '../ProductCard/ProductCard';
import './ProductPreview.css';

const products = [
  {
    title: 'Minimal Desk Lamp',
    price: '$29.99',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
    category: 'Home',
  },
  {
    title: 'Soft Cotton Shirt',
    price: '$19.99',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    category: 'Clothing',
  },
  {
    title: 'Glow Skincare Kit',
    price: '$39.99',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571',
    category: 'Beauty',
  },
];

export default function ProductPreview() {
  return (
    <section className="product-section">
      <h2>Trending Now</h2>
      <p>Handpicked products for your lifestyle</p>

      <div className="product-row">
        {products.map((item, index) => (
          <ProductCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
