import { useState } from "react";
import { supabase } from "../../../lib/supabase";

import "./PromotionCenter.css";

type Product = {
  product_id: string;
  title: string;
  description?: string | null;
  short_description?: string | null;
  image_1?: string | null;
  image_2?: string | null;
  image_3?: string | null;
  image_4?: string | null;
  image_5?: string | null;
  affiliate_url?: string | null;
  shop_name?: string | null;
  marketplace?: string | null;
};

export default function PromotionCenter() {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [facebookCaption, setFacebookCaption] =
    useState("");

  const [facebookHashtags, setFacebookHashtags] =
    useState(
      "#IdealoopLifestyle #Deals #Shopping"
    );

  const [pinterestTitle, setPinterestTitle] =
    useState("");

  const [pinterestDescription, setPinterestDescription] =
    useState("");

  const findProduct = async () => {
    if (!productId.trim()) {
      setError("Enter a Product ID.");
      return;
    }

    setLoading(true);
    setError("");
    setProduct(null);

    const { data, error } = await supabase
      .from("products")
      .select(`
        product_id,
        title,
        description,
        short_description,
        image_1,
        image_2,
        image_3,
        image_4,
        image_5,
        affiliate_url,
        shop_name,
        marketplace
      `)
      .eq("product_id", productId.trim())
      .maybeSingle();

    setLoading(false);

    if (error) {
      console.error(
        "PROMOTION PRODUCT ERROR:",
        error
      );

      setError(
        "Unable to find the product."
      );

      return;
    }

    if (!data) {
      setError(
        `Product "${productId}" was not found.`
      );

      return;
    }

    setProduct(data);

    /*
     * Generate default Facebook content.
     */
    setFacebookCaption(
      `🔥 Check out this great find!\n\n${data.title}\n\n✨ Discover more lifestyle products at Idealoop Lifestyle.\n\n👉 Shop now:\n${data.affiliate_url || ""}`
    );

    /*
     * Generate default Pinterest content.
     */
    setPinterestTitle(
      data.title
    );

    setPinterestDescription(
      `${data.title}\n\nDiscover this product and more lifestyle finds from Idealoop Lifestyle.\n\nShop now: ${
        data.affiliate_url || ""
      }`
    );
  };

  const copyText = async (
    text: string,
    message: string
  ) => {
    try {
      await navigator.clipboard.writeText(text);

      alert(message);
    } catch (error) {
      console.error(
        "COPY ERROR:",
        error
      );

      alert(
        "Unable to copy. Please copy the text manually."
      );
    }
  };

  const shareFacebook = () => {
    if (!product?.affiliate_url) {
      alert(
        "This product does not have an affiliate link."
      );

      return;
    }

    const facebookUrl =
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        product.affiliate_url
      )}`;

    window.open(
      facebookUrl,
      "_blank",
      "width=700,height=600"
    );
  };

  const sharePinterest = () => {
    if (!product?.affiliate_url) {
      alert(
        "This product does not have an affiliate link."
      );

      return;
    }

    if (!product.image_1) {
      alert(
        "This product does not have an image."
      );

      return;
    }

    const pinterestUrl =
      `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
        product.affiliate_url
      )}&media=${encodeURIComponent(
        product.image_1
      )}&description=${encodeURIComponent(
        pinterestDescription
      )}`;

    window.open(
      pinterestUrl,
      "_blank",
      "width=700,height=700"
    );
  };

  const clearProduct = () => {
    setProduct(null);
    setProductId("");
    setFacebookCaption("");
    setFacebookHashtags(
      "#IdealoopLifestyle #Deals #Shopping"
    );
    setPinterestTitle("");
    setPinterestDescription("");
    setError("");
  };

  return (
    <div className="promotion-center">

      {/* HEADER */}

      <div className="promotion-header">

        <span className="promotion-eyebrow">
          Social Marketing
        </span>

        <h1>
          Promotion Center
        </h1>

        <p>
          Find a product and prepare it for
          Facebook and Pinterest.
        </p>

      </div>

      {/* PRODUCT SEARCH */}

      <div className="promotion-search">

        <div className="promotion-search-input">

          <label>
            Product ID
          </label>

          <input
            type="text"
            value={productId}
            placeholder="Example: BEA-001"
            onChange={(e) =>
              setProductId(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                findProduct();
              }
            }}
          />

        </div>

        <button
          type="button"
          onClick={findProduct}
          disabled={loading}
          className="promotion-find-button"
        >
          {loading
            ? "Finding..."
            : "Find Product"}
        </button>

        {product && (
          <button
            type="button"
            onClick={clearProduct}
            className="promotion-clear-button"
          >
            Clear
          </button>
        )}

      </div>

      {error && (
        <div className="promotion-error">
          {error}
        </div>
      )}

      {/* PRODUCT */}

      {product && (

        <div className="promotion-workspace">

          {/* PRODUCT PREVIEW */}

          <div className="promotion-product-card">

            <div className="promotion-image">

              {product.image_1 ? (
                <img
                  src={product.image_1}
                  alt={product.title}
                />
              ) : (
                <div className="promotion-no-image">
                  No Image
                </div>
              )}

            </div>

            <div className="promotion-product-info">

              <span className="promotion-product-id">
                {product.product_id}
              </span>

              <h2>
                {product.title}
              </h2>

              {product.shop_name && (
                <p>
                  Shop: {product.shop_name}
                </p>
              )}

              {product.marketplace && (
                <p>
                  Marketplace:{" "}
                  {product.marketplace}
                </p>
              )}

              <div className="promotion-link">

                <strong>
                  Affiliate Link
                </strong>

                <input
                  type="text"
                  readOnly
                  value={
                    product.affiliate_url || ""
                  }
                />

              </div>

            </div>

          </div>

          {/* SOCIAL TOOLS */}

          <div className="promotion-platforms">

            {/* FACEBOOK */}

            <div className="promotion-platform">

              <div className="promotion-platform-header">

                <div>
                  <span className="platform-label">
                    FACEBOOK
                  </span>

                  <h2>
                    Facebook Post
                  </h2>
                </div>

              </div>

              <label>
                Caption
              </label>

              <textarea
                value={facebookCaption}
                onChange={(e) =>
                  setFacebookCaption(
                    e.target.value
                  )
                }
                rows={9}
              />

              <label>
                Hashtags
              </label>

              <input
                type="text"
                value={facebookHashtags}
                onChange={(e) =>
                  setFacebookHashtags(
                    e.target.value
                  )
                }
              />

              <div className="promotion-actions">

                <button
                  type="button"
                  onClick={() =>
                    copyText(
                      `${facebookCaption}\n\n${facebookHashtags}`,
                      "Facebook post copied."
                    )
                  }
                >
                  Copy Caption
                </button>

                <button
                  type="button"
                  onClick={shareFacebook}
                  className="promotion-primary"
                >
                  Share on Facebook
                </button>

              </div>

            </div>

            {/* PINTEREST */}

            <div className="promotion-platform">

              <div className="promotion-platform-header">

                <div>
                  <span className="platform-label">
                    PINTEREST
                  </span>

                  <h2>
                    Pinterest Pin
                  </h2>
                </div>

              </div>

              <label>
                Pin Title
              </label>

              <input
                type="text"
                value={pinterestTitle}
                onChange={(e) =>
                  setPinterestTitle(
                    e.target.value
                  )
                }
              />

              <label>
                Description
              </label>

              <textarea
                value={
                  pinterestDescription
                }
                onChange={(e) =>
                  setPinterestDescription(
                    e.target.value
                  )
                }
                rows={9}
              />

              <div className="promotion-actions">

                <button
                  type="button"
                  onClick={() =>
                    copyText(
                      `${pinterestTitle}\n\n${pinterestDescription}`,
                      "Pinterest content copied."
                    )
                  }
                >
                  Copy Details
                </button>

                <button
                  type="button"
                  onClick={
                    sharePinterest
                  }
                  className="promotion-primary"
                >
                  Share on Pinterest
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}