// pages/recommed/recommed.js
const app = getApp()
let userInfo = null
import util from '../../utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: userInfo,
    defaultShopWelcomeMsg: '我的小店开业啦！都是好货，开始剁手吧！',
    viewRecord: null,
    recommedGoodsList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadViewRecord()
    this.loadRecommedGoodsList()
    let that = this
    wx.getUserInfo({
      success(res) {
        userInfo = res.userInfo
        that.setData({
          userInfo: userInfo
        })
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
  
  },
  loadViewRecord () {
    util.request({
      url: "https://www.easy-mock.com/mock/5ab30a40196746052ecd494b/goodfull_copy/view-recored"
    }).then((res)=>{
      if(res) {
        this.setData({
          viewRecord:res.data.userList
        })
      }
    })
  },
  loadRecommedGoodsList () {
    util.request({
      url: "https://www.easy-mock.com/mock/5ab30a40196746052ecd494b/goodfull_copy/recommend_goods_list"
    }).then((res) => {
      this.setData({
        recommedGoodsList: res.data.goodsList
      })
    })
  }
})