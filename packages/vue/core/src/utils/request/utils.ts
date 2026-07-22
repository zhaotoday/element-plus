/**
 * @fileoverview HTTP 请求工具函数
 * @module request/utils
 */

import type { MessageHandler, WhereCondition, ExtendedRequestConfig } from "./types";
import { DEFAULT_ERROR_MESSAGE, SEQUELIZE_PARAMS } from "./constants";

/**
 * 检查对象是否为空
 */
function isEmptyObject(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * 格式化 where 查询条件
 * - 跳过 undefined、空字符串
 * - $$ 操作符转为 $
 * - $like 自动包裹 %value%
 * - 仅保留有效条件
 */
export function formatWhere(whereObj: WhereCondition): Record<string, unknown> {
  if (!whereObj || typeof whereObj !== "object") {
    return {};
  }

  const result: Record<string, unknown> = {};

  for (const [attribute, conditions] of Object.entries(whereObj)) {
    if (!conditions || typeof conditions !== "object") {
      continue;
    }

    const attributeConditions: Record<string, unknown> = {};

    for (const [operator, value] of Object.entries(conditions as Record<string, unknown>)) {
      if (value === undefined || value === "") {
        continue;
      }

      if (operator.startsWith("$$")) {
        attributeConditions[operator.replace("$$", "$")] = value;
      } else if (operator === "$like") {
        const stringValue = typeof value === "string" ? value : String(value);
        attributeConditions[operator] = `%${stringValue}%`;
      } else {
        attributeConditions[operator] = value;
      }
    }

    if (!isEmptyObject(attributeConditions)) {
      result[attribute] = attributeConditions;
    }
  }

  return result;
}

/**
 * 处理请求参数：格式化 where，序列化 Sequelize 参数，保留时间戳。
 * 会移除 where 中的 _vts（避免将 Vue 响应式标记提交至服务端）。
 */
export function processRequestParams(config: ExtendedRequestConfig): void {
  const { params } = config;

  if (!config.params) {
    config.params = {};
  }

  const timestamp = params?._t;

  if (params?.where && typeof params.where === "object" && "_vts" in params.where) {
    const where = params.where as Record<string, unknown>;
    delete where._vts;
  }

  const where: WhereCondition =
    params?.where && typeof params.where === "object"
      ? (params.where as WhereCondition)
      : {};

  const formattedWhere = formatWhere(where);

  if (!isEmptyObject(formattedWhere)) {
    config.params.where = JSON.stringify(formattedWhere);
  }

  if (params) {
    for (const key of SEQUELIZE_PARAMS) {
      if (params[key] != null) {
        config.params[key] = JSON.stringify(params[key]);
      }
    }
  }

  if (timestamp !== undefined) {
    config.params._t = timestamp;
  }
}

/**
 * 服务端统一错误响应结构
 *
 * `{ success: false, statusCode, message, timestamp, path, errors? }`
 */
interface ErrorResponse {
  message?: unknown;
  errors?: { path?: (string | number)[]; message?: string }[];
}

/**
 * 显示错误消息
 *
 * @description 解析服务端错误响应并通过消息处理器显示
 * - 有 `errors` 数组时：直接提取各条 message 拼接显示
 * - 字符串消息：直接显示
 * - 数组消息：用 `<br />` 连接显示
 * - 其他情况：显示默认错误提示
 *
 * @param data - 服务端响应数据
 * @param messageHandler - 消息处理器
 */
export function showError(data: ErrorResponse, messageHandler: MessageHandler): void {
  const { message, errors } = data ?? {};

  if (errors?.length) {
    const lines = errors.map((e) => e.message || "");
    messageHandler.error(lines.join("<br />"), true);
    return;
  }

  if (!message) {
    messageHandler.error(DEFAULT_ERROR_MESSAGE);
    return;
  }

  if (typeof message === "string") {
    messageHandler.error(message);
  } else if (Array.isArray(message)) {
    messageHandler.error(message.join("<br />"), true);
  } else {
    messageHandler.error(DEFAULT_ERROR_MESSAGE);
  }
}
