import config from './config'

// 设置request option的通用参数
const DEFAULT_REQUEST_OPTIONS = {
  url: '',
  data: {},
  header: {
    "Content-Type": "application/json"
  },
  method: 'POST',
  dataType: 'json'
}

let util = {
  /**
   * 封装弹出的 alert 方法
   * @arguments 
   * title 标题，默认值是 提示
   * content 提示内容，默认值是config中设置的默认值 
   */
  alert(title = '提示', content = config.defaultAlterMessage){
    //这里需要判断我们传入的content情况，如果不是指定的格式，则还是继续使用config默认设置的内容
    if('object' === typeof content) {
      content = JSON.stringify(content) || config.defaultAlterMessage
    }
    // 最后将得到值传入小程序自带的showModal中
    wx.showModal({
      title: title,
      content: content,
    })
  },
  /**
   * 封装本地存储数据 setStorageData 和 getStorageData 方法
   * @arguments
   * key type:String 本地缓存中的指定的 key名
   * value type:Object/String 需要存储的内容
   * callback type:function 成功后调用的函数 
   */
  setStorageData(key, value = '', callback) {
    wx.setStorage({
      key: key,
      data: value,
      success: function (res) { 
        callback && callback()
      }
    })
  },
  getStorageData(key, callback) {
    let self = this
    wx.getStorage({
      key: key,
      success (res) {
        callback && callback(res.data)
      },
      fail (err) {
        if (/getStorage:fail/.test(msg)) {
          self.setStorageData(key)
        }
      }
    })
  },
  /**
   * 封装网络请求 request 方法
   * 
   */
  request (opt) {
    let options = Object.assign({}, DEFAULT_REQUEST_OPTIONS, opt)
    let { url, data, header, method, dataType } = options
    let self = this
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        header: header,
        method: method,
        dataType: dataType,
        success(res) {
          if (res && res.statusCode === 200 && res.data) {
            resolve(res.data)
          } else {
            self.alert('提示', res)
            reject(res)
          }
        },
        fail(err) {
          self.log(err)
          self.alert('提示', err)
          reject(err)
        }
      })
    })
  },
  /**
   * 封装获取时间 getTime 方法
   */
  getTime (timetype = 'full') {
    let self = this
    let time = ''
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()

    switch (timetype) {
      case 'hour':
        time = hour
        break
      case 'full':
        time = [year, month, day].map(self.formatNumber).join('/') + ' ' + [hour, minute, second].map(self.formatNumber).join(':')
        break
      default:
        time = [year, month, day].map(self.formatNumber).join('/') + ' ' + [hour, minute, second].map(self.formatNumber).join(':')
        break
    }

    return time
  },
  /**
   * 封装格式化时间个位数的 方法
   */
  formatNumber (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  /**
   * 倒计时格式化
   */
  formatCountDown (time) {
    let self = this
    let day = parseInt(time / 3600 / 24)
    let hour = parseInt((time % (24 * 3600)) / 3600 )
    let minute = parseInt((time % 3600) / 60)
    let second = parseInt(time % 60)

    return `${day}天${self.formatNumber(hour)}:${self.formatNumber(minute)}:${self.formatNumber(second)}`
  },
  /**
   * 预览图片
   */
  previewImage(current, urls) {
    wx.previewImage({
      current: current,
      urls: urls
    })
  }
}

export default util