import { useAxios } from '@vueuse/integrations/useAxios'
import type { AxiosInstance } from 'axios'
import { adminRequest } from '~/utils/request'

/**
 * 基于管理后台请求实例（`adminRequest`）的 `useAxios` 封装。
 *
 * @remarks
 * `@vuejs-repo/core` 与 `@vueuse/integrations` 解析到不同的 axios 版本，
 * 两者的 `AxiosInstance` 类型并不一致，这里统一做一次类型收敛。
 * `immediate: false` 确保仅在显式调用 `execute(url, config)` 时才发起请求，
 * 避免组件挂载时触发多余请求。
 *
 * @example
 * ```ts
 * const { isLoading, execute } = useAdminAxios()
 * await execute('/ads', { method: 'POST', data })
 * ```
 */
export function useAdminAxios() {
  return useAxios('', adminRequest as unknown as AxiosInstance, {
    immediate: false,
  })
}
