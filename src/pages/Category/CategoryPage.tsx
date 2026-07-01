import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { slug } = useParams();

  return (
    <div className="page-wrapper">

      {!slug ? (
        <div className="not-found">
          Category not found
        </div>
      ) : (
        <div className="category-page">
          <h2>Category: {slug}</h2>
        </div>
      )}

    </div>
  );
}