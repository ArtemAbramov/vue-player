import { createStore } from 'vuex'

export default createStore({
  state: {
    currentTrack: {
      src: 'Audio.mp3',
      meta: {
        title: 'Hereafter',
        artist: 'Architects',
        album: 'Holy hell',
        year: '2018',
        img: './img/Album.jpg'
      }
    }
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
