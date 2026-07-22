import { categories } from "../data/categories";
import type { CategoryNode } from "../data/categories";


export function getCategories() {
  return categories;
}


export function findCategory(
  slug: string,
  nodes: CategoryNode[] = categories
): CategoryNode | null {

  for (const node of nodes) {

    if (node.slug === slug) {
      return node;
    }


    if (node.children.length > 0) {

      const found = findCategory(
        slug,
        node.children
      );

      if (found) {
        return found;
      }

    }

  }

  return null;
}



export function getChildren(
  slug: string
) {

const category = findCategory(slug);

return category?.children || [];

}