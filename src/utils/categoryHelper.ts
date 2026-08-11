import { supabase } from "../lib/supabase";

export type CategoryLevel =
  | "department"
  | "category"
  | "subcategory"
  | "collection"
  | "product-type";

export interface CategoryNode {
  id: number;
  name: string;
  slug: string;
  children: CategoryNode[];
  level: CategoryLevel;
}

// =========================================================
// GET COMPLETE CATEGORY TREE
// =========================================================

export async function getCategories(): Promise<CategoryNode[]> {
  try {
    const [
      { data: departments, error: departmentError },
      { data: categories, error: categoryError },
      { data: subcategories, error: subcategoryError },
      { data: collections, error: collectionError },
      { data: productTypes, error: productTypeError },
    ] = await Promise.all([
      supabase
        .from("departments")
        .select("*")
        .order("id"),

      supabase
        .from("categories")
        .select("*")
        .order("id"),

      supabase
        .from("subcategories")
        .select("*")
        .order("id"),

      supabase
        .from("collections")
        .select("*")
        .order("id"),

      supabase
        .from("product_types")
        .select("*")
        .order("id"),
    ]);

    // =====================================================
    // DEBUG
    // =====================================================

    console.log("CATEGORY DATABASE DATA:", {
      departments,
      categories,
      subcategories,
      collections,
      productTypes,
    });

    // =====================================================
    // ERROR CHECKING
    // =====================================================

    if (departmentError) {
      console.error(
        "Error loading departments:",
        departmentError
      );
    }

    if (categoryError) {
      console.error(
        "Error loading categories:",
        categoryError
      );
    }

    if (subcategoryError) {
      console.error(
        "Error loading subcategories:",
        subcategoryError
      );
    }

    if (collectionError) {
      console.error(
        "Error loading collections:",
        collectionError
      );
    }

    if (productTypeError) {
      console.error(
        "Error loading product types:",
        productTypeError
      );
    }

    if (
      departmentError ||
      categoryError ||
      subcategoryError ||
      collectionError ||
      productTypeError
    ) {
      console.error(
        "CATEGORY TREE: One or more database queries failed."
      );

      return [];
    }

    // =====================================================
    // DEPARTMENTS
    // =====================================================

    const departmentNodes: CategoryNode[] = (
      departments || []
    ).map((department) => ({
      id: Number(department.id),
      name: department.name,
      slug: department.slug,
      children: [],
      level: "department",
    }));

    // =====================================================
    // CATEGORIES
    // =====================================================

    (categories || []).forEach((category) => {
      const parentDepartment =
        departmentNodes.find(
          (department) =>
            String(department.id) ===
            String(category.department_id)
        );

      if (!parentDepartment) {
        console.warn(
          "Category parent department not found:",
          {
            category,
            department_id:
              category.department_id,
          }
        );

        return;
      }

      parentDepartment.children.push({
        id: Number(category.id),
        name: category.name,
        slug: category.slug,
        children: [],
        level: "category",
      });
    });

    // =====================================================
    // SUBCATEGORIES
    // =====================================================

    (subcategories || []).forEach(
      (subcategory) => {
        let parentCategory:
          | CategoryNode
          | null = null;

        for (const department of departmentNodes) {
          const found =
            department.children.find(
              (category) =>
                String(category.id) ===
                String(
                  subcategory.category_id
                )
            );

          if (found) {
            parentCategory = found;
            break;
          }
        }

        if (!parentCategory) {
          console.warn(
            "Subcategory parent category not found:",
            {
              subcategory,
              category_id:
                subcategory.category_id,
            }
          );

          return;
        }

        parentCategory.children.push({
          id: Number(subcategory.id),
          name: subcategory.name,
          slug: subcategory.slug,
          children: [],
          level: "subcategory",
        });
      }
    );

    // =====================================================
    // COLLECTIONS
    // =====================================================

    (collections || []).forEach(
      (collection) => {
        let parentSubcategory:
          | CategoryNode
          | null = null;

        for (const department of departmentNodes) {
          for (const category of department.children) {
            const found =
              category.children.find(
                (subcategory) =>
                  String(subcategory.id) ===
                  String(
                    collection.subcategory_id
                  )
              );

            if (found) {
              parentSubcategory = found;
              break;
            }
          }

          if (parentSubcategory) {
            break;
          }
        }

        if (!parentSubcategory) {
          console.warn(
            "Collection parent subcategory not found:",
            {
              collection,
              subcategory_id:
                collection.subcategory_id,
            }
          );

          return;
        }

        parentSubcategory.children.push({
          id: Number(collection.id),
          name: collection.name,
          slug: collection.slug,
          children: [],
          level: "collection",
        });
      }
    );

    // =====================================================
    // PRODUCT TYPES
    // =====================================================

    (productTypes || []).forEach(
      (productType) => {
        let parentCollection:
          | CategoryNode
          | null = null;

        for (const department of departmentNodes) {
          for (const category of department.children) {
            for (const subcategory of category.children) {
              const found =
                subcategory.children.find(
                  (collection) =>
                    String(collection.id) ===
                    String(
                      productType.collection_id
                    )
                );

              if (found) {
                parentCollection = found;
                break;
              }
            }

            if (parentCollection) {
              break;
            }
          }

          if (parentCollection) {
            break;
          }
        }

        if (!parentCollection) {
          console.warn(
            "Product type parent collection not found:",
            {
              productType,
              collection_id:
                productType.collection_id,
            }
          );

          return;
        }

        parentCollection.children.push({
          id: Number(productType.id),
          name: productType.name,
          slug: productType.slug,
          children: [],
          level: "product-type",
        });
      }
    );

    // =====================================================
    // FINAL TREE
    // =====================================================

    console.log(
      "FINAL CATEGORY TREE:",
      departmentNodes
    );

    return departmentNodes;
  } catch (error) {
    console.error(
      "getCategories() unexpected error:",
      error
    );

    return [];
  }
}