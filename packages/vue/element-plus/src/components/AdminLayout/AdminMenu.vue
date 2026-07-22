<template>
  <el-menu
    class="admin-menu"
    :default-active="activeKey"
    :collapse="isCollapsed"
    router
  >
    <template v-for="(item, index) in menu" :key="item.path || index">
      <el-sub-menu v-if="hasChildren(item)" :index="String(index)">
        <template #title>
          <MenuIcon :icon="item.icon" />
          <span class="ml-4px">{{ item.title }}</span>
        </template>
        <el-menu-item
          v-for="(child, childIndex) in item.children"
          :key="child.path"
          :index="`${index}-${childIndex}`"
          :route="child.path"
        >
          <span class="pl-3px">{{ child.title }}</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="String(index)" :route="item.path">
        <MenuIcon :icon="item.icon" />
        <span class="ml-4px">{{ item.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
/**
 * 管理后台侧边菜单。支持多级菜单、路由高亮与图标（类名或 Vue 组件）。
 */
import type { Component, VNode } from "vue";
import type { AdminMenuItem } from "../../types";

const props = defineProps<{
  /** 菜单数据列表 */
  menu: AdminMenuItem[];
}>();

const route = useRoute();
/** 菜单是否处于折叠状态 */
const isCollapsed = ref(false);

/**
 * 菜单图标渲染组件，支持字符串类名和 Vue 组件两种形式。
 */
const MenuIcon = defineComponent<{ icon?: string | VNode | Component }>({
  props: ["icon"],
  setup(iconProps) {
    return () => {
      if (!iconProps.icon) return null;

      if (typeof iconProps.icon === "string") {
        return h("i", { class: ["text-16px", iconProps.icon] });
      }

      return h(iconProps.icon as any, { class: "text-16px" });
    };
  },
});

/** 判断菜单项是否包含子菜单 */
function hasChildren(item: AdminMenuItem): boolean {
  return Boolean(item.children?.length);
}

/** 根据当前路由路径匹配对应的菜单项索引，用于 default-active */
const activeKey = computed(() => {
  const currentPath = route.path;

  for (let i = 0; i < props.menu.length; i++) {
    const item = props.menu[i]!;

    if (item.children?.length) {
      for (let j = 0; j < item.children.length; j++) {
        const child = item.children[j]!;
        if (
          child.path &&
          (currentPath === child.path ||
            currentPath.startsWith(`${child.path}/`))
        ) {
          return `${i}-${j}`;
        }
      }
    }

    if (
      item.path &&
      (currentPath === item.path || currentPath.startsWith(`${item.path}/`))
    ) {
      return String(i);
    }
  }

  return "0";
});
</script>

<style scoped>
.admin-menu {
  margin-left: 4px;
  margin-right: -1px;
  --el-menu-bg-color: #fcfcfc;
  --el-menu-border-color: white;
  --el-menu-item-height: calc(56px - 8px);
}
</style>
