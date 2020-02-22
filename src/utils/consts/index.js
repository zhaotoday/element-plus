import env from "jt-env";
import SIDEBAR_MENUS from "./sidebar-menus";
import GENDERS from "./genders";
import MODELS from "./models";
import CATEGORY_LEVELS from "./category-levels";
import WX_USER_STATUSES from "./wx-user-statuses";
import LIST_COLUMN_WIDTHS from "./list-column-widths";

// 基础地址
const BASE_URL = env.isDev()
  ? "http://localhost:3000"
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
  GENDERS,
  MODELS,
  CATEGORY_LEVELS,
  WX_USER_STATUSES,
  LIST_COLUMN_WIDTHS,
  BASE_URL,
  API_URL,
  PUBLIC_API_URL,
  PAGE_SIZE,
  TITLE
};
