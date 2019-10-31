import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap, asyncRouterMap, adminRouterMap } from '@/config/router.config'
import { ACCESS_TOKEN, ISADMIN } from '@/store/mutation-types'
import { getStore } from "@/utils/storage"

Vue.use(Router)
// let isAdmin = Vue.ls.get(ISADMIN)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes:  constantRouterMap.concat(asyncRouterMap)
  // routes: getStore('ISADMIN') ? constantRouterMap.concat(adminRouterMap) : constantRouterMap.concat(asyncRouterMap)
})

router.beforeEach((to, from, next) => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (token) { // 判断本地是否存在access_token
      next()
    } else {
      console.info('token:', token)
      next({
        path: '/user'
      })
    }
  } else {
    next()
  }
  /* 如果本地 存在 token 则 不允许直接跳转到 登录页面 */
  if (to.fullPath == "/user") {
    if (token) {
      next({
        path: from.fullPath
      })
    } else {
      next()
    }
  }
})

export default router