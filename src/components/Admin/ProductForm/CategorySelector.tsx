import { useEffect, useState } from "react";

import {
  categories,
  type CategoryNode,
} from "../../../data/categories";

interface Props {
  department: string;
  setDepartment: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  subcategory: string;
  setSubcategory: (value: string) => void;

  collection: string;
  setCollection: React.Dispatch<React.SetStateAction<string>>;

  productType: string;
  setProductType: (value: string) => void;
}

export default function CategorySelector({
  department,
  setDepartment,
  category,
  setCategory,
  subcategory,
  setSubcategory,
  collection,
  setCollection,
  productType,
  setProductType,
}: Props) {
  const [selectedDepartment, setSelectedDepartment] =
    useState<CategoryNode | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryNode | null>(null);

  const [selectedSubcategory, setSelectedSubcategory] =
    useState<CategoryNode | null>(null);

  const [selectedCollection, setSelectedCollection] =
    useState<CategoryNode | null>(null);

  // =========================================
  // DEPARTMENT
  // =========================================

  useEffect(() => {
    const found = categories.find(
      (item) => item.slug === department
    );

    setSelectedDepartment(found ?? null);
  }, [department]);

  // =========================================
  // CATEGORY
  // =========================================

  useEffect(() => {
    const found =
      selectedDepartment?.children.find(
        (item) => item.slug === category
      ) ?? null;

    setSelectedCategory(found);
  }, [category, selectedDepartment]);

  // =========================================
  // SUBCATEGORY
  // =========================================

  useEffect(() => {
    const found =
      selectedCategory?.children.find(
        (item) => item.slug === subcategory
      ) ?? null;

    setSelectedSubcategory(found);
  }, [subcategory, selectedCategory]);

  // =========================================
  // COLLECTION
  // =========================================

  useEffect(() => {
    const found =
      selectedSubcategory?.children.find(
        (item) => item.slug === collection
      ) ?? null;

    setSelectedCollection(found);
  }, [collection, selectedSubcategory]);

  // =========================================
  // DEPARTMENT CHANGE
  // =========================================

  const handleDepartmentChange = (
    value: string
  ) => {
    setDepartment(value);

    setCategory("");
    setSubcategory("");
    setCollection("");
    setProductType("");
  };

  // =========================================
  // CATEGORY CHANGE
  // =========================================

  const handleCategoryChange = (
    value: string
  ) => {
    setCategory(value);

    setSubcategory("");
    setCollection("");
    setProductType("");
  };

  // =========================================
  // SUBCATEGORY CHANGE
  // =========================================

  const handleSubcategoryChange = (
    value: string
  ) => {
    setSubcategory(value);

    setCollection("");
    setProductType("");
  };

  // =========================================
  // COLLECTION CHANGE
  // =========================================

  const handleCollectionChange = (
    value: string
  ) => {
    setCollection(value);

    setProductType("");
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="category-selector">

      {/* =====================================
          DEPARTMENT
      ====================================== */}

      <div className="category-field">
        <label>Department</label>

        <select
          value={department}
          onChange={(e) =>
            handleDepartmentChange(
              e.target.value
            )
          }
        >
          <option value="">
            Select Department
          </option>

          {categories.map((item) => (
            <option
              key={item.slug}
              value={item.slug}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* =====================================
          CATEGORY
      ====================================== */}

      {selectedDepartment &&
        selectedDepartment.children.length > 0 && (
          <div className="category-field">
            <label>Category</label>

            <select
              value={category}
              onChange={(e) =>
                handleCategoryChange(
                  e.target.value
                )
              }
            >
              <option value="">
                Select Category
              </option>

              {selectedDepartment.children.map(
                (item) => (
                  <option
                    key={item.slug}
                    value={item.slug}
                  >
                    {item.name}
                  </option>
                )
              )}
            </select>
          </div>
        )}

      {/* =====================================
          SUBCATEGORY
      ====================================== */}

      {selectedCategory &&
        selectedCategory.children.length > 0 && (
          <div className="category-field">
            <label>Subcategory</label>

            <select
              value={subcategory}
              onChange={(e) =>
                handleSubcategoryChange(
                  e.target.value
                )
              }
            >
              <option value="">
                Select Subcategory
              </option>

              {selectedCategory.children.map(
                (item) => (
                  <option
                    key={item.slug}
                    value={item.slug}
                  >
                    {item.name}
                  </option>
                )
              )}
            </select>
          </div>
        )}

      {/* =====================================
          COLLECTION
      ====================================== */}

      {selectedSubcategory &&
        selectedSubcategory.children.length > 0 && (
          <div className="category-field">
            <label>Collection</label>

            <select
              value={collection}
              onChange={(e) =>
                handleCollectionChange(
                  e.target.value
                )
              }
            >
              <option value="">
                Select Collection
              </option>

              {selectedSubcategory.children.map(
                (item) => (
                  <option
                    key={item.slug}
                    value={item.slug}
                  >
                    {item.name}
                  </option>
                )
              )}
            </select>
          </div>
        )}

      {/* =====================================
          PRODUCT TYPE
      ====================================== */}

      {selectedCollection &&
        selectedCollection.children.length > 0 && (
          <div className="category-field">
            <label>Product Type</label>

            <select
              value={productType}
              onChange={(e) =>
                setProductType(
                  e.target.value
                )
              }
            >
              <option value="">
                Select Product Type
              </option>

              {selectedCollection.children.map(
                (item) => (
                  <option
                    key={item.slug}
                    value={item.slug}
                  >
                    {item.name}
                  </option>
                )
              )}
            </select>
          </div>
        )}

    </div>
  );
}