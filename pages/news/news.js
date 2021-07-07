// 新闻类型列表
const newsList = [{
    key: 'top',
    value: '推荐'
  },
  {
    key: 'guonei',
    value: '国内'
  },
  {
    key: 'guoji',
    value: '国际'
  },
  {
    key: 'yule',
    value: '娱乐'
  },
  {
    key: 'tiyu',
    value: '体育'
  },
  {
    key: 'junshi',
    value: '军事'
  },
  {
    key: 'keji',
    value: '科技'
  },
  {
    key: 'caijing',
    value: '财经'
  },
  {
    key: 'shishang',
    value: '时尚'
  },
  {
    key: 'youxi',
    value: '游戏'
  },
  {
    key: 'qiche',
    value: '汽车'
  },
  {
    key: 'jiankang',
    value: '健康'
  },



]
// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList,
    active: 0, // 默认选择第一个
    page: 1, // 第一页
    page_size: 10, // 每页显示10条数据
    dataList: [], // 获取到的数据列表
    type: 'top', // 新闻类型,默认是推荐
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataList(this.data.type) // 默认获取推荐列表
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
   * 
   * @param {tab页切换的时候} event 
   */
  onChange(event) {
    console.log(event)
    const type = event.detail.name;
    this.setData({
      dataList: [], // 清空dataList里面的数据
      type: type, // 赋值新闻类型
      page: 1 // 重新赋值为第一页
    })
    this.getDataList(type) //获取切换的新闻列表
  },

  /**
   * 获取不同类型的新闻
   * @param {*} type 新闻类型
   */
  getDataList(type) {
    let that = this
    wx.showLoading({
      title: '正在加载中。。',
    })
    const key = '797841ef1c1b82296576f0519142d714'
    wx.request({
      url: `http://v.juhe.cn/toutiao/index?type=${type}&key=${key}&page=${that.data.page}&page_size=${that.data.page_size}`,
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
                // that.setData({
                //   show: false // 不显示
                // })
              }
            })
          } else {
            let data = res.data.result.data
            that.setData({
              dataList: that.data.dataList.concat(data)
            })
          }
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.reason,
            success: function (res) {
              that.setData({
                show: false // 不显示
              })
            }
          })
        }
      }
    })
  },
  /**
   * 滚动到最底部进行触发
   * @param {*} e 
   */
  lower(e) {
    if (this.data.page === 50) { // 最大是50页
      return
    }
    this.setData({
      page: ++this.data.page // page页+1
    })
    this.getDataList(this.data.type) // 获取下一页列表
    console.log('滚动到最底部进行触发')
  },

  /**
   * 点击当前行的时候触发
   */
  rowClick(e) {
    const uniquekey = e.currentTarget.dataset['id']; //先获取到要传递的参数--id
    wx.navigateTo({
      url: `/pages/newsDetail/newsDetail?e_id=${uniquekey}`
    })
  }

})