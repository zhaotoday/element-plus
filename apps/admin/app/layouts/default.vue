<script setup lang="ts">
import { AdminLayout, AdminHeader, AdminMenu } from '@vuejs-repo/element-plus'
import { menu } from '~/config/menu'

const router = useRouter()
const managerStore = useManagerStore()
const { manager } = storeToRefs(managerStore)

async function handleLogout() {
  managerStore.logout()
  await router.replace('/login')
  ElMessage.success('已退出')
}
</script>

<template>
  <AdminLayout>
    <template #header>
      <AdminHeader
        :username="manager.username"
        :menu="menu"
        @logout="handleLogout"
      />
    </template>
    <template #logo>
      <div class="flex items-center h-60px ml-20px">
        <img
          class="block w-40px h-40px rounded-full"
          src="/static/images/common/logo.png"
          alt=""
        />
        <span class="text-18px ml-10px">管理后台</span>
      </div>
    </template>
    <template #menu>
      <AdminMenu :menu="menu" />
    </template>
    <slot />
  </AdminLayout>
</template>
