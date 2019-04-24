import env from 'jt-env'
import SIDEBAR_MENUS from './sidebar-menus'
import GENDERS from './genders'
import REQUEST_METHODS from './request-methods'
import AD_STATUSES from './ad-statuses'
import COMMENT_STATUSES from './comment-statuses'
import COMMENT_STATUS_ACTIONS from './comment-status-actions'
import ORDER_ACTIONS from './order-actions'
import MODELS from './models'
import PRODUCT_STATUSES from './product-statuses'
import CATEGORY_LEVELS from './category-levels'
import WX_USER_STATUSES from './wx-user-statuses'
import LIST_COLUMN_WIDTHS from './list-column-widths'
import COUPON_STATUSES from './coupon-statuses'
import SURVEY_QUESTION_TYPES from './survey-question-types'

// 基础地址
const BASE_URL = env.isDev() ? 'http://localhost:3004' : 'https://api.fzsc.cn'

// 接口地址
const API_URL = BASE_URL + '/api/v1/admin'

// 公开接口地址
const PUBLIC_API_URL = BASE_URL + '/api/v1/public'

// 分页大小
const PAGE_SIZE = 10

// 网站标题
const TITLE = '网站后台'

export default {
  SIDEBAR_MENUS,
  GENDERS,
  REQUEST_METHODS,
  AD_STATUSES,
  COMMENT_STATUSES,
  COMMENT_STATUS_ACTIONS,
  ORDER_ACTIONS,
  MODELS,
  PRODUCT_STATUSES,
  CATEGORY_LEVELS,
  WX_USER_STATUSES,
  LIST_COLUMN_WIDTHS,
  COUPON_STATUSES,
  SURVEY_QUESTION_TYPES,
  BASE_URL,
  API_URL,
  PUBLIC_API_URL,
  PAGE_SIZE,
  TITLE
}
