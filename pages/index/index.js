// pages/index/index.js
const common = require('../../common/menu-items')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [{
      img: "../../images/EmptyBanner.jpg",
      openpath: "../../pages/figure/figure"
    }, {
      img: "../../images/EmptyBanner1.jpg",
      openpath: "../../pages/bankQuery/bankQuery"
    }, {
      img: "../../images/EmptyBanner2.jpg",
      openpath: "../../pages/IDCard/IDCard"
    }, {
      img: "../../images/EmptyBanner3.jpg",
      openpath: "../../pages/MobileHome/MobileHome"
    }],
    server: [],
    relax: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      server: common.server.slice(0, 12), // 截取数组的前十二个即 0-11
      relax: common.relax.slice(0, 3) // 轻松一刻的数据,这里只要前三个
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})