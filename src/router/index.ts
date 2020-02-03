import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: '家庭保险咨询服务', hidden: false },
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
    meta: { title: '咨询服务计划选择', hidden: false },
    component: () => import('@/views/payment/Index')
  },
  {
    path: '/market',
    name: 'market',
    meta: { title: '规划师名片', hidden: false },
    component: () => import('@/views/market/Index')
  },
  {
    path: '/policy',
    name: 'policy',
    meta: { title: '保单管理', hidden: false },
    component: () => import('@/views/policy/Index')
  },
  {
    path: '/addPolicy',
    name: 'addPolicy',
    meta: { title: '添加电子保单', hidden: false },
    component: () => import('@/views/addPolicy/add')
  },
  {
    path: '/editPolicy',
    name: 'editPolicy',
    meta: { title: '查看电子保单', hidden: false },
    component: () => import('@/views/addPolicy/edit')
  },
  {
    path: '/scheme',
    name: 'scheme',
    meta: { title: '您的专属方案', hidden: false },
    component: () => import('@/views/scheme/Index')
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
