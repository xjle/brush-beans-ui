/* eslint-disable no-undef */
// 这是content_script
import Vue from 'vue'
import store from '../store'
import App from '../App.vue'
import '../plugins/elementui'

console.log('挂载brush index')
const func = setInterval(() => {
  // 插入京东首页
  if ($('.box_wrapper').length && $('#bursh-app-id').length) {
    new Vue({
      render: h => h(App)
    }).$mount('#bursh-app-id')
    clearInterval(func)
  } else {
    // prepend
    $('.box_wrapper').before('<div id="bursh-app-id"></div>')
  }
  // 插入京东个人页面
  if ($('.my_order').length && $('#bursh-app-id').length) {
    new Vue({
      store,
      render: h => h(App)
    }).$mount('#bursh-app-id')
    $('#id-pcprompt-mask').css({ display: 'none' })
    clearInterval(func)
  } else {
    // prepend
    $('.my_order').before('<div id="bursh-app-id"></div>')
  }
}, 1000)

// function joinContent () {
//   const div = document.createElement('div')
//   div.id = 'joinContentApp'
//   document.body.appendChild(div)

// }
// 该方法向页面注入可操作原页面的js文件
// injectJsInsert()
// function injectJsInsert () {
//   document.addEventListener('readystatechange', () => {
//     const injectPath = 'js/inject.js'
//     const script = document.createElement('script')

//     script.setAttribute('type', 'text/javascript')
//     script.src = chrome.extension.getURL(injectPath)
//     // script.src = injectPath
//     document.body.appendChild(script)
//   })
// }
