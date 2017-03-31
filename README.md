## 小贴士
- 本项目 webpack 已升级至 webpack 2。
- 本项目为了减少代码体积，用了 react-lite 代替 react js。您也可以直接使用 react js，请注释[这段配置](https://github.com/zhaotoday/react/blob/master/build/utils/base.config.js#L106)。
- 本项目还在优化中，但已经可以用于生产环境。
- 如果您有好的意见或建议，请 issue。
- 如果您觉得本项目对您有帮助，请给个 star，^_^。

## 一、介绍
基于 reactjs+redux+webpack2 的单页应用项目模板，功能包括：调试、构建、代码规范校验、单元测试、国际化等。

## 二、技术栈
react js、redux、es6、webpack 2、sass、postcss、css modules。

## 三、使用
#### 1. 下载源码
```
git clone https://github.com/zhaotoday/react.git
```
#### 2. 安装 npm 依赖包
```
npm install
```
#### 3. 启动项目
```
npm start
```
#### 4. JS 代码规范校验
```
npm run eslint
```
#### 5. 单元测试
```
npm run test
```
#### 6. 构建代码
```
npm run build
```

## 四、目录结构
```
- build             [webpack 调试与构建]
- src               [源码]
  └ app             [业务代码]
  └ components      [通用组件]
  └ i18n            [国际化]
  └ redux           [redux 数据流管理]
  └ routes          [路由配置]
  └ templates       [页面模板]
  └ themes          [主题]
    └ default       [默认主题]
      └ global      [全局样式]
        └ classes   [全局样式类]
        └ reset     [样式重置]
      └ utils       [工具]
  └ utils           [工具集合]
  └ entry.js        [入口文件]
- dist              [构建代码]
- test              [单元测试]
```

## 五、业务模块规范
业务模块代码放在：src/app 文件夹下，下面以登录（login）模块为例。

```
- login             [login 模块]
  └ index.js        [login 的入口文件]
  └ theme           [login 的皮肤]
    └ styles        [login 的样式]
      └ index.scss
    └ images        [login 的图片]
  └ components      [login 的相关组件]
  └ utils           [login 的相关工具集合]
  └ i18n            [login 的国际化]
```
## 六、通用组件规范
通用组件放在：src/components 文件夹下，规范和业务模块基本一致，下面以面板（panel）组件为例。
```
- panel             [panel 组件]
  └ index.js        [panel 的入口文件]
  └ theme           [panel 的皮肤]
    └ styles        [panel 的样式]
      └ index.scss
    └ images        [panel 的图片]
  └ components      [panel 的子组件]
  └ utils           [panel 的相关工具集合]
  └ i18n            [panel 的国际化]  
```
## 七、redux action type 常量规范
和 RESTful 的规范相对应，下面以文章（article）模型为例。
```
GET_ARTICLES        [获取文章列表]
GET_ARTICLE         [获取文章详情]
POST_ARTICLE        [新增文章]
PUT_ARTICLE         [修改文章]
DELETE_ARTICLES     [删除一篇或多篇文章]
```
## 未完待续...
