import type { Details } from "./details";
import type { User } from "./user";
import type { Product } from "./product";

/**
 * 商品收藏
 */
export interface ProductFavorite extends Partial<Details> {
  userId: string;
  user?: User;
  productId: string;
  product?: Product;
}

/**
 * 商品收藏创建 DTO
 */
export interface ProductFavoriteCreateDto extends Omit<ProductFavorite, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'product'> {}

/**
 * 商品收藏更新 DTO
 */
export interface ProductFavoriteUpdateDto extends Partial<ProductFavoriteCreateDto> {}
