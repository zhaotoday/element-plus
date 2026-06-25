## 关于

#### 介绍

基于 Vue 3.0 + Element Plus 的后台前端解决方案，支持：开发调试、构建、代码规范校验等。

#### 技术栈

Vue、Webpack、ES6、Vue Router、Vuex、Sass、PostCSS 等。

## 命令

```bash
# 安装依赖
$ npm install

# 开发调试
$ npm run serve

# 代码校验
$ npm run lint

# 构建
$ npm run build

# 从模板创建文件
$ npm run newfile
```

## 规范

#### 项目结构

```
|- plop-templates                   基本模板
|- public                           网站公共目录
|  |- favicon.ico                   网站图标
|  |- index.html                    HTML 模板
|- src                              源码目录
|  |- assets                        待编译的静态资源
|     |- images                     图片
|        |- components              组件图片
|     |- styles                     样式
|        |- global                  全局样式
|           |- components           组件样式
|              |- iconfont.scss     iconfont
|           |- reset                CSS Reset
|        |- utils                   Sass 工具
|           |- variables            Sass 变量
|  |- components                    公共组件
|  |- composables                   公用 composiable 函数
|  |- models                        数据模型
|  |- router                        路由配置
|     |- routes                     各个视图的路由配置
|  |- store                         状态管理
|     |- modules                    状态管理（指定命名空间）
|        |- auth.js                 auth 状态管理
|  |- utils                         JS 工具
|  |- views                         视图
|     |- home                       首页
|  |- App.vue                       页面入口
|  |- main.js                       程序入口
```

#### 公共组件规范

公共组件放在 /src/components 下。

```
|- my-component               my component 组件
|  |- index.vue               my component 的入口
|  |- script.js               my component 的脚本
|  |- style.scss              my component 的样式
|  |- utils                   my component 的 JS 工具
|  |- components              my component 的子组件
|     |- child-component      my component 的子组件 child component
```

#### 视图规范

视图，也就是页面，放在 /src/views 下。规范和公共组件一致。

## 链接

#### 文档

