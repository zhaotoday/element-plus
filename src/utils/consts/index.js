import Model from "./model";
import CategoryLevel from "./category-level";
import ListColumnWidth from "./list-column-width";
import OrderAction from "./order-action";
import ImageMaxWidth from "./image-max-width";
import SidebarMenu from "./sidebar-menu";

// 基础地址
const BaseUrl = "https://my-app.liruan.cn";
// const BaseUrl = "http://localhost:3001";

// CDN
const CdnUrl = "https://my-app.lrcdn.cn";

// 接口地址
const ApiUrl = BaseUrl + "/admin";

// 公开接口地址
const PublicApiUrl = BaseUrl + "/public";

// 分页大小
const PageSize = 10;

// 网站标题
const Title = "网站后台";

export default {
  Model,
  CategoryLevel,
  ListColumnWidth,
  OrderAction,
  ImageMaxWidth,
  SidebarMenu,
  BaseUrl,
  CdnUrl,
  ApiUrl,
  PublicApiUrl,
  PageSize,
  Title
};
