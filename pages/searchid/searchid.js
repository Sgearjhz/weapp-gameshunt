// pages/searchid/searchid.js
var config = require('../../config');
 
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    swipperhidden: true,
    loading: true,
    loadinghidden: false,
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: config.service.searchidUrl + options.id +'&region=' + options.region,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //这里就是请求成功后，进行一些函数操作
        console.log(res.data)
        that.setData({
          id: res.data.id,
          name: res.data.name,
          title_name: res.data.title_name,
          release_date: res.data.release_date,
          price: res.data.price,
          platform: res.data.platform,
          provider: res.data.provider,
          gametype: res.data.gametype,
          age_limit: res.data.age_limit,
          rating: res.data.rating == null ? "暂无" : res.data.rating,
          long_desc: res.data.long_desc.replace(/<br>/g, '\n').replace(/<.*?>/g, ''),
        })
        try {
          that.setData({
            "images": [
              {"url": res.data.images[1].url},
              {"url": res.data.images[3].url},
              ],
          })
        }
        catch(error)
        {
          that.setData({
            "images": [
              {"url": res.data.images[1].url},
              {"url": res.data.images[0].url},
              ],
          })
        }
        try {
          that.setData({
            "media": {
              "screenshots": [
                {"url": res.data.media.screenshots[0].url},
                {"url": res.data.media.screenshots[1].url},
                {"url": res.data.media.screenshots[2].url},
              ]
            },
            swipperhidden: false
          })
        }
        catch (error) {
          that.setData({
            swipperhidden: true
          })
        }
        fail: {
        }
      }
    })
    setTimeout(function () {
      that.setData({
        loading: false,
        loadinghidden: true
      });
    }, 1000);
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
})