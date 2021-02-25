// pages/historyToday/historyToday.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    show: false,
    data: [],
    showDeatil: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date()
    const that = this
    date = that.formatDate(date) // 格式化日期
    that.getData(date) // 默认获取当天的 月/日 的数据
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
  onDisplay() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    let that = this
    const date = this.formatDate(event.detail)
    that.getData(date)
  },
  // 获取数据
  getData(date) {
    const that = this
    this.setData({
      show: false,
      date: date,
    });
    // 去调用接口获取今天的大事件
    wx.request({
      url: `http://v.juhe.cn/todayOnhistory/queryEvent.php?key=6c2d67a905ed7f5f36881a3a33c84bda&date=${date}`,
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
  // 当前行的点击
  rowClick(e) {
    let id = e.currentTarget.dataset['id']; //先获取到要传递的参数--id
    wx.navigateTo({
      url: `/pages/historyTodayDetail/historyTodayDetail?e_id=${id}`
    })
  },
})