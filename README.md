# scaffold
react 0.59 + dva + react-navigation 3.6.1 构建的快速开发轮子~

# 支持：
  1.适配安卓沉浸状态栏和刘海屏
  2.装饰器方式关联dva-model
  3.api请求采用apisauce
  4.多语言支持采用i18next
  5.持久化采用redux-persist
  6.支持svg (temp目录下放入ttf以及svg文件 运行yarn svg 会自动导入带安卓端)

# 目录
    
├── common
│   ├── md5.js
│   └── utils.js
├── components
│   ├── aliIcons
│   │   ├── aliIcon.js
│   │   └── nameMap.json
│   ├── AutoHeightImage.js
│   ├── AutoHeightWebView.js
│   ├── EmptyView.js
│   ├── index.js
│   ├── LoadingHOC.js
│   └── Separator.js
├── config
│   ├── dva.js
│   └── ReduxPersist.js
├── language
│   ├── en.js
│   ├── i18n.js
│   └── zh.js
├── models
│   ├── global.js
│   └── index.js
├── net
│   ├── agent.js
│   └── api.js
├── pages
│   ├── home
│   │   ├── home1.js
│   │   ├── home2.js
│   │   └── index.js
│   └── tab
│       ├── tabbar.js
│       └── tabPage.js
├── router
│   └── index.js
├── temp
│   ├── iconfont.svg
│   └── Iconfont.ttf
└── themes
    ├── colors.js
    ├── images
    ├── images.js
    ├── index.js
    ├── metrics.js
    └── styles.js
