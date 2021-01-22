// pages/epidemic/epidemic.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    getdata: {}, // 获取的接口中的数据
    columns: [],
    startCity: '', // 开始城市
    startCityId: '', // 开始城市id
    endCity: '', // 结束城市
    endCityId: '', // 结束城市id
    showPicker: false, // picker组件的显示与隐藏，默认不显示
    status: 1 // 1 开始城市， 2 结束时间
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
  // 输入框获取焦点时
  onFocus(e) {
    let status = e.currentTarget.dataset['status'];
    this.setData({
      showPicker: true, // 显示 picker组件
      status: status
    })
  },
  // 输入框失去焦点时
  onBlur(e) {
    // this.setData({
    //   showPicker: false // 隐藏选择组件 
    // })
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
            that.processData(res.data.result) // 加工拿到的数据
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
  // 下拉项发生改变时，触发
  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    if (index === 0) { // 说明是省发生了改变 若是 1 则是市发生了改变，则不需要执行
      picker.setColumnValues(1, value[0].citys);
    }

  },
  // 点击确定时，触发
  onConfirm(event) {
    this.setData({
      showPicker: false
    })
    console.log(event)
    const {
      value
    } = event.detail
    // console.log(typeof this.data.status) // status 为 string 类型
    if (this.data.status === '1') { // 开始城市
      this.setData({
        startCity: value[0].name + '-' + value[1].name,
        startCityId: value[1].city_id
      })
    } else {
      // 结束城市
      this.setData({
        endCity: value[0].name + '-' + value[1].name,
        endCityId: value[1].city_id
      })
    }

  },
  //  点击取消时，触发
  onCancel(event) {
    this.setData({
      showPicker: false
    })
  },
  // 加工获取到的数据
  processData(data) {
    // -----------------------------------------------
    // 原始数据格式
    // const data=[
    //   {
    //     province_id:'1',province:'北京',citys:[
    //       {
    //         city_id:'1007',city:'北京'
    //       }
    //     ]
    //   }
    // ]
    // // 格式化后的数据格式
    // const data=[
    //   province_id:'1',province:'北京',name:'北京',citys:[ // 因为需要统一绑定name字段
    //   {  city_id:'1007',city:'北京',name:'北京'}
    //   ]
    // ]
    // ----------------------------------------------------------
    data.forEach(provinceItem => {
      provinceItem.name = provinceItem.province
      provinceItem.citys.forEach(cityData => {
        cityData.name = cityData.city
      })
    })
    // 赋值给 columns
    this.setData({
      columns: [{
          values: data,
          className: 'column1',
        },
        {
          values: data[0].citys,
          className: 'column2',
          defaultIndex: 2,
        }
      ],
      show: true // 显示
    })
  },

  // 点击查询
  query() {
    // 如果开始城市或是结束城市没有选择，则不会去查询
    if (!this.data.startCity || !this.data.endCity) {
      return
    }
    var that = this
    // 
    wx.showLoading({
      title: '加载中',
    });
    // 请求数据
    wx.request({
      // 聚合api
      url: `http://apis.juhe.cn/springTravel/query?key=39ef9158b4dcf0ebb83e4cf98cbbcb31&from=${that.data.startCityId}&to=${that.data.endCityId}`,
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
              getdata: res.data.result
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