- [Vue3 中文文档(官方)](https://v3.cn.vuejs.org/)
- [Vue3 中文文档](https://vue3js.cn/docs/zh/)
- [Vue3 组合式 API(官方)](https://composition-api.vuejs.org/zh/api.html)
- [Vue3 组合式 API](https://vue3js.cn/vue-composition-api/)
- [Vue3 组合式 API 高阶指南](https://vue3js.cn/docs/zh/guide/composition-api-introduction.html)
- [Vue3 资源推荐](https://vue3js.cn/)
- [Vue3 迁移指南](https://vue3js.cn/docs/zh/guide/migration/introduction.html)
- [Vue3 API 参考](https://vue3js.cn/docs/zh/api/)
- [Vue3 风格指南](https://vue3js.cn/docs/zh/style-guide/)

#### 配套工具

- [Vue CLI](https://cli.vuejs.org/migrating-from-v3/)
- [Vue Router](https://vue3js.cn/router4/)
- [Vuex](https://vue3js.cn/vuex/zh/)

#### 视频

- [米修在线 - Vue3 快速上手指南](https://www.bilibili.com/video/BV1HT4y137m3)
- [李南江 - Vue3 正式版教程](https://www.bilibili.com/video/BV14k4y117LL)
- [哈默聊前端 - Vue3](https://space.bilibili.com/492976859/video)
- [大地 - Vue3 教程](https://www.bilibili.com/video/BV1zt411e7fp)
- [Young 村长 - Composition API + 深度解读](https://www.bilibili.com/video/BV1my4y1m7sz)
- [Young 村长 - Vue3 光速上手](https://www.bilibili.com/video/BV1Wh411X7Xp)
- [Young 村长 - 项目打包、部署、CI/CD](https://www.bilibili.com/video/BV1Wh411X7Xp?p=30)

#### 链接

- [【Vue3 官方教程】🎄 万字笔记 | 同步导学视频 ](https://juejin.cn/post/6909247394904702984)
- [vue3-study](https://github.com/su37josephxia/vue3-study)
- [Vue-Mastery 学习笔记](https://www.yuque.com/nxtt7g/kompdt)
- [@vue/composition-api - 用于提供组合式 API 的 Vue 2 插件](https://github.com/vuejs/composition-api/blob/master/README.zh-CN.md)
- [@vue/composition-api 速成课](https://blog.csdn.net/frontend_frank/article/details/108786784)
- [Vue Class Component v8 - The next Vue Class Component for Vue v3.](https://github.com/vuejs/vue-class-component/tree/next)
- [Vue3 实战笔记](https://juejin.cn/post/6909632635665039367)
- [快速使用 Vue3 最新的 15 个常用 API](https://juejin.cn/post/6897030228867022856)

#### 开源

- [MineAdmin-Vue](https://github.com/mineadmin/MineAdmin-Vue)
- [meimei-nestjs-admin](https://github.com/87789771/meimei-nestjs-admin)
- [ikun-ui](https://github.com/ikun-svelte/ikun-ui)
- [plus-pro-components](https://github.com/plus-pro-components/plus-pro-components)
- [vtj](https://vtj.pro/)
- [View Shadcn UI](https://view-shadcn-ui.devlive.org/)
- [element-plus-kit](https://github.com/mitjs/element-plus-kit)
- [element-plus-x](https://github.com/SorrowX/element-plus-x)
- [agile-admin](https://github.com/gmingchen/agile-admin)
- [element-plus-theme](https://github.com/ele-admin/element-plus-theme)
- [miitvip-vue-admin-manager](https://github.com/lirongtong/miitvip-vue-admin-manager)
- [nuxt-shadcn-dashboard](https://github.com/dianprata/nuxt-shadcn-dashboard)
- [M-Admin](https://github.com/sina-xys-felix/M-Admin)
- [opentiny](https://opentiny.design/)
- [art-design-pro](https://www.lingchen.kim/art-design-pro/docs/zh/)
- [una-ui](https://github.com/una-ui/una-ui)
- [sz-admin](https://github.com/feiyuchuixue/sz-admin)
- [continew-admin](https://github.com/continew-org/continew-admin)
- [nova-admin](https://github.com/chansee97/nova-admin)
- [Snowy](https://github.com/xiaonuobase/Snowy)
- [smart-admin](https://github.com/1024-lab/smart-admin)
- [shadcn-admin](https://github.com/satnaing/shadcn-admin)
- [primevue](https://github.com/primefaces/primevue)
- [volt](https://volt.primevue.org/)
- [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin)
- [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin)
- [vue3-antdv-admin](https://github.com/buqiyuan/vue3-antdv-admin)
- [vue-admin-better](https://github.com/chuzhixin/vue-admin-better)
- [vue-element-ui-admin(Vue3+ScriptSetup)](https://github.com/xusenlin/vue-element-ui-admin)
- [v3-admin-vite](https://github.com/un-pany/v3-admin-vite)
- [vue-element-plus-admin](https://github.com/kailong321200875/vue-element-plus-admin)
- [SnowAdmin](https://gitee.com/wang_fan_w/SnowAdmin)
- [vue3-element-admin](https://github.com/youlaitech/vue3-element-admin)
- [naive-ui-admin](https://github.com/jekip/naive-ui-admin)
- [soybean-admin](https://github.com/soybeanjs/soybean-admin)
- [后台集合](http://vue.easydo.work/)
- [Arco Design Pro](https://github.com/arco-design/arco-design-pro-vue)
- [fantastic-admin](https://fantastic-admin.hurui.me/)
- [AdminLTE](https://github.com/ColorlibHQ/AdminLTE)
- [gin-vue-admin](https://github.com/flipped-aurora/gin-vue-admin)
- [panis-admin](https://github.com/paynezhuang/panis-admin)

#### 交互参考

- [awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui)
- [vite-shadcn](https://github.com/yluiop123/vite-shadcn)
- [tdesign](https://tdesign.tencent.com/starter/vue-next/dashboard/base)
- [mineadmin](https://www.mineadmin.com/)
- [kottster](https://kottster.app/)
- [naive-ui-pro](https://naive-ui-pro.pro-components.cn/home)
- [metis-ui](https://github.com/metisjs/metis-ui)
- [FinCRM](https://github.com/MrXujiang/FinCRM)
- [nuxt-ui-pro/dashboard](https://github.com/nuxt-ui-pro/dashboard)
- [orangeforms](https://www.orangeforms.com/)
- [shop-vite](https://vuejs-core.cn/shop-vite/)
- [semi](https://semi.design/zh-CN/)
- [Cool JS](https://cool-js.com/)
- [Ant Design Pro](https://pro.ant.design/zh-CN/)
- [Ant Design Pro Components](https://procomponents.ant.design/)
- [View UI 专业版](https://pro.iviewui.com/)
- [复盘20+基于React的开源管理后台&插件](https://juejin.cn/post/7304919237983404083)
- [vue-admin-arco](https://github.com/zxwk1998/vue-admin-arco)
