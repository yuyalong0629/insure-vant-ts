import Vue from 'vue'
import 'amfe-flexible/index.js'
import 'normalize.css'
import './defaultSettings'
import VueLazyload from 'vue-lazyload'
import animated from 'animate.css'
import Storage from 'vue-ls'

const options = {
  namespace: 'insure__', // key键前缀
  name: 'ls', // 命名Vue变量.[ls]或this.[$ls],
  storage: 'local' // 存储名称: session, local, memory
}

Vue.use(VueLazyload)
Vue.use(animated)
Vue.use(Storage, options)
