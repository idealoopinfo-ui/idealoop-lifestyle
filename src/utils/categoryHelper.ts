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

export async function getCategories(): Promise<CategoryNode[]> {
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

  console.log("CATEGORY DATA:", {
    departments,
    categories,
    subcategories,
    collections,
    productTypes,
  });

  /*
  ==========================================
  ERROR CHECKING
  ==========================================
  */

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
    return [];
  }

  /*
  ==========================================
  LEVEL 1
  DEPARTMENT
  ==========================================
  */

  const departmentNodes: CategoryNode[] = (
    departments || []
  ).map((department) => ({
    id: department.id,
    name: department.name,
    slug: department.slug,
    children: [],
    level: "department",
  }));

  /*
  ==========================================
  LEVEL 2
  CATEGORY
  ==========================================
  */

  (categories || []).forEach((category) => {
    const parentDepartment = departmentNodes.find(
      (department) =>
        department.id === category.department_id
    );

    if (!parentDepartment) {
      console.warn(
        "Category parent department not found:",
        category
      );

      return;
    }

    parentDepartment.children.push({
      id: category.id,
      name: category.name,
      slug: category.slug,
      children: [],
      level: "category",
    });
  });

  /*
  ==========================================
  LEVEL 3
  SUBCATEGORY
  ==========================================
  */

  (subcategories || []).forEach((subcategory) => {
    let parentCategory: CategoryNode | null = null;

    for (const department of departmentNodes) {
      const found = department.children.find(
        (category) =>
          category.id === subcategory.category_id
      );

      if (found) {
        parentCategory = found;
        break;
      }
    }

    if (!parentCategory) {
      console.warn(
        "Subcategory parent not found:",
        subcategory
      );

      return;
    }

    parentCategory.children.push({
      id: subcategory.id,
      name: subcategory.name,
      slug: subcategory.slug,
      children: [],
      level: "subcategory",
    });
  });

  /*
  ==========================================
  LEVEL 4
  COLLECTION
  ==========================================
  */

  (collections || []).forEach((collection) => {
    let parentSubcategory: CategoryNode | null = null;

    for (const department of departmentNodes) {
      for (const category of department.children) {
        const found = category.children.find(
          (subcategory) =>
            subcategory.id === collection.subcategory_id
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
        collection
      );

      return;
    }

    parentSubcategory.children.push({
      id: collection.id,
      name: collection.name,
      slug: collection.slug,
      children: [],
      level: "collection",
    });
  });

  /*
  ==========================================
  LEVEL 5
  PRODUCT TYPE
  ==========================================
  */

  (productTypes || []).forEach((productType) => {
    let parentCollection: CategoryNode | null = null;

    for (const department of departmentNodes) {
      for (const category of department.children) {
        for (const subcategory of category.children) {
          const found = subcategory.children.find(
            (collection) =>
              collection.id === productType.collection_id
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
        productType
      );

      return;
    }

    parentCollection.children.push({
      id: productType.id,
      name: productType.name,
      slug: productType.slug,
      children: [],
      level: "product-type",
    });
  });

  /*
  ==========================================
  FINAL TREE
  ==========================================
  */

  console.log(
    "FINAL CATEGORY TREE:",
    departmentNodes
  );

  return departmentNodes;
}