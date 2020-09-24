import { createStore } from 'vuex'

export default createStore({
  state: {
    currentTrack: null
  },
  mutations: {
    setCurrentTrack(state, payload) {
      state.currentTrack = payload
    }
  },
  actions: {
    setCurrentTrack(context, payload) {
      context.commit('setCurrentTrack', payload)
    }
  },
  getters: {
    getCurrentTrack(state) {
      return state.currentTrack
    }
  },
  modules: {
  }
})
