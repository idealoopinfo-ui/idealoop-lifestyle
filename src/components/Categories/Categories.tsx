import './Categories.css';
import { Link } from 'react-router-dom';

export default function Categories() {
  return (
    <section className="categories">

      <Link to="/category/home" className="category-box">
        <h2>Home</h2>
        <div className="image-grid">
          <img src="https://images.unsplash.com/photo-1505691938895-1758d7feb511" />
          <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7" />
          <img src="https://images.unsplash.com/photo-1505691723518-36a5ac3b2c0a" />
          <img src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6" />
        </div>
      </Link>

      <Link to="/category/clothing" className="category-box">
        <h2>Clothing</h2>
        <div className="image-grid">
          <img src="https://images.unsplash.com/photo-1521335629791-ce4aec67dd47" />
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b" />
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d" />
          <img src="https://images.unsplash.com/photo-1520975916090-3105956dac38" />
        </div>
      </Link>

      <Link to="/category/beauty" className="category-box">
        <h2>Beauty</h2>
        <div className="image-grid">
          <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9" />
          <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348" />
          <img src="https://images.unsplash.com/photo-1526045478516-99145907023c" />
          <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702" />
        </div>
      </Link>

    </section>
  );
}