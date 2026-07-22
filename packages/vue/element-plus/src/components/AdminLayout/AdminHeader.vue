<template>
  <div
    class="flex items-center justify-between h-60px bg-white border-b-1px border-b-#e7e3e4 px-20px"
  >
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index">
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-popover
      popper-style="padding: 0; margin-top: -6px"
      placement="bottom-start"
      :show-arrow="false"
      trigger="hover"
    >
      <div
        class="flex items-center cursor-pointer p-10px rounded-4px hover:bg-gray-50"
        @click="handleLogout"
      >
        <i class="i-ant-design:logout-outlined text-16px" />
        <span class="ml-6px text-14px">退出账号</span>
      </div>
      <template #reference>
        <div
          class="flex items-center cursor-pointer rounded-8px px-8px py-6px hover:bg-gray-100"
        >
          <el-avatar :icon="UserFilled" :size="34" />
          <span class="text-14px ml-10px">{{ username }}</span>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
/**
 * 管理后台顶栏。展示面包屑、当前用户名与退出入口。
 */
import { UserFilled } from "@element-plus/icons-vue";
import type { AdminMenuItem } from "../../types";

const props = defineProps<{
  /** 当前登录用户名 */
  username: string;
  /** 菜单数据，用于根据当前路由生成面包屑导航 */
  menu?: AdminMenuItem[];
}>();

const emit = defineEmits<{
  /** 用户点击退出时触发 */
  logout: [];
}>();

const route = useRoute();

/** 根据当前路由路径匹配菜单数据，生成面包屑导航列表 */
const breadcrumbItems = computed(() => {
  if (!props.menu) return [];

  const currentPath = route.path;
  const items: { title: string; path: string }[] = [];

  for (const item of props.menu) {
    if (item.children?.length) {
      for (const child of item.children) {
        if (
          child.path &&
          (currentPath === child.path ||
            currentPath.startsWith(`${child.path}/`))
        ) {
          items.push(
            { title: item.title, path: item.path },
            { title: child.title, path: child.path },
          );
          return items;
        }
      }
    }

    if (
      item.path &&
      (currentPath === item.path || currentPath.startsWith(`${item.path}/`))
    ) {
      items.push({ title: item.title, path: item.path });
      return items;
    }
  }

  return items;
});

function handleLogout() {
  emit("logout");
}
</script>
