/**
 * 放置公共的常量数据
 */

// 开启严格模式 其实不用 ES6的export时默认开启严格模式
'use strict'

/**
 * 默认接口出错弹窗文字
 * @type String
 */
const defaultAlterMessage = '好像出了点小问题~请再试一次'

/**
 * 默认分享文案
 * @type {title: stirng}
 */
const defaultShareTitle = {
  title: '陈升宝茶叶平台'
}

/**
 * 小程序默认标题栏文字
 * @type {string}
 */
const defaultBarTitle = {
  title: '陈升宝'
}

let core = {
  defaultAlterMessage: defaultAlterMessage,
  defaultShareTitle: defaultShareTitle['title'],
  defaultBarTitle: defaultBarTitle['title']
}

export default core