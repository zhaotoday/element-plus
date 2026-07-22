import type { Details } from "./details";
import type { File } from "./file";
import type { Is } from "../../enums/is";

/**
 * 分类
 */
export interface Category extends Partial<Details> {
  parentId?: string;
  parent?: Category;
  name: string;
  code?: string;
  module?: string;
  imageFile?: File;
  description?: string;
  order?: number;
  status?: typeof Is.valueType;
}

/**
 * 分类创建 DTO
 */
export interface CategoryCreateDto extends Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'parent'> {}

/**
 * 分类更新 DTO
 */
export interface CategoryUpdateDto extends Partial<CategoryCreateDto> {}
