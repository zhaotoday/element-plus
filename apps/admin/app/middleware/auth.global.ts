let refreshed = false

export default defineNuxtRouteMiddleware(async (to) => {
  const managerStore = useManagerStore()
  const { manager, accessToken } = storeToRefs(managerStore)

  const isLoggedIn = Boolean(manager.value?.id) && accessToken.value !== ''

  if (to.path === '/') {
    return navigateTo('/home/ads')
  }

  if (isLoggedIn && to.path === '/login') {
    return navigateTo('/home/ads')
  }

  if (!isLoggedIn && to.path !== '/login') {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
  }

  if (isLoggedIn && !refreshed) {
    refreshed = true
    await managerStore.refreshAccessToken()
  }
})
