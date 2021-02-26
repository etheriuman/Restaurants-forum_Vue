import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 存放資料，相當於data
  state: {
    currentUser: {
      id: undefined,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false
  },
  // 用來操作data的函式庫，把api接回的資料放入等等...
  mutations: {
    // 兩個參數： state: 上方的state, currentUser: 待傳入的currentUser用來更新state的資料
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
    }
  },
  // 向 API fetch data 專用的函式庫
  actions: {
  },
  // 存放模組，vuex 規模龐大時用來拆檔
  modules: {
  }
})
