/**
 * @fileoverview 用户 Store 工厂（含 axios 实例创建，可直接作为 defineStore 的 setup）
 * @module composables/create-user-store
 */

import { createUserStoreSetup } from "./useUserStore";
import {
  createAxiosInstance,
  type AxiosInstanceOptions,
} from "../utils/request";

export interface CreateUserStoreOptions {
  /** API 基础地址 */
  apiBaseUrl: string;
  /** 默认头像 URL */
  defaultAvatar?: string;
  /** 消息处理器（用于 request 错误提示） */
  messageHandler?: AxiosInstanceOptions["messageHandler"];
}

/**
 * 创建用户 Store 的 setup 函数。
 *
 * @remarks
 * 返回值可直接作为 Pinia `defineStore` 的 setup 函数，**由使用方（应用）调用
 * `defineStore`**，以确保使用应用自身的 Pinia 实例（避免 monorepo 下的多实例问题）。
 *
 * 纯 axios + vue 响应式实现，无 UI 依赖，可在 SSR 环境安全使用。提供：
 * - 短信登录/注册
 * - 微信扫码登录（内嵌 iframe，扫码后回调页 postMessage 回传 code 完成登录）
 * - 双 token 自动刷新
 * - 用户信息管理
 *
 * @example
 * ```ts
 * // apps 的 stores/user.ts
 * import { defineStore } from 'pinia'
 * import { createUserStore } from '@vuejs-repo/core'
 *
 * export const useUserStore = defineStore(
 *   'user',
 *   createUserStore({ apiBaseUrl: '...' }),
 *   { persist: true },
 * )
 * ```
 */
export function createUserStore({
  apiBaseUrl,
  defaultAvatar = "",
  messageHandler,
}: CreateUserStoreOptions) {
  return () => {
    const publicRequest = createAxiosInstance({
      baseURL: `${apiBaseUrl}/public`,
      messageHandler,
      showError: true,
    });

    const clientRequest = createAxiosInstance({
      baseURL: `${apiBaseUrl}/client`,
      headers: () => ({
        Authorization: `Bearer ${setup.accessToken.value}`,
      }),
      refreshToken: () => setup.refreshAccessToken(),
      onUnauthorized: () => setup.logout(),
      messageHandler,
      showError: true,
    });

    const setup = createUserStoreSetup({
      publicPost: publicRequest.post.bind(publicRequest),
      clientGet: clientRequest.get.bind(clientRequest),
      clientPut: clientRequest.put.bind(clientRequest),
      clientPost: clientRequest.post.bind(clientRequest),
      apiBaseUrl,
      defaultAvatar,
    });

    /** 获取微信扫码登录 URL */
    async function getQrConnectUrl(clientId: string): Promise<string> {
      return publicRequest.get<unknown, string>(
        "/users/wx-web/qr-connect-url",
        {
          params: { clientId },
        },
      );
    }

    return {
      ...setup,
      getQrConnectUrl,
      publicRequest,
      clientRequest,
    };
  };
}
