import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    captchaMsg: '发送验证码',
    token: null,
    user: null
  },
  mutations: {
    UPDATE_CAPTCHA_MSG (state, data) {
      state.captchaMsg = data
    },
    TOKEN (state, data) {
      state.token = data
    },
    USER (state, data) {
      state.user = data
    }
  },
  actions: {
    updateCaptchaMsg ({ commit }, data) {
      commit('UPDATE_CAPTCHA_MSG', data)
    },
    token ({ commit }, data) {
      commit('TOKEN', data)
    },
    user ({ commit }, data) {
      commit('USER', data)
    }
  }
})
