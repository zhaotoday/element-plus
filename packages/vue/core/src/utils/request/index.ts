/**
 * @fileoverview HTTP 请求模块
 * @module request
 */

// 核心函数
export { createAxiosInstance } from "./instance";

// 工具函数
export { showError } from "./utils";

// 类型
export type {
  ProgressController,
  MessageHandler,
  ExtendedRequestConfig,
  AxiosInstanceOptions,
  Query,
  WhereCondition,
} from "./types";

// 常量
export {
  DEFAULT_TIMEOUT,
  DEFAULT_ERROR_MESSAGE,
  UNAUTHORIZED_THROTTLE_MS,
  SEQUELIZE_PARAMS,
  DEFAULT_PROGRESS_CONTROLLER,
} from "./constants";
