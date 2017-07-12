// pages/list/list.js
var config = require('../../config');
Page({
  data: {
    goodslist: [],
    array: ['香港', '中国', '日本', '美国'],
    arrayDQ: ['HK', 'CN', 'JP', 'US'],
    array1: [' 港币', ' 人民币', ' 日元', ' 美元'],
    index: 0,
    region: 'HK',
    word: false,
    errorword : '请选择游戏地区并输入游戏名称',
    inputpage : 1,
    scrollTop: 0,
  },
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value
    });
  },
  InputName: function (e) {
    this.setData({
      inputname: e.detail.value
    })
  },
  ChangePage: function () {
    var that = this
    this.setData({
      inputpage: that.data.inputpage + 1,
    });
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.ShowList()
    this.goTopFun()
  },
  ChangePageback: function () {
    var that = this
    if (that.data.inputpage != 1) {
      this.setData({
        inputpage: that.data.inputpage - 1,
      });
    }
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.ShowList()
    this.goTopFun()
  },
  aplChange: function () {
    var that = this
    this.setData({
      inputpage: 1,
    });
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.ShowList()
  },
  ShowList: function () {
    var that = this
    that.data.region = that.data.arrayDQ[that.data.index]
    wx.request({
      url: config.service.searchnameUrl + that.data.inputname + '&region=' + that.data.region + '&page=' +that.data.inputpage,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //这里就是请求成功后，进行一些函数操作
        console.log(res.data)
        if (res.data.datas[0] != null){
          that.setData({
            word : true,
            errorword: '请选择游戏地区并输入游戏名称'
          })
        }
        else{
          that.setData({
            word: false,
            errorword: '无法在该游戏区匹配到相应游戏请尝试更换游戏区或输入正确的游戏名称'
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
          goodslist: that.data.goodslist
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
    if (options.name!=null)
    {
        this.setData({
        inputname: options.name,
        region: options.region,
        index: 2
      });
      this.ShowList()
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    console.log('--------下拉刷新-------')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    if (that.data.inputpage != 1) {
      this.setData({
        inputpage: that.data.inputpage - 1,
      });
    }
    this.ShowList()
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