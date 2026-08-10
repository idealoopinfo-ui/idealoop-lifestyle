import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

import "./ProductManagement.css";

interface Props {
  onEdit: (product: any) => void;
}

export default function ProductManagement({ onEdit }: Props) {

  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  // Product currently waiting for delete confirmation
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Message shown near the product buttons
  const [deleteMessage, setDeleteMessage] = useState<{
    id: string | null;
    type: "success" | "error" | null;
    text: string;
  }>({
    id: null,
    type: null,
    text: "",
  });

  const [deleting, setDeleting] = useState(false);


  useEffect(() => {
    fetchProducts();
  }, []);


  const fetchProducts = async () => {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {

      console.log(
        "FETCH PRODUCTS ERROR:",
        error
      );

      return;
    }

    setProducts(data || []);
  };


  const handleDelete = async (id: string) => {

    if (deleting) {
      return;
    }

    setDeleting(true);

    setDeleteMessage({
      id: null,
      type: null,
      text: "",
    });


    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);


    if (error) {

      console.log(
        "DELETE ERROR:",
        error
      );

      setDeleteMessage({
        id,
        type: "error",
        text: "Failed to delete product.",
      });

      setDeleting(false);

      return;
    }


    // Remove immediately from the current list
    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== id
      )
    );


    setDeleteId(null);

    setDeleteMessage({
      id,
      type: "success",
      text: "✓ Product deleted successfully",
    });


    setDeleting(false);


    // Clear success message after 3 seconds
    setTimeout(() => {

      setDeleteMessage({
        id: null,
        type: null,
        text: "",
      });

    }, 3000);
  };


  const filteredProducts = products.filter((product) => {

    const text = search.toLowerCase();

    return (
      product.title
        ?.toLowerCase()
        .includes(text)

      ||

      product.product_id
        ?.toLowerCase()
        .includes(text)

      ||

      product.brand
        ?.toLowerCase()
        .includes(text)
    );
  });


  const startEdit = (product: any) => {

    console.log(
      "Editing:",
      product
    );

    onEdit(product);
  };


  return (

    <div className="product-management">

      <h2>
        Manage Products
      </h2>


      


      <input
        className="product-search"
        placeholder="Search product ID, title, brand..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />


      {/* PRODUCTS */}

      <div className="manage-products-list">

        {filteredProducts.map((product) => (

          <div
            className="manage-product-card"
            key={product.id}
          >

            <img
              src={
                product.image_1 ||
                "/placeholder.png"
              }
              alt={product.title}
            />


            <div className="manage-product-info">

              <h3>
                {product.title}
              </h3>

              <p>
                {product.product_id}
              </p>

              {product.brand && (
                <p>
                  {product.brand}
                </p>
              )}

            </div>


            {/* ACTIONS */}

            <div className="manage-product-actions">

              <button
                type="button"
                className="edit-product-btn"
                onClick={() =>
                  startEdit(product)
                }
              >
                Edit
              </button>


              <button
                type="button"
                className="delete-product-btn"
                onClick={() => {

                  setDeleteId(product.id);

                  setDeleteMessage({
                    id: null,
                    type: null,
                    text: "",
                  });

                }}
                disabled={deleting}
              >
                Delete
              </button>


              {/* INLINE CONFIRMATION */}

              {deleteId === product.id && (

                <div className="delete-confirmation">

                  <span>
                    Are you sure?
                  </span>


                  <button
                    type="button"
                    className="confirm-delete-btn"
                    onClick={() =>
                      handleDelete(product.id)
                    }
                    disabled={deleting}
                  >
                    {deleting
                      ? "Deleting..."
                      : "Yes, Delete"}
                  </button>


                  <button
                    type="button"
                    className="cancel-delete-btn"
                    onClick={() =>
                      setDeleteId(null)
                    }
                    disabled={deleting}
                  >
                    Cancel
                  </button>

                </div>

              )}


              {/* SUCCESS / ERROR MESSAGE */}

              {deleteMessage.id === product.id &&
                deleteMessage.type && (

                  <span
                    className={
                      deleteMessage.type === "success"
                        ? "delete-success-message"
                        : "delete-error-message"
                    }
                  >
                    {deleteMessage.text}
                  </span>

                )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
