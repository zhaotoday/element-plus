/**
 * @fileoverview 管理员登录 Store 工厂
 * @module composables/use-manager-store
 */

import { computed, ref } from "vue";
import type { Manager } from "../types/api";

export interface ManagerLoginParams {
  username: string;
  password: string;
}

export interface ManagerLoginResponse {
  manager: Manager;
  accessToken: string;
  refreshToken: string;
}

export interface ManagerRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UseManagerStoreOptions {
  /**
   * POST 请求函数，签名与 `createAxiosInstance` 返回实例的 `.post` 一致
   * （响应拦截器已解包信封，直接返回 data）。
   */
  post: <R>(url: string, data?: unknown) => Promise<R>;
  /** 登录接口路径，默认 '/managers/actions/login' */
  loginUrl?: string;
  /** 刷新 token 接口路径，默认 '/managers/actions/refresh-token' */
  refreshTokenUrl?: string;
}

/**
 * 管理员 Store setup 工厂。
 *
 * 返回值可直接作为 Pinia `defineStore` 的 setup 函数返回值。
 *
 * @example
 * ```ts
 * import { createManagerStoreSetup } from '@vuejs-repo/core'
 *
 * export const useManagerStore = defineStore('manager', () => {
 *   return createManagerStoreSetup({ post: publicRequest.post })
 * }, { persist: true })
 * ```
 */
export function createManagerStoreSetup(options: UseManagerStoreOptions) {
  const {
    post,
    loginUrl = "/managers/actions/login",
    refreshTokenUrl = "/managers/actions/refresh-token",
  } = options;

  const initialManager: Manager = { id: "", username: "" };

  const manager = ref<Manager>({ ...initialManager });
  const accessToken = ref("");
  const refreshToken = ref("");

  const isLoggedIn = computed(() => !!accessToken.value);

  const login = async ({ username, password }: ManagerLoginParams) => {
    const data = await post<ManagerLoginResponse>(loginUrl, {
      username,
      password,
    });

    manager.value = data.manager;
    accessToken.value = data.accessToken;
    refreshToken.value = data.refreshToken;
  };

  let refreshPromise: Promise<string | null> | null = null;

  const refreshAccessToken = (): Promise<string | null> => {
    if (!refreshToken.value) return Promise.resolve(null);

    if (refreshPromise) return refreshPromise;

    refreshPromise = post<ManagerRefreshTokenResponse>(refreshTokenUrl, {
      refreshToken: refreshToken.value,
    })
      .then((data) => {
        accessToken.value = data.accessToken;
        refreshToken.value = data.refreshToken;
        return data.accessToken;
      })
      .catch(() => {
        logout();
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });

    return refreshPromise;
  };

  const logout = () => {
    manager.value = { ...initialManager };
    accessToken.value = "";
    refreshToken.value = "";
  };

  return {
    manager,
    accessToken,
    refreshToken,
    isLoggedIn,
    login,
    refreshAccessToken,
    logout,
  };
}

export { type Manager } from "../types/api";
