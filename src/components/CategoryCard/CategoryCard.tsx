import { Link } from "react-router-dom";
import "./CategoryCard.css";

type Props = {
  category:any;
};

export default function CategoryCard({ category }:Props) {
  return (
    <Link to={`/category/${category.slug}`} className="category-card">
      <img src={category.image} alt={category.name} />

      <div className="overlay">
        <h3>{category.name}</h3>
        <button>Explore →</button>
      </div>
    </Link>
  );
}