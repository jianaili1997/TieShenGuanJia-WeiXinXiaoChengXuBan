// pages/courier/courier.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company: [{
        text: '申通',
        value: 'shentong'
      },
      {
        text: 'EMS',
        value: 'ems'
      },
      {
        text: '顺丰',
        value: 'shunfeng'
      },
      {
        text: ' 圆通',
        value: 'yuantong'
      },
      {
        text: '中通',
        value: 'zhongtong'
      },
      {
        text: ' 韵达',
        value: 'yunda'
      },
      {
        text: ' 天天',
        value: 'tiantian'
      },
      {
        text: ' 汇通',
        value: 'huitongkuaidi'
      },
      {
        text: ' 全峰',
        value: 'quanfengkuaidi'
      },
      {
        text: ' 德邦',
        value: 'debangwuliu'
      },
      {
        text: ' 宅急送',
        value: 'zhaijisong'
      }
    ],
    show: false,
    value: 'shentong', // 默认显示申通
    orderNo: '', // 快递单号
    getdata: {} // 获取到的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage: function () {},

  /**
   * 下拉框值发生改变时
   */
  change({
    detail // 解构里面的detail
  }) {
    this.setData({
      value: detail
    })
  },
  // 获取快递信息
  getMsg() {
    const that = this
    if (this.data.orderNo === '') {
      wx.showModal({
        title: '提示',
        content: '请输入快递单号'
      })
      return
    }
    wx.showLoading();
    // 请求数据
    wx.request({
      url: `http://www.kuaidi100.com/query?type=${this.data.value}&postid=${this.data.orderNo}`,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading();
        if (res.data.status === '200') {
          that.setData({
            show: true,
            getdata: res.data
          })

        } else {
          wx.showModal({
            title: '提示',
            content: res.message,
            success: function (res) {
              that.setData({
                show: false
              })
            }
          })
        }
      }
    })
  }

})