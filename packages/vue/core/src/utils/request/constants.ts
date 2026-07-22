/**
 * @fileoverview HTTP 请求相关常量
 * @module request/constants
 */

import type { ProgressController } from "./types";

/** 默认请求超时时间（30 秒） */
export const DEFAULT_TIMEOUT = 30000;

/** 401 未授权回调节流间隔（5 秒内只触发一次） */
export const UNAUTHORIZED_THROTTLE_MS = 5000;

/** 默认错误提示文案 */
export const DEFAULT_ERROR_MESSAGE = "服务器开小差了，请稍后重试";

/**
 * 需要 JSON 序列化的 Sequelize 查询参数（不含 where，where 由 processRequestParams 单独处理）
 * @description 这些参数会被序列化为 JSON 字符串传递给后端
 */
export const SEQUELIZE_PARAMS = ["include", "order", "attributes"] as const;

/** 默认进度条控制器（空实现） */
export const DEFAULT_PROGRESS_CONTROLLER: ProgressController = {
  start: () => {},
  done: () => {},
};
