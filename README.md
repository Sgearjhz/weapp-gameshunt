#微信小程序 GamesHunt  - Weapp

本项目需要和 [微信小程序 GamesHunt 服务端 - Node.js](https://github.com/Sgearjhz/weapp-gameshunt-sever) 配合一起使用。

- 本地开发环境：`微信web开发者工具v0.18` `VSCode 1.13.1`

## 项目结构

```
GameHunt
├── README.md
├── app
├── config.js
├── pages
│   ├── index
│   ├── list
│   ├── searchid
│   ├── showuser
│   ├── searchname
│   └── searchuser
└── utils
```

其中，`config.js` 配置了腾讯云解决方案分配的域名。

`pages/` 目录包含了小程序的所有页面：

```
// 封面到各个页面路由关系
index   =>  list        =>  searchid
        =>  searchname  =>  searchid
        =>  searchuser  =>  showuser  =>  searchname

// 【游戏列表】--显示4个数据库超过10000个游戏的信息，可以按照不同规则排序查看，点击游戏封面或名称可进入【游戏详细信息】界面
pages/list

// 【搜索游戏名称】--支持不同语言对游戏名进行模糊搜索，目前对繁体中文支持问题暂未解决，点击游戏封面或名称可进入【游戏详细信息】界面
pages/searchname

// 【游戏详细信息】--根据游戏id通过索尼PSS商城API获取游戏详细信息，包括高清封面、游戏截图、详细描述等等
pages/searchid

// 【搜索玩家psnid】--不进行输入可以随机搜索，更换背景按钮可以改变玩家卡界面的背景，点击搜索可进入【玩家卡】界面
pages/searchuser

// 【玩家卡】--显示玩家虚拟形象、等级排名、奖杯信息以及最近玩过的游戏，点击游戏可进入【搜索游戏名称】界面搜索该游戏
pages/showuser
```

本程序本地图片（程序封面图标和玩家卡背景）通过 [WeCOS——微信小程序 COS 瘦身解决方案](https://github.com/tencentyun/wecos) 瘦身上传至云端.
