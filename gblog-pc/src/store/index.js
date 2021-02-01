import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId:''
  },
  mutations: {
  },
  actions: {
    setUserId: (state, payload) => {
      state.userId = payload.userId
      localStorage.setItem('userId', payload.userId)
    },
  },
  modules: {
  }
})
