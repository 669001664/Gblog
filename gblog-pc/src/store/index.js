import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',
    token:''
  },
  mutations: {
  },
  actions: {
    setToken: (state, token) => {
      state.token = token;
      localStorage.setItem('mytoken', token)
    },
    setUserId: (state, payload) => {
      state.userId = payload.userId
      localStorage.setItem('userId', payload.userId)
    },
  },
  modules: {
  }
})
