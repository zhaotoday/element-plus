import type { Details } from "./details";
import type { User } from "./user";
import type { Product } from "./product";

/**
 * 商品购买记录
 */
export interface ProductPurchase extends Partial<Details> {
  userId: string;
  user?: User;
  productId: string;
  product?: Product;
}

/**
 * 商品购买记录创建 DTO
 */
export interface ProductPurchaseCreateDto extends Omit<ProductPurchase, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'product'> {}

/**
 * 商品购买记录更新 DTO
 */
export interface ProductPurchaseUpdateDto extends Partial<ProductPurchaseCreateDto> {}
