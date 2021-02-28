import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  // 存放預設資料，相當於data
  state: {
    currentUser: {
      id: undefined,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: ''
  },
  // 用來操作data的函式庫，把api接回的資料放入等等...
  mutations: {
    // 兩個參數： state: 上方的state, currentUser: 待傳入的currentUser用來更新state的資料
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
      state.token = ''
    }
  },
  // 向 API fetch data 專用的函式庫
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        const { id, name, email, image, isAdmin } = data
        commit('setCurrentUser', {
          id,
          name,
          email,
          image,
          isAdmin
        })
        return true
      } catch(e) {
        console.log(e)
        console.log('cant fetch user information')
        // fetch出error表示使用者token有問題，那就呼叫revokeAuthentication
        commit('revokeAuthentication')
        return false
      }
    }
  },
  // 存放模組，vuex 規模龐大時用來拆檔
  modules: {
  }
})
