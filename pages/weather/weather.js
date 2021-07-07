// pages/weather/weather.js

var model = require('../../model/model.js') // 引入js文件

var show = false;
var item = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      show: show
    },
    currentarea: "未知", // 当前所在的区域名称 --- 后期改为 currentarea
    liveweather: { // 湿度 降水量 风向 风力...

    },
    three: [] // 未来三天的天气状况
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { // 刚一开始打开这个界面进行加载，默认获取当前所在地的天气
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        wx.request({ // 主要用来获取 当前天气的一些参数信息： 湿度 降水量 风向...
          url: 'https://free-api.heweather.com/s6/weather/now?key=9aab750e479648829ea03e5646a3bc36&location=' + longitude + ',' + latitude,
          data: {},
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(JSON.stringify(res))
            var currentarea = res.data.HeWeather6[0].basic.admin_area + " " + res.data.HeWeather6[0].basic.parent_city + " " + res.data.HeWeather6[0].basic.location
            that.setData({
              currentarea: currentarea,
              liveweather: res.data.HeWeather6[0].now // 主要用来获取 湿度 降水量 风向
            })
            wx.request({ // 获取未来三天的天气情况
              url: 'https://free-api.heweather.com/s6/weather/forecast?key=9aab750e479648829ea03e5646a3bc36&location=' + longitude + ',' + latitude,
              data: {},
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res1) {
                wx.hideLoading();
                that.setData({
                  three: res1.data.HeWeather6[0].daily_forecast // 拿到未来三天的天气数据
                })
              }
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //生命周期函数--监听页面初次渲染完成
  onReady: function (e) {
    var that = this;
    //请求数据- 0 省份数据
    model.updateAreaData(that, 0, e);
  },
  //点击选择城市按钮显示picker-view
  translate: function (e) {
    model.animationEvents(this, 0, true, 400); // 显示选择城市的下拉框
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    model.animationEvents(this, 200, false, 400); // 隐藏城市下拉框
    let id = e.currentTarget.dataset['id']; // 获取自定义的参数 
    if (id === '555') { // 代表取消，则不继续向下执行
      return
    }
    console.log('this.data.item', this.data.item)
    var length = this.data.item.value[2]; // 拿到区
    var lengthc = this.data.item.value[1]; // 拿到市
    var countyCity = this.data.item.countys[length].name;
    if (countyCity == "市辖区") { // 如果是 市辖区
      countyCity = this.data.item.citys[lengthc].name;
    }
    // 判断是否为 台湾 香港 澳门 需要进行特别处理
    const value = this.data.item.value[0] // 拿到数组里面的第一个值
    if (value === 32 || value === 33) {
      if (value === 32) {
        countyCity = '香港'
      } else {
        countyCity = '澳门'
      }
    }
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    wx.request({ // 获取
      url: 'https://free-api.heweather.com/s6/weather/now?key=9aab750e479648829ea03e5646a3bc36&location=' + countyCity,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(JSON.stringify(res))
        var currentarea = res.data.HeWeather6[0].basic.admin_area + " " + res.data.HeWeather6[0].basic.parent_city + " " + res.data.HeWeather6[0].basic.location
        console.log('输出currentarea', currentarea)
        console.log('输出liveweather', res.data.HeWeather6[0].now)
        that.setData({
          currentarea: currentarea, // 省-市-区
          liveweather: res.data.HeWeather6[0].now // 天气相关
        })
        wx.request({
          url: 'https://free-api.heweather.com/s6/weather/forecast?key=9aab750e479648829ea03e5646a3bc36&location=' + countyCity,
          data: {},
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res1) {
            wx.hideLoading();
            console.log(JSON.stringify(res))
            that.setData({
              three: res1.data.HeWeather6[0].daily_forecast
            })
          }
        })
      }
    })
  },
  //滑动事件
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name
    });
  },
  onReachBottom: function () {},
  nono: function () {},

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
   * 获取天气
   */
  getlive: function (lon, lat) {
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/now?key=9aab750e479648829ea03e5646a3bc36&location=' + lon + ',' + lat,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  getthree: function (lon, lat) {
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/forecast?key=9aab750e479648829ea03e5646a3bc36&location=' + lon + ',' + lat,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})