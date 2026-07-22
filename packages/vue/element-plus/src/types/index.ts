import type { Component, VNode } from "vue";

/**
 * 管理后台菜单项配置。
 */
export interface AdminMenuItem {
  /** 菜单标题 */
  title: string;
  /** 菜单路由路径 */
  path: string;
  /** 菜单图标，支持字符串类名、VNode 或 Vue 组件 */
  icon?: string | VNode | Component;
  /** 子菜单项 */
  children?: AdminMenuItem[];
}

/**
 * 枚举选择项，用于 EnumSelect 等组件的选项数据。
 */
export interface EnumItem {
  /** 选项显示标签 */
  label: string;
  /** 选项值 */
  value: string | number;
}

/**
 * 可排序条目，用于 OrderInput 组件的单项数据。
 */
export interface OrderableItem {
  /** 条目 ID */
  id: string | number;
  /** 排序值 */
  order: number;
  /** 其他扩展属性 */
  [key: string]: unknown;
}
