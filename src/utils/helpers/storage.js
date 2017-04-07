const localStorage = window.localStorage

/**
 * 设置 localStorage
 * @param key {String} 键
 * @param value {Object} 值
 */
export const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 获取 localStorage
 * @param key {String} 键
 * @return {Object}
 */
export const get = (key) => {
  return JSON.parse(localStorage.getItem(key)) || {}
}

/**
 * 移除 localStorage
 * @param key {String} 键
 */
export const remove = (key) => {
  localStorage.removeItem(key)
}
