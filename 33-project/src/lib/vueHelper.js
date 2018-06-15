import api from '../api/index'
import store from '../vuex/store'
import router from '../router'

export const doLogin = (that, data) => {
  api.login(data)
    .then(res => {
      if (res.data.code === 0) {
        localStorage.setItem('user', JSON.stringify(res.data.result))
        store.dispatch('token', res.data.result.token)
        store.dispatch('user', res.data.result)
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
  router.push('/Login')
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

export const doRegister = (that, data) => {
  api.register(data)
    .then(res => {
      if (res.data.code === 0) {
        showMsg(that, true, '注册成功', 'success')
      } else {
        showMsg(that, true, res.data.msg, 'error')
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export const sendCaptcha = (that, data) => {

}
