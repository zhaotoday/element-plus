import type { Details } from "./details";
import type { File } from "./file";
import type { Category } from "./category";
import type { Is } from "../../enums/is";

/**
 * 规格值
 */
export interface SpecValue extends Partial<Details> {
  nameId: string;
  name?: SpecName;
  value: string;
  imageFile?: File;
  order?: number;
}

/**
 * 规格值创建 DTO
 */
export interface SpecValueCreateDto extends Omit<SpecValue, 'id' | 'createdAt' | 'updatedAt' | 'name'> {}

/**
 * 规格值更新 DTO
 */
export interface SpecValueUpdateDto extends Partial<SpecValueCreateDto> {}

/**
 * 规格名称
 */
export interface SpecName extends Partial<Details> {
  name: string;
  description?: string;
  values: SpecValue[];
  order?: number;
}

/**
 * 规格名称创建 DTO
 */
export interface SpecNameCreateDto extends Omit<SpecName, 'id' | 'createdAt' | 'updatedAt' | 'values'> {
  values?: SpecValueCreateDto[];
}

/**
 * 规格名称更新 DTO
 */
export interface SpecNameUpdateDto extends Partial<SpecNameCreateDto> {}

/**
 * SKU
 */
export interface Sku extends Partial<Details> {
  productId: string;
  product?: Product;
  code: string;
  name: string;
  attributes: Array<{ name: string; value: string }>;
  price?: number;
  points?: number;
  originalPrice?: number;
  costPrice?: number;
  stock?: number;
  stockWarning?: number;
  salesVolume?: number;
  coverFile?: File;
  imageFiles?: File[];
  weight?: number;
  volume?: number;
  barcode?: string;
  order?: number;
  status?: typeof Is.valueType;
}

/**
 * SKU 创建 DTO
 */
export interface SkuCreateDto extends Omit<Sku, 'id' | 'createdAt' | 'updatedAt' | 'product'> {}

/**
 * SKU 更新 DTO
 */
export interface SkuUpdateDto extends Partial<SkuCreateDto> {}

/**
 * 商品
 */
export interface Product extends Partial<Details> {
  code?: string;
  name: string;
  categoryId?: string;
  category?: Category;
  brand?: string;
  description?: string;
  content: string;
  coverFile?: File;
  imageFiles?: File[];
  isNew?: typeof Is.valueType;
  isRecommended?: typeof Is.valueType;
  salesVolume?: number;
  order?: number;
  status?: typeof Is.valueType;
  skus: Sku[];
  totalStock?: number;
}

/**
 * 商品创建 DTO
 */
export interface ProductCreateDto extends Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'category' | 'skus' | 'salesVolume' | 'totalStock'> {
  skus?: SkuCreateDto[];
}

/**
 * 商品更新 DTO
 */
export interface ProductUpdateDto extends Partial<ProductCreateDto> {}
