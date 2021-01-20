// pages/epidemic/epidemic.js

const citys = {
  浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  福建: ['福州', '厦门', '莆田', '三明', '泉州'],
};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    getdata: {}, // 获取的接口中的数据
    columns: [{
        values: Object.keys(citys),
        className: 'column1',
      },
      {
        values: citys['浙江'],
        className: 'column2',
        defaultIndex: 2,
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取可以查询的城市列表
    this.getCity()
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


  /**
   * 获取支持查询的城市
   */
  getCity() {
    var that = this
    wx.showLoading({
      title: '加载中',
    });
    // 请求数据
    wx.request({
      // 聚合api
      url: 'http://apis.juhe.cn/springTravel/citys?key=39ef9158b4dcf0ebb83e4cf98cbbcb31',
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
              // content: "暂无数据",
              content: res.data.reason,
              success: function (res) {
                that.setData({
                  show: false
                })
              }
            })
          } else {
            that.setData({
              show: true,
              getdata: res.data.result[0] // 取数组里面的第一组数；第二组数为相反的汇率转换
            })
          }

        } else {
          wx.showModal({
            title: '提示',
            content: res.data.reason,
            success: function (res) {
              that.setData({
                show: false
              })
            }
          })
        }
      }

    })
  },

  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    picker.setColumnValues(1, citys[value[0]]);
  },
})