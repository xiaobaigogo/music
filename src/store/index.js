import { createStore } from 'vuex'
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

const state = {
  currentUser: null,
  isLogin: false,
  token: "",
  likelist: [],
}

export default createStore({
  state,
  getters,
  mutations,
  actions,
})
