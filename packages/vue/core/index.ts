// Composables
export { useCaptcha } from "./src/composables/useCaptcha";
export {
  createManagerStoreSetup,
  type ManagerLoginParams,
  type ManagerLoginResponse,
  type ManagerRefreshTokenResponse,
  type UseManagerStoreOptions,
} from "./src/composables/useManagerStore";
export {
  createUserStoreSetup,
  type UserLoginResponse,
  type UserRefreshTokenResponse,
  type UseUserStoreOptions,
} from "./src/composables/useUserStore";
export {
  createUserStore,
  type CreateUserStoreOptions,
} from "./src/composables/createUserStore";
export {
  useUpload,
  type UseUploadOptions,
  type UploadFileOptions,
} from "./src/composables/useUpload";
export { useList, type UseListOptions } from "./src/composables/useList";
export {
  configureList,
  getListDefaults,
  type ListDefaults,
} from "./src/composables/listConfig";
// useValidators omitted from barrel — Zod v4's `function process()` collides
// with Nitro's SSR preamble. Use '@vuejs-repo/core/composables/useValidators'.
export type {
  Rule,
  Rules,
  ValidateError,
} from "./src/composables/useValidators";

// Enums
export { AddressTag } from "./src/enums/address";
export { ContentType } from "./src/enums/content";
export { Gender } from "./src/enums/gender";
export { Is } from "./src/enums/is";
export { OrderStatus, PaymentMethod, OrderAction } from "./src/enums/order";
export { UploadTo } from "./src/enums/upload";
export { WxLoginType } from "./src/enums/wx";

// Types
export type { Item } from "./src/types/item";
export type * from "./src/types/api/ad";
export type * from "./src/types/api/address";
export type * from "./src/types/api/category";
export type * from "./src/types/api/content";
export type * from "./src/types/api/details";
export type * from "./src/types/api/file";
export type * from "./src/types/api/list";
export type * from "./src/types/api/manager";
export type * from "./src/types/api/order";
export type * from "./src/types/api/product";
export type * from "./src/types/api/productFavorite";
export type * from "./src/types/api/productPurchase";
export type * from "./src/types/api/request";
export type * from "./src/types/api/user";
export * as Api from "./src/types/api";
