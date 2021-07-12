// pages/newsDetail/newsDetail.js
var WxParse = require('../wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.e_id // 获取上个界面传过来的值
    this.getDetail(id)
  },
  /**
   * 获取新闻的详细信息
   * @param {*} id 
   */
  getDetail(id) {
    const that = this
    wx.request({
      url: `http://v.juhe.cn/toutiao/content?key=797841ef1c1b82296576f0519142d714&uniquekey=${id}`,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('输出获取到的详情新闻', res)
        wx.hideLoading();
        if (res.statusCode == 200) {
          if (res.data.result === null) {
            wx.showModal({
              title: '提示',
              content: res.data.reason,
              success: function (res) {
                // that.setData({
                //   show: false // 不显示
                // })
              }
            })
          } else {
            // let data = res.data.result
            let data = res.data.result.content
            const detail = res.data.result.detail
            that.setData({
              showDeatil: true,
              data: detail
            })
            console.log('输出获取到的data', data)
            WxParse.wxParse('article', 'html', data, that, 5);
          }
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.reason,
            success: function (res) {
              // that.setData({
              //   show: false // 不显示
              // })
            }
          })
        }
      }
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