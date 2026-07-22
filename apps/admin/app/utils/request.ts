import { createAxiosInstance } from '@vuejs-repo/core/utils/request'

const apiBaseUrl = process.env.NUXT_PUBLIC_API_BASE_URL as string

function getAuthHeaders() {
  const managerStore = useManagerStore()
  return { Authorization: `Bearer ${managerStore.accessToken}` }
}

function handleUnauthorized() {
  const managerStore = useManagerStore()
  managerStore.logout()
  ElMessage.error('登录状态已失效，请重新登录')
  const route = useRoute()
  navigateTo({ path: '/login', query: { redirect: route.fullPath } })
}

function handleRefreshToken() {
  const managerStore = useManagerStore()
  return managerStore.refreshAccessToken()
}

const messageHandler = {
  error: (message: string, isHtml?: boolean) => {
    ElMessage.error({
      message,
      dangerouslyUseHTMLString: isHtml,
    })
  },
}

/** 公共 API 请求实例（无需认证） */
export const publicRequest = createAxiosInstance({
  baseURL: `${apiBaseUrl}/public`,
  showError: true,
  messageHandler,
})

/** 管理后台 API 请求实例（携带认证令牌） */
export const adminRequest = createAxiosInstance({
  baseURL: `${apiBaseUrl}/admin`,
  headers: () => getAuthHeaders(),
  showError: true,
  messageHandler,
  onUnauthorized: handleUnauthorized,
  refreshToken: handleRefreshToken,
})

/** 管理后台文件操作 API 请求实例（供 Upload / Editor 使用） */
export const adminFilesRequest = createAxiosInstance({
  baseURL: `${apiBaseUrl}/admin/files/actions`,
  headers: () => getAuthHeaders(),
  showError: true,
  messageHandler,
  onUnauthorized: handleUnauthorized,
  refreshToken: handleRefreshToken,
})
