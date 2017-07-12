// pages/list/list.js
var config = require('../../config');
Page({
  data: {
    goodslist: [],
    array: ['香港', '中国', '日本', '美国'],
    arrayDQ: ['HK', 'CN', 'JP', 'US'],
    arrayob: ['默认', '价格降序', '价格升序', '名字降序', '名字升序', '发行降序', '发行升序'],
    arrayorderTP: ['defult_order&order=ASC', 'price&order=DESC', 'price&order=ASC', 'name&order=DESC', 'name&order=ASC', 'date&order=DESC', 'date&order=ASC',],
    array1: [' 港币', ' 人民币', ' 日元', ' 美元'],
    index: 0,
    indexob: 0,
    region: 'HK',
    ob: 'defult_order&order=ASC',
    nowpage : 1,
    word:true,
    errorword: '已没有更多的游戏请上拉返回上一页',
    scrollTop: 0,
    inputpage: null,
    showvalue: "",
  },
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value,
      inputpage: 1,
      nowpage: 1,
    });
    this.ChangeList()
  },
  Pickerob: function (e) {
    //改变indexob值，通过setData()方法重绘界面
    this.setData({
      indexob: e.detail.value,
      inputpage: 1,
      nowpage: 1,
    });
    this.ChangeList()
  },

  InputPage: function (e) {
    this.setData({
      inputpage: parseInt(e.detail.value),
      aplpage : parseInt(e.detail.value)
    })
  },
  aplChange: function (e) {
    var that = this
    if (that.data.aplpage != 0)
      this.setData({
        inputpage: that.data.aplpage,
        showvalue: "",
      })
    this.ChangeList()
  },
  ChangePageback: function () {
    var that = this
    if (that.data.nowpage != 1) {
      this.setData({
        inputpage: that.data.nowpage - 1,
        showvalue: "",
      });
    }
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.ChangeList()
    this.goTopFun()
  },
  ChangePage: function () {
    var that = this
    this.setData({
      inputpage: that.data.inputpage + 1,
      showvalue: "",
    });
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.ChangeList()
    this.goTopFun()
  },
  ChangeList: function () {
    var that = this
    that.data.region = that.data.arrayDQ[that.data.index]
    that.data.ob = that.data.arrayorderTP[that.data.indexob]
    wx.request({
      url: config.service.listURL + 'page=' + that.data.inputpage + '&region=' + that.data.region + '&ob=' + that.data.ob,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //这里就是请求成功后，进行一些函数操作
        console.log(res.data)
        if (res.data.datas[0] != null) {
          that.setData({
            word: true,
          })
        }
        else{
          that.setData({
            word: false,
          })
        }
        that.data.goodslist = []
        for (var i = 0; i < res.data.datas.length; i++) {
          that.data.goodslist[i] = {
            id: res.data.datas[i].id,
            imgUrl: res.data.datas[i].images,
            name: res.data.datas[i].name,
            platform: res.data.datas[i].platform,
            gametype: res.data.datas[i].gametype,
            date: res.data.datas[i].release_date,
            language: res.data.datas[i].language,
            price: res.data.datas[i].price + that.data.array1[that.data.index],
            region: that.data.region,
          }
        }
        that.setData({
          goodslist: that.data.goodslist,
          nowpage : that.data.inputpage,
        })
        fail: {
        }
      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      inputpage: 1,
    });
    this.ChangeList()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    console.log('--------下拉刷新-------')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    if (that.data.nowpage != 1){
    this.setData({
      inputpage: that.data.nowpage - 1,
    });
    }
    this.ChangeList()
  },  
  /**
   * 返回页面顶部
   */
  goTopFun: function (e) {
    var _top = this.data.scrollTop;//发现设置scroll-top值不能和上一次的值一样，否则无效，所以这里加了个判断  
    if (_top == 1) {
      _top = 0;
    } else {
      _top = 1;
    }
    this.setData({
      'scrollTop': _top
    });
    console.log("----");
    console.log(this.data.scrollTop)
  }  
})