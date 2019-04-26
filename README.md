# scaffold<br>
react 0.59 + dva + react-navigation 3.6.1 构建的快速开发轮子~

# 支持：<br>
  1.适配沉浸状态栏和刘海屏<br>
  2.装饰器方式关联dva-model<br>
  3.api请求采用apisauce<br>
  4.多语言支持采用i18next<br>
  5.持久化采用redux-persist<br>
  6.支持svg (在temp目录下放入ttf以及svg文件 运行yarn svg 会自动导入安卓端)<br>

# 目录<br>
    
├── common<br>
│   ├── md5.js<br>
│   └── utils.js<br>
├── components<br>
│   ├── aliIcons<br>
│   │   ├── aliIcon.js<br>
│   │   └── nameMap.json<br>
│   ├── AutoHeightImage.js<br>
│   ├── AutoHeightWebView.js<br>
│   ├── EmptyView.js<br>
│   ├── index.js<br>
│   ├── LoadingHOC.js<br>
│   └── Separator.js<br>
├── config<br>
│   ├── dva.js<br>
│   └── ReduxPersist.js<br>
├── language<br>
│   ├── en.js<br>
│   ├── i18n.js<br>
│   └── zh.js<br>
├── models<br>
│   ├── global.js<br>
│   └── index.js<br>
├── net<br>
│   ├── agent.js<br>
│   └── api.js<br>
├── pages<br>
│   ├── home<br>
│   │   ├── home1.js<br>
│   │   ├── home2.js<br>
│   │   └── index.js<br>
│   └── tab<br>
│       ├── tabbar.js<br>
│       └── tabPage.js<br>
├── router<br>
│   └── index.js<br>
├── temp<br>
│   ├── iconfont.svg<br>
│   └── Iconfont.ttf<br>
└── themes<br>
    ├── colors.js<br>
    ├── images<br>
    ├── images.js<br>
    ├── index.js<br>
    ├── metrics.js<br>
    └── styles.js<br>
