import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import "./Admin.css";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [shopName, setShopName] = useState("");

  const [departments, setDepartments] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);

  const [departmentId, setDepartmentId] = useState<number | "">("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [subcategoryId, setSubcategoryId] = useState<number | "">("");

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchInitialData();
    fetchProducts();
  }, []);

  const fetchInitialData = async () => {
    const { data: d } = await supabase.from("departments").select("*");
    const { data: c } = await supabase.from("categories").select("*");
    const { data: s } = await supabase.from("subcategories").select("*");

    setDepartments(d || []);
    setCategories(c || []);
    setSubcategories(s || []);
  };

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    setProducts(data || []);
  };

  // cascading filters
  const filteredCategories = categories.filter(
    (c) => c.department_id === Number(departmentId)
  );

  const filteredSubcategories = subcategories.filter(
    (s) => s.category_id === Number(categoryId)
  );

  // reset logic
  useEffect(() => {
    setCategoryId("");
    setSubcategoryId("");
  }, [departmentId]);

  useEffect(() => {
    setSubcategoryId("");
  }, [categoryId]);

  const addProduct = async () => {
    const { error } = await supabase.from("products").insert([
      {
        title,
        description,
        short_description: shortDescription,
        main_image_url: mainImage,
        image_1: image1,
        image_2: image2,
        image_3: image3,
        image_4: image4,
        product_url: productUrl,
        shop_name: shopName,
        department_id: departmentId || null,
        category_id: categoryId || null,
        subcategory_id: subcategoryId || null,
      },
    ]);

    if (!error) {
      setTitle("");
      setDescription("");
      setShortDescription("");
      setMainImage("");
      setImage1("");
      setImage2("");
      setImage3("");
      setImage4("");
      setProductUrl("");
      setShopName("");
      setDepartmentId("");
      setCategoryId("");
      setSubcategoryId("");
      fetchProducts();
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Panel</h2>

      <div className="admin-form">

        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Short Description"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
        />

        <input
          placeholder="Main Image URL"
          value={mainImage}
          onChange={(e) => setMainImage(e.target.value)}
        />

        <input placeholder="Image 1 URL" value={image1} onChange={(e) => setImage1(e.target.value)} />
        <input placeholder="Image 2 URL" value={image2} onChange={(e) => setImage2(e.target.value)} />
        <input placeholder="Image 3 URL" value={image3} onChange={(e) => setImage3(e.target.value)} />
        <input placeholder="Image 4 URL" value={image4} onChange={(e) => setImage4(e.target.value)} />

        <input
          placeholder="Product URL"
          value={productUrl}
          onChange={(e) => setProductUrl(e.target.value)}
        />

        <input
          placeholder="Shop Name"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />

        {/* Department */}
        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(Number(e.target.value))}
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Category */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          disabled={!departmentId}
        >
          <option value="">Select Category</option>
          {filteredCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Subcategory */}
        <select
          value={subcategoryId}
          onChange={(e) => setSubcategoryId(Number(e.target.value))}
          disabled={!categoryId}
        >
          <option value="">Select Subcategory</option>
          {filteredSubcategories.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <button className="add-btn" onClick={addProduct}>
          Add Product
        </button>
      </div>

      <div className="product-list">
        {products.map((p) => (
          <div key={p.id} className="product-item">
            {p.title}
          </div>
        ))}
      </div>
    </div>
  );
}