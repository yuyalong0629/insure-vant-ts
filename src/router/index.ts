import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: '首页', hidden: false },
    component: () => import('@/views/home/Index')
  },
  {
    path: '/surveys',
    name: 'surveys',
    meta: { title: '问卷调查', hidden: false },
    component: () => import('@/views/surveys/Index')
  },
  {
    path: '/payment',
    name: 'payment',
    meta: { title: '支付列表', hidden: false },
    component: () => import('@/views/payment/Index')
  },
  {
    path: '/market',
    name: 'market',
    meta: { title: '销售名片', hidden: false },
    component: () => import('@/views/market/Index')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()

  if (to.meta.title) {
    document.title = `${to.meta.title}`
  }

  if (to.meta.hidden) {
    next({ path: from.fullPath, query: { redirect: to.fullPath } })
    NProgress.done()
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
