/**
 * @fileoverview 用户登录 Store 工厂
 * @module composables/use-user-store
 */

import { computed, ref } from "vue";
import type { User } from "../types/api";

export interface UserLoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface UserRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UseUserStoreOptions {
  /**
   * POST 请求函数（公共接口，响应拦截器已解包信封）。
   */
  publicPost: <R>(url: string, data?: unknown) => Promise<R>;
  /**
   * GET 请求函数（客户端接口，需认证）。
   */
  clientGet: <R>(url: string) => Promise<R>;
  /**
   * PUT 请求函数（客户端接口，需认证）。
   */
  clientPut: <R>(url: string, data?: unknown) => Promise<R>;
  /**
   * POST 请求函数（客户端接口，需认证）。
   */
  clientPost: <R>(url: string, data?: unknown) => Promise<R>;
  /** 刷新 token 接口路径，默认 '/users/actions/refresh-token' */
  refreshTokenUrl?: string;
  /** API 基础地址，用于拼接头像等资源 URL */
  apiBaseUrl: string;
  /** 默认头像 URL */
  defaultAvatar?: string;
}

/**
 * 用户 Store setup 工厂。
 *
 * 返回值可直接作为 Pinia `defineStore` 的 setup 函数返回值。
 * 包含通用的用户状态管理：双 token、用户信息、头像、刷新、登出。
 *
 * @example
 * ```ts
 * import { createUserStoreSetup } from '@vuejs-repo/core'
 *
 * export const useUserStore = defineStore('user', () => {
 *   const setup = createUserStoreSetup({ ... })
 *   // 添加项目特定的登录方法
 *   return { ...setup, wxMpLogin }
 * }, { persist: true })
 * ```
 */
export function createUserStoreSetup(options: UseUserStoreOptions) {
  const {
    publicPost,
    clientGet,
    clientPut,
    clientPost,
    refreshTokenUrl = "/users/actions/refresh-token",
    apiBaseUrl,
    defaultAvatar = "",
  } = options;

  const initialUser: User = { name: "" };

  const user = ref<User>({ ...initialUser });
  const accessToken = ref("");
  const refreshToken = ref("");

  const isLoggedIn = computed(() => !!accessToken.value);

  const avatarUrl = computed(() => {
    const fileId = user.value.avatarFile?.id;
    if (fileId) return `${apiBaseUrl}/public/files/${fileId}`;
    return user.value.wxAvatarUrl || defaultAvatar;
  });

  function setLoginData(data: UserLoginResponse) {
    user.value = data.user;
    accessToken.value = data.accessToken;
    refreshToken.value = data.refreshToken;
  }

  let refreshPromise: Promise<string | null> | null = null;

  const refreshAccessToken = (): Promise<string | null> => {
    if (!refreshToken.value) return Promise.resolve(null);

    if (refreshPromise) return refreshPromise;

    refreshPromise = publicPost<UserRefreshTokenResponse>(refreshTokenUrl, {
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

  function logout() {
    user.value = { ...initialUser };
    accessToken.value = "";
    refreshToken.value = "";
  }

  async function fetchUserInfo() {
    user.value = await clientGet<User>("/users/me");
    return user.value;
  }

  async function updateUserInfo(data: Partial<User>) {
    user.value = await clientPut<User>("/users/me", data);
    return user.value;
  }

  async function bindPhoneNumber(phoneNumber: string, captcha: string) {
    await clientPost("/users/actions/bind-phone-number", {
      phoneNumber,
      captcha,
    });
  }

  /** 微信小程序手机号绑定 */
  async function bindWxMpPhoneNumber(code: string) {
    await clientPost("/users/wx-mp/actions/get-phone-number", { code });
  }

  /** 微信小程序 code 登录 */
  async function wxMpLogin(code: string) {
    const data = await publicPost<UserLoginResponse>(
      "/users/wx-mp/actions/login",
      { code },
    );
    setLoginData(data);
  }

  /** 微信公众号 code 登录 */
  async function wxOaLogin(code: string) {
    const data = await publicPost<UserLoginResponse>(
      "/users/wx-oa/actions/login",
      { code },
    );
    setLoginData(data);
  }

  /** 微信网站应用 code 登录 */
  async function wxWebLogin(code: string) {
    const data = await publicPost<UserLoginResponse>(
      "/users/wx-web/actions/login",
      { code },
    );
    setLoginData(data);
  }

  /** 发送短信验证码 */
  async function sendSmsCaptcha(phoneNumber: string) {
    await publicPost("/users/sms/actions/send-captcha", { phoneNumber });
  }

  /** 手机短信登录/注册 */
  async function smsLogin(phoneNumber: string, captcha: string) {
    const data = await publicPost<UserLoginResponse>(
      "/users/sms/actions/login",
      { phoneNumber, captcha },
    );
    setLoginData(data);
  }

  return {
    user,
    accessToken,
    refreshToken,
    isLoggedIn,
    avatarUrl,
    setLoginData,
    refreshAccessToken,
    logout,
    fetchUserInfo,
    updateUserInfo,
    bindPhoneNumber,
    bindWxMpPhoneNumber,
    wxMpLogin,
    wxOaLogin,
    wxWebLogin,
    sendSmsCaptcha,
    smsLogin,
  };
}
