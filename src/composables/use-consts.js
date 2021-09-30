import { SidebarMenu } from "@/utils/consts/sidebar-menu";

export const useConsts = () => {
  // 基础地址
  const baseUrl = process.env["BASE_URL"];

  // 接口地址
  const ApiUrl = process.env["VUE_APP_API_URL"];

  // 静态文件地址
  const StaticUrl = process.env["VUE_APP_STATIC_URL"];

  // 分页大小
  const PageSize = 10;

  return {
    SidebarMenu,
    baseUrl,
    ApiUrl,
    StaticUrl,
    PageSize,
  };
};
