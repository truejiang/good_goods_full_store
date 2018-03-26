// pages/goods/goodsDetail.js
const app = getApp()

// 模拟的基础倒计时时间
let time = 172800 * (Math.random() + 1)
// 用户信息
let userInfo = null
import util from '../../utils/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {},
    countDownTime: time,
    userInfo: userInfo,
    swiperImgUrls:[],
    currentSwiperImgUrl:null,
    detailImgUrls:[],
    currentDetailImgUrls: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getUserInfo({
      success(res) {
        userInfo = res.userInfo
        that.setData({
          userInfo: userInfo
        })
        console.log(that.data)        
      }
    })
    wx.setNavigationBarTitle({
      title: '商品详情',
    })
    this.setData({
      goods: app.globalData.currentGoods,
      countDownTime: util.formatCountDown(time),
      swiperImgUrls: app.globalData.currentGoods.detail.swiperimg,
      detailImgUrls: app.globalData.currentGoods.detail.detailimg
    })
    setInterval(()=>{
      that.countdown()
    },1000)
  },
  /** 活动结束倒计时 */
  countdown () {
    this.setData({
      countDownTime: util.formatCountDown(time)
    })
    time--
  },
  /** 初始化页面预览图片链接 */
  initImgUrls () {
    // this.setData({
    // 直接写在了onload里
    // })
  },
  /** 预览图片 */
  previewImages (event) {
    let currenturl = event.currentTarget.dataset.currenturl
    let urls = event.currentTarget.dataset.urls
    util.previewImage(currenturl, urls)
  }
})