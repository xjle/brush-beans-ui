import hotReload from '@/utils/hotReload'

import checkVersion from '@/utils/checkVersion'

hotReload()

checkVersion()
// eslint-disable-next-line no-undef
// const pluginId = chrome.runtime.id
console.log('这是背景页')
// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.id === 'getCookies') {
    const obj = {}
    // eslint-disable-next-line no-undef
    chrome.cookies.getAll({ url: 'https://home.m.jd.com/' }, (cookies) => {
      cookies.filter(function (item) {
        if (item.name === 'pt_key' || item.name === 'pt_pin') {
          obj[item.name] = item.value
        }
        return (item.name === 'pt_key' || item.name === 'pt_pin')
      })
      sendResponse(JSON.stringify(obj))
    })
  } else if (req.id === 'clearCookies') {
    // eslint-disable-next-line no-undef
    chrome.cookies.getAll({ url: 'https://home.m.jd.com/' }, (cookies) => {
      for (let i = 0; i < cookies.length; i++) {
        const item = cookies[i]
        // eslint-disable-next-line no-undef
        chrome.cookies.remove({ url: 'https://home.m.jd.com/', name: item.name })
      }
      sendResponse(JSON.stringify("{'msg':'操作成功','code': '200'}"))
    })
  }
  // 因为chrome.runtime.onMessage.addListener内部使用了chrome.cookies.getAll，导致通信中断，所以添加return true
  return true
})
// /management
// eslint-disable-next-line no-undef
chrome.runtime.onInstalled.addListener(function (info) {
  //  eslint-disable-next-line no-undef
  chrome.tabs.create({ url: 'https://test.negev.cn/course', selected: true })
})
// eslint-disable-next-line no-undef
console.log()
