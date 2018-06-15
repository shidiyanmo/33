import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import Login from '@/components/Login'

import MineCenter from '@/components/MineCenter'

import Pay from '@/components/Pay'

import HandleHistory from '@/components/HandleHistory'

import VIPCard from '@/components/VIPCard'

import VIPProtocol from '@/components/VIPProtocol'

import MyIntegral from '@/components/MyIntegral'

import Register from '@/components/Register'

import ConsumptionDetail from '@/components/ConsumptionDetail'

import GetIntegral from '@/components/GetIntegral'

import IntegralHistory from '@/components/IntegralHistory'

import BindWX from '@/components/BindWX'

import BindingWX from '@/components/BindingWX'

Vue.use(Router)

const vueRouter = new Router({
  routes: [
    {
      path: '/',
      name: 'MineCenter',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: MineCenter
    },
    {
      path: '/pay/:phone',
      name: 'Pay',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Pay
    },
    {
      path: '/HandleHistory',
      name: 'HandleHistory',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: HandleHistory
    },
    {
      path: '/VIPCard',
      name: 'VIPCard',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: VIPCard
    },
    {
      path: '/VIPProtocol',
      name: 'VIPProtocol',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: VIPProtocol
    },
    {
      path: '/MyIntegral',
      name: 'MyIntegral',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: MyIntegral
    },
    {
      path: '/ConsumptionDetail',
      name: 'ConsumptionDetail',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: ConsumptionDetail
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register/:type',
      name: 'Register',
      component: Register
    },
    {
      path: '/GetIntegral',
      name: 'GetIntegral',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: GetIntegral
    },
    {
      path: '/IntegralHistory',
      name: 'IntegralHistory',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: IntegralHistory
    },
    {
      path: '/BindWX',
      name: 'BindWX',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: BindWX
    },
    {
      path: '/BindingWX',
      name: 'BindingWX',
      component: BindingWX
    }
  ]
})

export default vueRouter

vueRouter.beforeEach(function (to, from, next) {
  if (!store.state.user && localStorage.getItem('user') && localStorage.getItem('user').length > 0) {
    store.dispatch('user', JSON.parse(localStorage.getItem('user')))
    store.dispatch('token', store.getters.getUser.token)
    // store.state.user = JSON.parse(localStorage.getItem('user'))
    // store.state.token = store.state.user.token
  }
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
})
