import type { Details } from "./details";
import type { File } from "./file";
import type { Content } from "./content";
import type { ContentType } from "../../enums/content";
import type { Is } from "../../enums/is";

/**
 * 广告
 */
export interface Ad extends Partial<Details> {
  title?: string;
  type?: typeof ContentType.valueType;
  module?: string;
  description?: string;
  imageFile: File;
  contentId?: string;
  content?: Content;
  link?: string;
  order?: number;
  status?: typeof Is.valueType;
}

/**
 * 广告创建 DTO
 */
export interface AdCreateDto extends Omit<Ad, 'id' | 'createdAt' | 'updatedAt' | 'content'> {}

/**
 * 广告更新 DTO
 */
export interface AdUpdateDto extends Partial<AdCreateDto> {}
