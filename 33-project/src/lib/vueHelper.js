import api from '../api/index'
import store from '../vuex/store'
import router from '../router'

export const doLogin = (that, data) => {
  api.login(data)
    .then(res => {
      console.log(res)
      if (res.data.code === 0) {
        localStorage.setItem('user', JSON.stringify(res.data.result))
        store.dispatch('token', res.data.token)
        store.dispatch('user', res.data.user)
        showMsg(that, true, '登录成功', 'success')
        router.push({name: 'MineCenter', params: res.data.result})
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export const showMsg = (that, close, msg, type) => {
  that.$message({
    showClose: close,
    message: msg,
    type: type
  })
}

export const doLogout = (that, data) => {
  localStorage.removeItem('user')
  store.dispatch('user', null)
}

export const transformPhone = (that, data) => {
  let mobileS = data
  let arr = mobileS.split('')
  arr[3] = '*'
  arr[4] = '*'
  arr[5] = '*'
  arr[6] = '*'
  return arr.join('')
}
