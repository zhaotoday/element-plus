## 介绍
基于 vue-cli 的 Vue js 单页应用项目模板，在 vue-cli 基础上做了一些合理的修改和增强。

## 技术栈
Vue、Webpack、ES6、vue-router、Vuex、SASS、PostCSS。

## 参考
- [Vue.js 中文网](https://cn.vuejs.org/)
- [vue-router 中文网](http://router.vuejs.org/zh-cn/)
- [Vuex 中文网](https://vuex.vuejs.org/zh-cn/)
- [Vuex 通俗版教程](https://yeaseonzhang.github.io/2017/03/16/Vuex-%E9%80%9A%E4%BF%97%E7%89%88/)
- [Vuex 购物车示例](https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart)
- [Vue2.0 实践阶段性分享](https://segmentfault.com/a/1190000007909108)

## 使用
```bash
# 下载代码
$ git clone https://github.com/zhaotoday/vue.js.git

# 安装依赖
$ npm install

# 开发调试
$ npm run dev

# 构建
$ npm run build

# 执行单元测试
$ npm run unit

# 执行 e2e 测试
$ npm run e2e

# 执行所有测试
$ npm test
```

## 对 vue-cli 的一些修改和增强
#### 1. 将模板文件 index.html 从根目录移至 src 目录，将构建文件 index.html 移至根目录
理由：原 vue-cli 构建后的 index.html 存放在 dist 目录下。但通常，我们需要把整个项目提交到 git/svn，然后部署，这时候访问的默认首页需要是构建后的 index.html。

#### 2. 提供 sass 支持
```bash
# 安装 node-sass、sass-loader
$ npm install --save-dev node-sass sass-loader
```
```html
<!-- 引入样式 -->
<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
```
#### 3. 用 axios 作为 ajax 方案
官方已经不推荐 vue-resource 作为 ajax 方案，请用 axios 代替。
```bash
# 安装 axios
$ npm install --save axios
```
[链接](https://github.com/vuefe/vuefe.github.io/issues/186)、[链接](https://github.com/zhaotoday/rest)

#### 4. 添加 polyfill
按需引入 polyfill，提高浏览器兼容性。
```bash
# 安装 core-js
$ npm install --save core-js
```
polyfill 在 /src/utils/polyfill.js 文件中引入：
```js
import 'core-js/es6/promise'
```

#### 5. 用 Vuex 做状态管理
```bash
# 安装 vuex
$ npm install --save vuex
```
[链接](https://vuex.vuejs.org/zh-cn/structure.html)

## 项目结构
```
|-- build                            // Webpack 项目构建
|-- config                           // 项目开发环境配置
|-- src                              // 源码目录
|   |-- app                          // 业务代码
|       |-- Articles                 // 文章业务模块
|       |-- Home                     // 首页
|       |-- Layout                   // 页面布局结构（除登录页外）
|       |-- Login                    // 登录页
|       |-- NotFound                 // 404 页
|       |-- Root                     // 根页面（可以在这里添加全局样式等）
|       |-- Unauthorized             // 未授权页面（在开发权限相关系统时有用）
|   |-- components                   // 公共组件
|   |-- i18n                         // 全局国际化
|   |-- models                       // 数据模型（主要在 store 中用到）
|   |-- router                       // 路由配置
|       |-- routes                   // 各业务模块路由配置
|   |-- store                        // Vuex 状态管理
|       |-- actions.js               // 根级别的 actions
|       |-- getters.js               // 根级别的 getters
|       |-- mutations.js             // 根级别的 mutations
|       |-- types.js                 // 根级别的 mutation types
|       |-- modules                  // 各业务模块的局部状态管理
|           |-- articles             // 文章业务模块状态管理
|   |-- utils                        // 工具集合
|       |-- helpers                  // 帮助函数集合
|       |-- auth.js                  // 权限相关
|       |-- env.js                   // 环境配置类
|       |-- consts.js                // 常量配置
|       |-- i18n.js                  // 国际化类
|       |-- init.js                  // 初始化
|       |-- polyfill.js              // polyfill
|       |-- rest.js                  // RESTful 请求类
|   |-- App.vue                      // 页面入口
|   |-- main.js                      // 程序入口，加载各种公共组件
|-- static                           // 静态文件，如：图片、JSON 数据等
|-- .babelrc                         // babel-loader 配置
|-- .editorconfig                    // 定义代码格式
|-- package.json                     // 项目基本信息
```

## 公用组件规范
公用组件放在 /src/components 下。
```
|-- src                              // 源码目录
|   |-- components                   // 公用组件
|       |-- MyComponent              // MyComponent
|           |-- index.vue            // MyComponent 的入口
|           |-- theme                // MyComponent 的皮肤
|               |-- images           // MyComponent 的图片
|               |-- styles           // MyComponent 的样式
|                   |-- index.scss   // MyComponent 的样式入口
|           |-- utils                // MyComponent 的工具集合
|           |-- i18n                 // MyComponent 的国际化
|           |-- components           // MyComponent 的子组件
|               |-- SubComponent     // MyComponent 的子组件，组件规范和 MyComponent 一致 
```

## 业务组件规范
业务组件放在 /src/app 下，也就是一个页面，对应一个路由。规范和公用组件一直。
