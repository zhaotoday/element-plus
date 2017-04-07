## 介绍
基于 vue-cli 的 Vue js 单页应用项目模板，在 vue-cli 基础上做了一些合理的修改。

## 技术栈
Vue、Webpack、ES6、vue-router、Vuex、SASS、PostCSS。

## 参考
- [Vue.js 中文网](https://cn.vuejs.org/)
- [vue-router 中文网](http://router.vuejs.org/zh-cn/)
- [Vuex 中文网](https://vuex.vuejs.org/zh-cn/)
- [Vuex 通俗版教程](https://yeaseonzhang.github.io/2017/03/16/Vuex-%E9%80%9A%E4%BF%97%E7%89%88/)
- [Vuex 购物车示例](https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart)

## 使用
```bash
# 下载代码
$ git clone https://github.com/zhaotoday/vue.js.git
```

```bash
# 安装依赖
$ npm install
```

```bash
# 开发调试
$ npm run dev
```

```bash
# 构建
$ npm run build
```

```bash
# 执行单元测试
$ npm run unit
```

```bash
# 执行 e2e 测试
$ npm run e2e
```

```bash
# 执行所有测试
$ npm test
```

## 对 vue-cli 的一些修改
#### 1. 将模板文件 index.html 从根目录移至 src 目录，将构建文件 index.html 移至根目录
理由：原 vue-cli 构建后的 index.html 存放在 dist 目录下。但通常，我们需要把整个项目提交到 git/svn，然后部署，这时候访问的默认首页需要是构建后的 index.html。

#### 2. 提供 sass 支持
```bash
$ npm install --save-dev node-sass
$ npm install --save-dev sass-loader
```

未完待续。。。
