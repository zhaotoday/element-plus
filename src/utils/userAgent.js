// 移动终端
export const terminal = () => {
  let u = navigator.userAgent
  let agent = 'pc'
  if (u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    agent = 'ios'
  } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    agent = 'android'
  }
  return agent
}
