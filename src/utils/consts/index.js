import env from "jt-env";
import SIDEBAR_MENUS from "./sidebar-menus";
import MODELS from "./models";
import CATEGORY_LEVELS from "./category-levels";
import LIST_COLUMN_WIDTHS from "./list-column-widths";

// 基础地址
const BASE_URL = env.isDev()
  ? "http://localhost:"
  : "https://hhx-api.liruan.cn";

// 接口地址
const API_URL = BASE_URL + "/admin";

// 公开接口地址
const PUBLIC_API_URL = BASE_URL + "/public";

// 分页大小
const PAGE_SIZE = 10;

// 网站标题
const TITLE = "网站后台";

export default {
  SIDEBAR_MENUS,
  MODELS,
  CATEGORY_LEVELS,
  LIST_COLUMN_WIDTHS,
  BASE_URL,
  API_URL,
  PUBLIC_API_URL,
  PAGE_SIZE,
  TITLE
};
