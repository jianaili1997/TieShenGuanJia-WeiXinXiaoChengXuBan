// pages/historyTodayDetail/historyTodayDetail.js
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
    const id=options.e_id
    this.getDetail(id)
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
  // 获取详细信息
  getDetail(e_id){
    const that=this
    wx.request({
      url: `http://v.juhe.cn/todayOnhistory/queryDetail.php?key=6c2d67a905ed7f5f36881a3a33c84bda&e_id=${e_id}`,
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
            let data = res.data.result
            that.setData({
              showDeatil: true,
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