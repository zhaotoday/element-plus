/**
 * @fileoverview HTTP 请求相关类型定义
 * @module request/types
 */

import type { AxiosAdapter, InternalAxiosRequestConfig } from "axios";

/** Where 条件类型定义 */
export type WhereCondition = Record<string, unknown>;

/**
 * 查询参数接口
 */
export interface Query {
  /** Where 查询条件 */
  where?: WhereCondition;
  /** 其他查询参数 */
  [key: string]: unknown;
}

/**
 * 进度条控制器
 */
export interface ProgressController {
  /** 开始加载 */
  start: () => void;
  /** 结束加载 */
  done: () => void;
}

/**
 * 消息处理器
 */
export interface MessageHandler {
  /**
   * 显示错误消息
   * @param message - 错误消息内容
   * @param isHtml - 是否为 HTML 格式
   */
  error: (message: string, isHtml?: boolean) => void;
}

/**
 * 扩展的 Axios 请求配置
 */
export interface ExtendedRequestConfig extends InternalAxiosRequestConfig {
  /** 是否显示加载进度条 */
  showLoading?: boolean;
  /** 是否显示错误提示 */
  showError?: boolean;
}

/**
 * 创建 Axios 实例的配置项
 */
export interface AxiosInstanceOptions {
  /** API 基础地址 */
  baseURL?: string;
  /** 请求超时时间（毫秒） */
  timeout?: number;
  /**
   * 自定义请求适配器，用于替换 Axios 默认的 XHR/Fetch 适配器。
   * 适用于非标准浏览器环境（如 uni-app、小程序等）。
   */
  adapter?: AxiosAdapter;
  /**
   * 请求头配置
   * - 对象：静态请求头
   * - 函数：动态获取请求头（如获取最新 token）
   */
  headers?: Record<string, string> | (() => Record<string, string>);
  /** 401 未授权回调（在 refresh 失败后或未配置 refresh 时触发） */
  onUnauthorized?: () => void;
  /** 消息处理器（用于显示错误提示） */
  messageHandler?: MessageHandler;
  /** 进度条控制器 */
  progressController?: ProgressController;
  /**
   * 是否默认显示错误提示（可在单次请求中通过 showError 覆盖）
   * @defaultValue false
   */
  showError?: boolean;
  /**
   * 是否输出请求/响应调试日志到控制台
   * @defaultValue false
   */
  debug?: boolean;
  /**
   * Token 刷新函数。
   * 配置后 401 时自动调用此函数刷新 token 并重试请求。
   * 返回新 accessToken，返回 null 表示刷新失败（会触发 onUnauthorized）。
   */
  refreshToken?: () => Promise<string | null>;
}
