import ENV from './env'

const env = new ENV()

/**
 * @constant {string} 群组接口
 */
export const IM_GROUP_API = env.getAPI('im-group')

/**
 * @constant {string} 消息查询接口
 */
export const IM_MESSAGE_SEARCH_API = env.getAPI('im-message-search')

/**
 * @constant {string} UC 接口
 */
export const UC_API = env.uc