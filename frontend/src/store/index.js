import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    }
  },
  actions: {
    login: ({commit}, userInfos) => {
      commit('setStatus', 'loading');
      console.log(userInfos);
     },
    createAccount: ({commit}, userInfos) => {
     commit;
     console.log(userInfos);
    }
  },
  modules: {
  }
})
