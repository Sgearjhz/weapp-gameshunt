//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    list: [
      {
        id: 'list',
        name: '游 有 所 列',
        open: false,
        page: 'list'
      },
      {
        id: 'searchname',
        name: '搜 索 游 戏',
        open: false,
        page: 'searchname'
      }, 
      {
        id: 'searchuser',
        name: '玩 家 卡',
        open: false,
        page: 'searchuser'
      },
    ],
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id,
    list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
})
