import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import Login from '@/components/Login'
import MineCenter from '@/components/MineCenter'

Vue.use(Router)

const vueRouter = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'MineCenter',
      meta: {
        requiredAuth: true
      },
      component: MineCenter
    }
  ]
})

export default vueRouter

vueRouter.beforeEach(function (to, from, next) {
  if (!store.state.user && localStorage.getItem('user') && localStorage.getItem('user').length > 0) {
    store.state.user = JSON.parse(localStorage.getItem('user'))
    store.state.token = store.state.user.token
  }
  console.log(store.state.token)
  // console.log(localStorage.getItem('user'))
  // console.log(localStorage.getItem('user').length > 0)
  // alert('11')
  if (to.meta.requiredAuth) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
