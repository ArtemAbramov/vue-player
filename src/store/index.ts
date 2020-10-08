import { createStore } from 'vuex'
import {userModule} from "@/store/user";
import {playerModule} from "@/store/player";

export default createStore({
  state: {
    layout: 'default-layout'
  },
  mutations: {
    setLayout(state, payload) {
      state.layout = payload
    }
  },
  actions: {
    setLayout(context, payload) {
      context.commit('setLayout', payload)
    }
  },
  getters: {
    layout(state) {
      return state.layout
    }
  },
  modules: {
    userModule,
    playerModule
  }
})
