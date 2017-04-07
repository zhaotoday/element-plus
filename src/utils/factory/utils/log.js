/**
 * 提示信息
 * @param namespace {string} 命名空间
 * @param method {string} 方法
 * @param args {object} 参数列表
 */
export default (namespace, method, args) => {
  console.info(`在浏览器中不支持：${namespace} 的 ${method} 方法，传递的参数为：`, args)
}