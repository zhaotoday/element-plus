import type { Details } from "./details";
import type { UploadTo } from "../../enums/upload";
import type { Is } from "../../enums/is";

/**
 * 文件
 */
export interface File extends Partial<Details> {
  name: string;
  type: string;
  size: number;
  dir?: string;
  date: string;
  ext: string;
  uploadTo?: typeof UploadTo.valueType;
  isUploaded?: typeof Is.valueType;
  url?: string;
}

/**
 * 文件创建 DTO
 */
export interface FileCreateDto extends Omit<File, 'id' | 'createdAt' | 'updatedAt'> {}

/**
 * 文件更新 DTO
 */
export interface FileUpdateDto extends Partial<FileCreateDto> {}
