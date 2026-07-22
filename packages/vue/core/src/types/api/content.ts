import type { Details } from "./details";
import type { File } from "./file";
import type { ContentType } from "../../enums/content";
import type { Is } from "../../enums/is";
import type { Category } from "./category";

/**
 * 内容
 */
export interface Content extends Partial<Details> {
  title: string;
  categoryId?: string;
  category?: Category;
  type?: typeof ContentType.valueType;
  module?: string;
  author?: string;
  content: string;
  link?: string;
  coverFile?: File;
  isPinned?: typeof Is.valueType;
  isDraft?: typeof Is.valueType;
  order?: number;
  status?: typeof Is.valueType;
}

/**
 * 内容创建 DTO
 */
export interface ContentCreateDto extends Omit<Content, 'id' | 'createdAt' | 'updatedAt' | 'category'> {}

/**
 * 内容更新 DTO
 */
export interface ContentUpdateDto extends Partial<ContentCreateDto> {}
