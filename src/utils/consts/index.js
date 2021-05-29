import { SidebarMenu } from "@/utils/consts/sidebar-menu";

// 基础地址
const baseUrl = import.meta.env["BASE_URL"];

// 接口地址
const ApiUrl = import.meta.env["VITE_API_URL"];

// 静态文件地址
const StaticUrl = import.meta.env["VITE_STATIC_URL"];

// 分页大小
const PageSize = 10;

export const consts = {
  SidebarMenu,
  baseUrl,
  ApiUrl,
  StaticUrl,
  PageSize,
};
