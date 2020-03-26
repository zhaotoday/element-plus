import env from "jt-env";
import SidebarMenu from "./sidebar-menu";
import Model from "./model";
import CategoryLevel from "./category-level";
import ListColumnWidth from "./list-column-width";
import OrderAction from "./order-action";

// 基础地址
const BaseUrl = env.isDev()
  ? "http://localhost:3000"
  : "https://hhx-api.liruan.cn";

// 接口地址
const ApiUrl = BaseUrl + "/admin";

// 公开接口地址
const publicApiUrl = BaseUrl + "/public";

// 分页大小
const PageSize = 10;

// 网站标题
const Title = "网站后台";

export default {
  SidebarMenu,
  Model,
  CategoryLevel,
  ListColumnWidth,
  OrderAction,
  BaseUrl,
  ApiUrl,
  publicApiUrl,
  PageSize,
  Title
};
