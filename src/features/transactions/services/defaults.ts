import { saveCategoryService } from "../../categories/service/saveCategory";

export async function ensureDefaultCategory(
  user: any,
  categoryName: string,
  icon: string
): Promise<string> {
  const id = await saveCategoryService(
    user,
    categoryName,
    icon,
    `Auto-created category for ${categoryName.toLowerCase()}`
  );

  return id;
}
