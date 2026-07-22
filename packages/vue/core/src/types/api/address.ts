import type { Details } from "./details";
import type { User } from "./user";
import type { Gender } from "../../enums/gender";
import type { AddressTag } from "../../enums/address";
import type { Is } from "../../enums/is";

/**
 * 地址
 */
export interface Address extends Partial<Details> {
  userId: string;
  user?: User;
  name: string;
  gender: typeof Gender.valueType;
  phoneNumber: string;
  location: any;
  room?: string;
  tag?: typeof AddressTag.valueType;
  isDefault?: typeof Is.valueType;
}

/**
 * 地址创建 DTO
 */
export interface AddressCreateDto extends Omit<Address, 'id' | 'createdAt' | 'updatedAt' | 'user'> {}

/**
 * 地址更新 DTO
 */
export interface AddressUpdateDto extends Partial<AddressCreateDto> {}
