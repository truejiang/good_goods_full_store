//index.js
//获取应用实例
const app = getApp()

// 商品预售时间轴数据
let goodsTimeLineDatas = [
  {
    time: '昨日',
    flag: -1,
    actived: false,
    isOvertime: true,
    tp: 'yestoday'
  },
  {
    time: '10:00',
    flag: 0,
    actived: false,
    isOvertime: false,
    tp: '10'
  },
  {
    time: '14:00',
    flag: 0,
    actived: false,
    isOvertime: false,
    tp: '14'
  },
  {
    time: '18:00',
    flag: 0,
    actived: false,
    isOvertime: false,
    tp: '18'
  },
  {
    time: '21:00',
    flag: 0,
    actived: false,
    isOvertime: false,
    tp: '21'
  }
]

import util from '../../utils/index'

Page({
  data: {
    swiperList: [],
    goodsTimeLineDatas: goodsTimeLineDatas,
    goodslist: []
  },
  onLoad: function () {
    util.request({
      url: 'https://www.easy-mock.com/mock/5ab0bd512ac92c73b4e55428/goodfull/indexswiper'
    }).then(res => {
      this.setData({
        swiperList: res.data.goodsList
      })
    })
    
    this.checkTimeLineIsOvertime()
  },
  toPage(event) {
    console.log(event.currentTarget.dataset.id)
  },
  toSearchPage() {
    wx.navigateTo({
      url: '../../pages/searchpage/searchpage',
    })
  },
  /* 判断时间轴上的时间和当前时间是否超时 */
  checkTimeLineIsOvertime () {
    let nowH = util.getTime('hour') //当前的小时

    if (nowH < 10) {
      goodsTimeLineDatas[0].actived = true
      this.requestGoodsListData(goodsTimeLineDatas[0].tp)
    } else {
      goodsTimeLineDatas.forEach(
        (ele,index,arr) => {
        if (nowH >= ele.time.split(':')[0]) {
          arr[index - 1].actived =false
          ele.isOvertime = true
          ele.actived = true
          this.requestGoodsListData(ele.tp)
          return
        }
        if (nowH < ele.time.split(':')[0]) {
          ele.isOvertime = false
        }
      })
    }
    this.setData({
      goodsTimeLineDatas: goodsTimeLineDatas
    })
  },
  /* 判断时间轴上nav是否被点中 */
  checkTimeLineIsActive (event) {
    let time = event.currentTarget.dataset.time
    let tp = event.currentTarget.dataset.tp
    this.requestGoodsListData(tp)
    goodsTimeLineDatas.forEach((el) => {
      if (el.time === time) {
        el.actived = true
      } else {
        el.actived = false
      }
    })
    console.log(goodsTimeLineDatas)
    this.setData({
      goodsTimeLineDatas: goodsTimeLineDatas
    })
  },
  /** 加载商品列表数据 */
  requestGoodsListData (tp) {
    let url = null
    switch (tp) {
      case 'yestoday':
        url = 'https://www.easy-mock.com/mock/5ab30a40196746052ecd494b/goodfull_copy/yestodaylist'
        break
      case '10':
        url = 'https://www.easy-mock.com/mock/5ab30a40196746052ecd494b/goodfull_copy/goodsten'
        break
      case '14':
        url = 'https://www.easy-mock.com/mock/5ab30a40196746052ecd494b/goodfull_copy/goodstwopm'
        break
      case '18':
        url = 'https://www.easy-mock.com/mock/5ab30a40196746052ecd494b/goodfull_copy/goodssixpm'
        break
      case '21':
        url = 'https://www.easy-mock.com/mock/5ab30a40196746052ecd494b/goodfull_copy/goodsninepm'
        break
    }
    util.request({
      url: url
    }).then(res=>{
      this.setData({
        goodslist: res.data.goodslist
      })
      console.log(this.data.goodslist)
    })
  },
  /** 跳转推荐好货页面 */
  toRecommedPublish (event) {
    app.globalData.publishCommed = event.currentTarget.dataset.goods
    wx.navigateTo({
      url: '../../pages/recommed/publish/publish',
    })
  },
  /** 跳转商品详情页 */
  toGoodsDetail (event) {
    app.globalData.currentGoods = event.currentTarget.dataset.goods
    wx.navigateTo({
      url: '../../pages/goodsDetail/goodsDetail',
    })
  }
})
