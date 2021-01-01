// pages/rate/rate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option: [
      { text: '人民币', value: "CNY" },
      { text: '美元', value: 'USD' },
      { text: '欧元', value: 'EUR' },
      { text: '英镑', value: 'GBP' },
      { text: '港币', value: 'HKD' },
      { text: '新台币', value: 'TWD' },
      { text: '澳门元', value: 'MOP' },
      { text: '林吉特', value: 'MYR' },
      { text: '俄罗斯卢布', value: 'RUB' },
      { text: '澳元', value: 'AUD' },
      { text: '加元', value: 'CAD' },
      { text: '日元', value: 'JPY' },
      { text: '韩元', value: 'KRW' },
      { text: '泰铢', value: 'THB' },
      { text: '瑞士法郎', value: 'CHF' },
      { text: '新加坡元', value: 'SGD' },
      { text: '新西兰元', value: 'NZD' },
    ],
    value1: 'CNY', // 默认显示 CNY
    value2: 'USD', // 默认显示 USD
    show: false, // 是否显示详细信息
    getdata: {} // 获取的接口中的数据
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
  onShareAppMessage: function () {

  },
  // 起始货币下拉项发生改变时候触发
  onSwitch1Change({detail}){ // vant框架对象中解构出来的固定的字段名称
    this.setData({value1:detail})
  },
  // 目标货币下拉项发生改变时触发
  onSwitch2Change({detail}){
    this.setData({value2:detail})
  },

   /**
   *用户点击获取数据事件 
   */
  getdata: function (e) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    // 请求数据
    wx.request({  
      // url: "https://www.zhaotool.com/v1/api/huobi/e10adc3949ba59abbe56e057f20f883e/" + that.data.value1+"/"+that.data.value2,
      // 聚合api
      url: "http://op.juhe.cn/onebox/exchange/currency?key=64f107d3733d9dd35fd0a1b14bc90312&from=" + that.data.value1+"&to="+that.data.value2,
      data: {
      },
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
  }
})