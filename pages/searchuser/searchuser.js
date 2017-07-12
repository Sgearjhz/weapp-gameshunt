// pages/searchuser/searchuser.js
var config = require('../../config');
Page({
  data: {
    backgroundimg: 1,
    inputuser: 'random',
  },
  InputUser: function (e) {
    this.setData({
      inputuser: e.detail.value
    })
  },
  SearchBtnClick: function () {
    var that = this
    wx.navigateTo({
      url: '../showuser/showuser?psnid=' + that.data.inputuser +'&backgroundimg='+ that.data.backgroundimg
    })
  },
  ChangeBack: function () {
    var that = this
    if (that.data.backgroundimg == 4)
      that.data.backgroundimg = 1
    else
      that.data.backgroundimg += 1
    this.setData({
      backgroundimg: that.data.backgroundimg
    })
  },
})