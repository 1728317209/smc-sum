## 简介

基于 Ice 前后端分离的项目；前端使用 React 技术栈，后端使用 Koa 2.x 作为服务端开发框架，使用 mongodb 存储数据。

## 目录结构

目录结构采用分层设计，主体分为 client 和 server 两部分，即 client 对应前端工程，server 对应服务端工程，提供 RESTful API 和 client 端进行数据通信；


```
project
├── client
│     ├── build     // 构建后的前端静态资源，Node 服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下。
│     │    ├── index.html
│     │    ├── css
│     │    └── js
│     ├── src       // 资源目录
│     │    ├── components       // 公共组件
│     │    ├── layouts          // 通用布局
│     │    ├── pages            // 页面
│     │    ├── menuConfig.js    // 导航配置
│     │    ├── routerConfig.js  // 路由配置
│     │    ├── router.js        // 路由入口
│     │    ├── index.html
│     │    ├── favicon.png
│     │    └── index.js         // 入口文件
|     ├── package.json          // 前端 package.json
|     ├── .gitignore            // git 忽略目录配置
|     ├── .editorconfig         // 代码风格配置
|     ├── .eslintignore         // eslint 忽略目录配置
|     ├── .eslintrc             // eslint 配置
|     └── .webpackrc.js         // 自定义 webpack 配置
|
├── server
|     ├── package.json          // 服务端 package.json
|     ├── .gitignore            
|     ├── .editorconfig         
|     ├── .eslintignore         
|     ├── .eslintrc             
|     └── src
|          ├── config           // 配置文件
|          ├── controller       // 用于解析用户的输入，处理后返回相应的结果
|          ├── middleware       // 用于编写中间件
|          ├── model            // 用于放置模型
|          ├── router           // 用于路由文件
|          └── app.js           // 入口文件
|
├── package.json           // package.json
└── README.md              // 项目说明
```

### client

client 用于组织前端工程资源，包括 HTML、CSS、JavaScript 等和 UI 相关的代码。

### server

server 用于组织服务端的相关的代码，即常见的 MVC 的组织方式。

#### 配置

公共配置包含代码风格、eslint 等基础配置，在整个应用中，前后端各自使用一套基础配置。  

#### 使用

npm run preInstall  
npm start
