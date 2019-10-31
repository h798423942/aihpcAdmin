// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/aihpc/hpclist',
    children: [
      {
        path: '/aihpc',
        name: 'aihpc',
        redirect: '/aihpc/hpclist/',
        component: RouteView,
        meta: { title: 'AI超算平台', keepAlive: true, icon: bxAnaalyse, requireAuth: true },
        children: [
          {
            path: '/aihpc/hpclist',
            name: 'hpclist',
            component: () => import('@/views/area/AreaList'),
            meta: { title: '超算中心列表', requireAuth: true }
          }
          // {
          //   path: '/aihpc/hpcdetail',
          //   name: 'hpcdetail',
          //   hidden: true,
          //   // hideChildrenInMenu: true,
          //   component: () => import('@/views/aihpc/HpcDetail'),
          //   meta: { title: '作业详情', requireAuth: true }
          // }
        ]
      }
    ]
  },
  {
    path: '/newPage',
    name: 'newPage',
    component: BlankLayout,
    redirect: '/newPage/buy',
    meta: { title: '购买' },
    children: [
      {
        path: '/newPage/buy',
        name: 'buy',
        component: () => import('@/views/buy/Buy'),
        meta: { title: '购买', keepAlive: true, icon: bxAnaalyse, requireAuth: false }
      },
      {
        path: '/newPage/index',
        name: 'hpcindex',
        component: () => import('@/views/hpc-index/HpcIndex'),
        meta: { title: '首页', keepAlive: true, icon: bxAnaalyse, requireAuth: false }
      }
    ]
  },
  {
    path: '*', redirect: '/', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },
  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]

/**
 * 管理后台路由
 */
export const adminRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/applicationtype/appliationList',
    children: [
      {
        path: '/applicationtype',
        name: 'application',
        redirect: '/applicationtype/appliationList',
        component: RouteView,
        meta: { title: '后台管理', keepAlive: true, icon: bxAnaalyse, requireAuth: true },
        children: [
          {
            path: '/applicationtype/appliationList',
            name: 'appliationList',
            component: () => import('@/views/admin/ApplicationType'),
            meta: { title: '应用分类列表', keepAlive: true, requireAuth: true }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]
