import { useParams, useNavigate } from "react-router-dom";
import { categories } from "../../data/categories";

export default function CategoryPage() {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();

  const data = category ? categories[category] : null;

  return (
    <div className="category-page">

      <h1>
        {category} {subcategory && `→ ${subcategory}`}
      </h1>

      {/* ================= SUB CATEGORY ================= */}

      <div className="sub-nav">
        {data &&
          Object.keys(data).map((sub) => (
            <button
              key={sub}
              onClick={() =>
                navigate(`/category/${category}/${sub}`)
              }
            >
              {sub}
            </button>
          ))}
      </div>

      {/* ================= ITEMS ================= */}

      {subcategory && data?.[subcategory] && (
        <div className="sub-nav">
          {data[subcategory].length > 0 ? (
            data[subcategory].map((item: string) => (
              <button
                key={item}
                onClick={() =>
                  navigate(
                    `/category/${category}/${subcategory}/${item}`
                  )
                }
              >
                {item}
              </button>
            ))
          ) : (
            <p style={{ padding: "10px" }}>
              No items yet in this section
            </p>
          )}
        </div>
      )}

    </div>
  );
}