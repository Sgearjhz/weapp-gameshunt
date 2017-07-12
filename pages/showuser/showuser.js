// pages/showuser/showuser.js
var config = require('../../config');
Page({
  data: {
    backgroundimg: 0,
    inputuser: '',
    psnid: '',
    ava: '',
    platinum: '',
    gold: '',
    silver: '',
    bronze: '',
    total_trophy: '',
    level: '',
    rank: '',
    total_game: '',
    perfect: '',
    rate: '',
    games1: [
      { game: '', img: '' },
      { game: '', img: '' },
      { game: '', img: '' },
      { game: '', img: '' },
    ],
    games2: [
      { game: '', img: '' },
      { game: '', img: '' },
      { game: '', img: '' },
      { game: '', img: '' },
    ],
    swiper: {
      image: ['c0', 'c1', 'c2'],
      indicatorDots: true,
      vertical: false,
      autoplay: false,
      interval: 2000,
      duration: 500
    }
  },
  onLoad: function (options) {
    var that = this
    that.data.backgroundimg = options.backgroundimg
    wx.request({
      url: config.service.searchuserUrl + options.psnid,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //这里就是请求成功后，进行一些函数操作
        console.log(res.data)
        that.setData({
          backgroundimg: that.data.backgroundimg,
          psnid: res.data.psnid,
          ava: res.data.ava,
          platinum: res.data.platinum,
          gold: res.data.gold,
          silver: res.data.silver,
          bronze: res.data.bronze,
          total_trophy: res.data.total_trophy,
          level: res.data.level,
          rank: res.data.rank,
          total_game: res.data.total_game,
          perfect: res.data.perfect,
          rate: res.data.rate,
          games1: [
            {
              game: res.data.games[0].game,
              img: res.data.games[0].img
            }, {
              game: res.data.games[1].game,
              img: res.data.games[1].img
            }, {
              game: res.data.games[2].game,
              img: res.data.games[2].img
            }, {
              game: res.data.games[3].game,
              img: res.data.games[3].img
            },
          ],
          games2: [
             {
              game: res.data.games[4].game,
              img: res.data.games[4].img
            }, {
              game: res.data.games[5].game,
              img: res.data.games[5].img
            }, {
              game: res.data.games[6].game,
              img: res.data.games[6].img
            }, {
              game: res.data.games[7].game,
              img: res.data.games[7].img
            },
          ]
        })
        fail: {
        }
      }
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onShareAppMessage: function () {
    return {
      title: '游猎',
      desc: '分享你的玩家卡',
      path: './showuser'
    }
  }
})