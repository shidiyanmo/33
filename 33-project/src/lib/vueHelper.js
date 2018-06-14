import api from '../api/index'
import store from '../vuex/store'
import router from '../router'

export const doLogin = (that, data) => {
  api.login(data)
    .then(res => {
      if (res.data.code === 0) {
        localStorage.setItem('user', JSON.stringify(res.data.result))
        store.dispatch('showLogin')
        store.dispatch('token', res.data.token)
        store.dispatch('user', res.data.user)
      }
      console.log('success')
      router.push({name: 'MineCenter', params: res.data.result})
    })
    .catch(() => {
      console.log('error')
    })
}
