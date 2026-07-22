import type { Details } from "./details";
import type { User } from "./user";
import type { Address } from "./address";
import type { Product } from "./product";
import type { OrderStatus, PaymentMethod } from "../../enums/order";
import type { WxLoginType } from "../../enums/wx";

/**
 * 订单
 */
export interface Order extends Partial<Details> {
  userId: string;
  user?: User;
  address?: Address;
  products: { product: Product; num: number }[];
  no: string;
  amount?: number;
  points?: number;
  paidAt?: string;
  shippedAt?: string;
  completedAt?: string;
  canceledAt?: string;
  paymentMethod?: typeof PaymentMethod.valueType;
  remark?: string;
  status?: typeof OrderStatus.valueType;
  wxUserLoginType: typeof WxLoginType.valueType;
  delivererUserId?: string;
  expressCompany?: string;
  expressNo?: string;
}

/**
 * 订单创建 DTO
 */
export interface OrderCreateDto extends Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'no' | 'amount' | 'points' | 'paidAt' | 'shippedAt' | 'completedAt' | 'canceledAt' | 'status' | 'delivererUserId' | 'expressCompany' | 'expressNo'> {
  addressId?: string;
}

/**
 * 订单更新 DTO
 */
export interface OrderUpdateDto extends Partial<OrderCreateDto> {}
