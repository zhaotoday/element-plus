## 关于

#### 介绍

基于 Vue CLI 3 + iView 的后台管理系统，支持：开发调试、构建、代码规范校验等。

#### 技术栈

Vue、Webpack、ES6、Vue Router、Vuex、Sass、PostCSS 等。

## 例子

#### 线上的例子

[https://admin.wxxd.cn/](https://admin.wxxd.cn/)

```
用户：admin
密码：123456
```

#### 服务端框架

[https://github.com/zhaotoday/less.js](https://github.com/zhaotoday/less.js)

## 命令

```bash
# 下载代码
$ git clone https://github.com/zhaotoday/iview.git

# 安装依赖
$ npm install

# 开发调试
$ npm run serve

# 代码校验
$ npm run lint

# 构建
$ npm run build
```

## 规范

#### 项目结构

```
|-- public                           // 网站公共目录
|   |-- favicon.ico                  // 网站图标
|   |-- index.html                   // 模板文件
|-- src                              // 源码目录
|   |-- components                   // 公共组件
|   |-- mixins                       // 混入
|   |-- models                       // 数据模型
|   |-- plugins                      // 插件
|   |-- router                       // 路由配置
|       |-- routes                   // 各个视图的路由配置
|   |-- store                        // 状态管理
|       |-- actions.js               // 根级别的 actions
|       |-- getters.js               // 根级别的 getters
|       |-- mutations.js             // 根级别的 mutations
|       |-- types.js                 // 根级别的 mutation types
|       |-- modules                  // 各业务模块的局部状态管理
|           |-- articles             // 文章业务模块状态管理
|   |-- styles                       // 样式
|       |-- global                   // 全局样式
|       |-- utils                    // Sass 工具
|       |-- iview                    // 第三方 UI 库的样式（如：iView 等）
|   |-- utils                        // JS 工具
|   |-- views                        // 视图
|       |-- articles                 // 文章页
|       |-- home                     // 首页
|       |-- root                     // 根页面
|   |-- app.vue                      // 页面入口
|   |-- main.js                      // 程序入口
```

#### 公共组件规范

公共组件放在 /src/components 下。

```
|-- my-component              // my component 组件
|   |-- index.vue             // my component 的入口
|   |-- styles                // my component 的样式
|       |-- index.scss        // my component 的样式入口
|       |-- images            // my component 的图片
|   |-- utils                 // my component 的 JS 工具
|   |-- components            // my component 的子组件
|       |-- child-component   // my component 的子组件 child component
```

#### 视图规范

视图放在 /src/views 下，也就是一个页面，对应一个路由。规范和公共组件一致。

## 加入 iView 组件库

#### 提供 less 支持

```bash
# 安装 less-loader、less
$ npm install --save-dev less-loader less
```

#### 自定义 iView 的主题

/src/styles/iview/index.less：

```less
@import '~iview/src/styles/index.less';

/* 接下来开始覆盖 less 变量 */
```

[链接](https://www.iviewui.com/docs/guide/theme)

#### 引入 iView

/src/main.js：

```js
import iView from 'iview'

Vue.use(iView)
```

#### 引入 iView Loader

[官网原话]统一 iView 标签书写规范，所有标签都可以使用首字母大写的形式，包括 Vue 限制的两个标签 Switch 和 Circle。

```bash
$ npm install --save-dev iview-loader
```

```js
module: {
  rules: [
    {
      test: /\.vue$/,
      use: [
        {
          loader: 'vue-loader',
          options: {}
        },
        {
          loader: 'iview-loader',
          options: {
            prefix: false
          }
        }
      ]
    }
  ]
}
```

## 参考

#### 网址

- [Vue.js 中文网](https://cn.vuejs.org/)
- [iView - 一套基于 Vue.js 的高质量 UI 组件库](https://www.iviewui.com/)
- [Vue.js 风格指南](https://cn.vuejs.org/v2/style-guide/)
- [vue-router 中文网](http://router.vuejs.org/zh-cn/)
- [Vuex 中文网](https://vuex.vuejs.org/zh-cn/)
- [Vuex 通俗版教程](https://yeaseonzhang.github.io/2017/03/16/Vuex-%E9%80%9A%E4%BF%97%E7%89%88/)
- [Vuex 购物车示例](https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart)
- [Vue2.0 实践阶段性分享](https://segmentfault.com/a/1190000007909108)
- [单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)
- [vue-devtools](https://github.com/vuejs/vue-devtools)

#### 相关链接
- [一个极简的轻量级 Sass 工具库](https://github.com/zhaotoday/sass-utils)
- [AJAX 简单封装及使用规范](https://github.com/zhaotoday/rest)
