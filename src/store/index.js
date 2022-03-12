import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: 't',
    login: true,
    userInfo: {}
  },
  mutations: {
    SET_TOKEN: (state, payload) => {
      state.token = payload
    },
    SET_USERINFO: (state, payload) => {
      state.userInfo = payload
    },
    SET_LOGIN: (state, payload) => {
      state.login = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
