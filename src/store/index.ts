import { createStore } from 'vuex'

export default createStore({
  state: {
    currentTrack: {
      id: 0,
      src: 'Audio.mp3',
      meta: {
        title: 'Hereafter',
        artist: 'Architects',
        album: 'Holy hell',
        year: '2018',
        img: './img/Album.jpg'
      }
    },
    tracks: [
      {
        id: 0,
        src: 'Audio.mp3',
        meta: {
          title: 'Hereafter',
          artist: 'Architects',
          album: 'Holy hell',
          year: '2018',
          img: './img/Album.jpg'
        }
      },
      {
        id: 1,
        src: 'Audio_2.mp3',
        meta: {
          title: 'Hell',
          artist: 'Slaughter To Prevail',
          album: 'Chapters of Misery (EP)',
          year: '2015',
          img: './img/Album_2.jpg'
        }
      }
    ]
  },
  mutations: {
    setCurrentTrack(state, payload) {
      state.currentTrack = payload
    },
    prevTrack(state) {
      const index = state.currentTrack.id - 1 < 0 ? state.tracks.length -1 : state.currentTrack.id - 1
      state.currentTrack = state.tracks[index]
      console.log(index)
    },
    nextTrack(state) {
      const index = state.currentTrack.id + 1 >= state.tracks.length ? 0 : state.currentTrack.id + 1
      state.currentTrack = state.tracks[index]
      console.log(index)
    }
  },
  actions: {
    setCurrentTrack(context, payload) {
      context.commit('setCurrentTrack', payload)
    },
    prevTrack(context) {
      context.commit('prevTrack')
    },
    nextTrack(context) {
      context.commit('nextTrack')
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
