// pages/constellation/constellation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    constellation: [{
        text: '白羊座',
        value: '白羊座'
      },
      {
        text: '金牛座',
        value: '金牛座'
      },
      {
        text: '双子座',
        value: '双子座'
      },
      {
        text: '巨蟹座',
        value: '巨蟹座'
      },
      {
        text: '狮子座',
        value: '狮子座'
      },
      {
        text: '处女座',
        value: '处女座'
      },
      {
        text: '天枰座',
        value: '天枰座'
      },
      {
        text: '天蝎座',
        value: '天蝎座'
      },
      {
        text: '射手座',
        value: '射手座'
      },
      {
        text: '摩羯座',
        value: '摩羯座'
      },
      {
        text: '水瓶座',
        value: '水瓶座'
      },
      {
        text: '双鱼座',
        value: '双鱼座'
      },
    ],
    data: {},
    value: '白羊座' // 默认显示数组中的第一个值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 默认获取数组中第一个值的数据
    this.getDataList(this.data.constellation[0].value)
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

  },
  // 查询星座
  change({
    detail
  }) {
    // 调用获取星座的方法
    this.getDataList(detail)
  },
  // 获取数据
  getDataList(consName) {
    let that = this
    wx.showLoading({
      title: '加载中',
    });
    const type = 'today' // 可选项 today,tomorrow,week,month,year 这里暂时先默认写today
    wx.request({
      url: `http://web.juhe.cn:8080/constellation/getAll?key=802565ea48241324de09a3eb7b83320b&consName=${consName}&type=${type}`,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
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
            let data = res.data
            that.setData({
              // show: true,
              data: data
            })
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

})