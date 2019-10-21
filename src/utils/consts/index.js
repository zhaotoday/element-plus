import env from 'jt-env'
import SIDEBAR_MENUS from './sidebar-menus-back'
import GENDERS from './genders'
import REQUEST_METHODS from './request-methods'
import AD_STATUSES from './ad-statuses'
import COMMENT_STATUSES from './comment-statuses'
import COMMENT_STATUS_ACTIONS from './comment-status-actions'
import ORDER_ACTIONS from './order-actions'
import ORDER_STATUSES from './order-statuses'
import MODELS from './models'
import PRODUCT_STATUSES from './product-statuses'
import PRODUCT_UNITS from './product-units'
import PRODUCT_SPECIFICATIONS from './product-specifications'
import CATEGORY_LEVELS from './category-levels'
import WX_USER_STATUSES from './wx-user-statuses'
import LIST_COLUMN_WIDTHS from './list-column-widths'
import COUPON_STATUSES from './coupon-statuses'
import COUPON_TYPES from './coupon-types'
import COUPON_ACTIVITY_TYPES from './coupon-activity-types'
import COUPON_SEND_TIMES from './couponn-send-times'
import SURVEY_QUESTION_TYPES from './survey-question-types'
import PAY_WAYS from './pay-ways'
import STATUSES from './statuses'

// 基础地址
const BASE_URL = env.isDev() ? 'http://localhost:3005' : 'https://api.houhuanxi.cn'

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
  PRODUCT_UNITS,
  PRODUCT_SPECIFICATIONS,
  CATEGORY_LEVELS,
  WX_USER_STATUSES,
  LIST_COLUMN_WIDTHS,
  COUPON_STATUSES,
  COUPON_TYPES,
  COUPON_ACTIVITY_TYPES,
  COUPON_SEND_TIMES,
  SURVEY_QUESTION_TYPES,
  ORDER_STATUSES,
  PAY_WAYS,
  STATUSES,
  BASE_URL,
  API_URL,
  PUBLIC_API_URL,
  PAGE_SIZE,
  TITLE
}
