/**
 * @fileoverview Axios 实例创建与拦截器配置
 * @module request/instance
 */

import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import type { ExtendedRequestConfig, AxiosInstanceOptions } from "./types";
import {
  DEFAULT_TIMEOUT,
  DEFAULT_PROGRESS_CONTROLLER,
  UNAUTHORIZED_THROTTLE_MS,
} from "./constants";
import { showError, processRequestParams } from "./utils";

type RetryableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

/**
 * 创建配置好拦截器的 Axios 实例
 *
 * @description
 * 内置功能：
 * - 自定义适配器注入（支持非标准环境，如 uni-app 小程序）
 * - 请求头动态注入（支持函数形式，用于获取最新 token）
 * - Sequelize 查询参数自动序列化（include、order、attributes、where）
 * - GET 请求自动添加时间戳防止缓存
 * - 响应数据自动解包（统一信封 `{ success, data, meta? }`）
 * - 可选的加载进度条控制
 * - 可选的错误消息提示
 * - 401 自动刷新 token 并重试（配置 refreshToken 时启用，防并发 + 请求队列）
 * - 401 未授权回调（带节流，5 秒内只触发一次，每个实例独立）
 * - 可选的调试日志（通过 `debug` 开启）
 *
 * @param options - 配置项
 * @returns Axios 实例
 *
 * @example
 * ```typescript
 * const request = createAxiosInstance({
 *   baseURL: 'https://api.example.com',
 *   headers: () => ({ Authorization: `Bearer ${getToken()}` }),
 *   onUnauthorized: () => router.push('/login'),
 *   messageHandler: { error: (msg) => toast.error(msg) },
 *   refreshToken: () => userStore.refreshAccessToken(),
 * });
 * ```
 */
export function createAxiosInstance(options: AxiosInstanceOptions = {}): AxiosInstance {
  const {
    baseURL,
    timeout = DEFAULT_TIMEOUT,
    adapter,
    headers,
    onUnauthorized,
    messageHandler,
    progressController = DEFAULT_PROGRESS_CONTROLLER,
    showError: defaultShowError = false,
    debug = false,
    refreshToken,
  } = options;

  const log = debug ? console.log : () => {};
  const logError = debug ? console.error : () => {};
  const logWarn = debug ? console.warn : () => {};

  /** 401 未授权回调节流定时器（每个实例独立） */
  let unauthorizedTimer: ReturnType<typeof setTimeout> | null = null;

  function triggerUnauthorized() {
    logWarn("用户未授权，执行未授权回调");
    if (unauthorizedTimer === null) {
      onUnauthorized?.();
      unauthorizedTimer = setTimeout(() => {
        unauthorizedTimer = null;
      }, UNAUTHORIZED_THROTTLE_MS);
    }
  }

  // Token 刷新相关状态（每个实例独立）
  let isRefreshing = false;
  let requestQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
  }> = [];

  function resolveQueue(newToken: string) {
    requestQueue.forEach(({ resolve }) => resolve(newToken));
    requestQueue = [];
  }

  function rejectQueue(error: unknown) {
    requestQueue.forEach(({ reject }) => reject(error));
    requestQueue = [];
  }

  const instance = axios.create({ baseURL, timeout, adapter });

  // 请求拦截器
  instance.interceptors.request.use(
    (config: ExtendedRequestConfig & { _processed?: boolean }) => {
      // 重试请求已经过处理，只需更新时间戳，跳过参数序列化和 headers 注入
      if (config._processed) {
        if (config.method?.toLowerCase() === "get") {
          config.params = { ...config.params, _t: Date.now() };
        }
        return config;
      }

      config._processed = true;

      if (config.showLoading) {
        progressController.start();
      }

      if (headers) {
        const headerValues = typeof headers === "function" ? headers() : headers;
        config.headers = config.headers || {};
        Object.entries(headerValues).forEach(([key, value]) => {
          if (value != null) {
            config.headers.set(key, value);
          }
        });
      }

      if ((config as ExtendedRequestConfig).showError === undefined) {
        (config as ExtendedRequestConfig).showError = defaultShowError;
      }

      processRequestParams(config);

      if (config.method?.toLowerCase() === "get") {
        config.params = { ...config.params, _t: Date.now() };
      }

      return config;
    },
    (error: unknown) => {
      logError("请求发送失败:", error);
      return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    },
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse & { config: ExtendedRequestConfig }) => {
      const { config, data } = response;

      if (config.showLoading) {
        progressController.done();
      }

      log("请求成功:", response.config.url, data);

      if (data?.meta) {
        return { total: data.meta.total, items: data.data };
      }

      return data?.data ?? null;
    },
    async (error: unknown) => {
      const axiosError = error as {
        response?: AxiosResponse & { config: ExtendedRequestConfig };
        config?: RetryableRequestConfig;
      };
      const response = axiosError.response;

      if (!response) {
        logError("网络请求失败:", error);
        return Promise.reject(error instanceof Error ? error : new Error(String(error)));
      }

      const { config, status, data } = response;

      if (config?.showLoading) {
        progressController.done();
      }

      logError(`请求失败 [${status}]:`, response.config.url, data);

      // 401 + refreshToken 配置 → 自动刷新并重试
      const originalRequest = axiosError.config;
      if (
        status === 401 &&
        refreshToken &&
        originalRequest &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        // 已有刷新进行中 → 排入队列等待
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            requestQueue.push({
              resolve: (newToken) => {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                resolve(instance(originalRequest));
              },
              reject,
            });
          });
        }

        // 第一个 401 → 发起刷新
        isRefreshing = true;
        try {
          const newToken = await refreshToken();
          if (!newToken) {
            throw error;
          }
          resolveQueue(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          rejectQueue(refreshError);
          triggerUnauthorized();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // 401 无 refreshToken 配置 → 直接触发未授权回调
      if (status === 401) {
        triggerUnauthorized();
      } else if (config?.showError && messageHandler) {
        showError(data, messageHandler);
      }

      return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    },
  );

  return instance;
}
