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
  let mobileS = data + '' // xxx3
  let arr = mobileS.split('')
  arr[3] = '*'
  arr[4] = '*'
  arr[5] = '*'
  arr[6] = '*'
  return arr.join('')
}

export const handleNeedLogin = (res) => {
  if (res.data.code === 2) {
    doLogout()
  }
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
  api.getCaptcha(data)
    .then(res => { // xxx2
      // handleNeedLogin(res)
      let code = res.data.code
      if (code === 0) {
        store.dispatch('updateCatpchaMsg', '发送成功')
        setTimeout(() => {
          store.dispatch('updateCatpchaMsg', '发送验证码')
        }, 60 * 1000)
        showMsg(that, true, '发送成功', 'success')
      } else if (code === 2) {
        store.dispatch('updateCaptchaMsg', '已经发送')
        showMsg(that, true, '已经发送，请勿重新发送', 'success')
      } else {
        showMsg(that, true, res.data.msg, 'error')
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export const getHandleHistory = (that, data, handle) => {
  api.requestEnstr().then(res => {
    if (res.data.code === 0) {
      api.getHandleHistory(data, res.data.result)
        .then(res => {
          handleNeedLogin(res)
          let code = res.data.code
          if (code === 0) {
            handle(res)
          } else {
            showMsg(that, true, res.data.msg, 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  })
}

export const getHandleDetail = (that, data, handle) => {
  api.requestEnstr().then(res => {
    if (res.data.code === 0) {
      api.getHandleDetail(data, res.data.result)
        .then(res => {
          handleNeedLogin(res)
          let code = res.data.code
          if (code === 0) {
            handle(res)
          } else {
            showMsg(that, true, res.data.msg, 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  })
}

export const getVIPCardInfo = (that, data, handle) => {
  api.requestEnstr().then(res => {
    if (res.data.code === 0) {
      api.getVIPCardInfo(data, res.data.result)
        .then(res => {
          handleNeedLogin(res)
          let code = res.data.code
          if (code === 0) {
            handle(res)
          } else {
            showMsg(that, true, res.data.msg, 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  })
}

export const getIntegral = (that, data, handle) => {
  api.requestEnstr().then(res => {
    if (res.data.code === 0) {
      api.getIntegral(data, res.data.result)
        .then(res => {
          handleNeedLogin(res)
          let code = res.data.code
          if (code === 0) {
            handle(res)
          } else {
            showMsg(that, true, res.data.msg, 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  })
}

export const getVIPSign = (that, data, handle) => {
  api.requestEnstr().then(res => {
    if (res.data.code === 0) {
      api.getVIPSign(data, res.data.result)
        .then(res => {
          handleNeedLogin(res)
          let code = res.data.code
          if (code === 0) {
            handle(res)
          } else {
            showMsg(that, true, res.data.msg, 'success')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  })
}

export const getIntegralHistory = (that, data, handle) => {
  api.requestEnstr().then(res => {
    if (res.data.code === 0) {
      api.getIntegralHistory(data, res.data.result)
        .then(res => {
          handleNeedLogin(res)
          let code = res.data.code
          if (code === 0) {
            handle(res)
          } else {
            showMsg(that, true, res.data.msg, 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  })
}

export const getPayQRCode = (that, data, handle) => {
  api.requestEnstr().then(res => {
    if (res.data.code === 0) {
      api.getPayQRCode(data, res.data.result)
        .then(res => {
          handleNeedLogin(res)
          let code = res.data.code
          if (code === 0) {
            handle(res)
          } else {
            showMsg(that, true, res.data.msg, 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  })
}
