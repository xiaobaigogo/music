import { createStore } from 'vuex'
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"


const state = {
  currentUser: null,
  isLogin: false,
  token: "",
  likelist: [],
  songDB: null,
  songDBname: 'dbsong',
  songDBobjectStoreName: 'songBlob',
  songDBversion: 1
}

export default createStore({
  state,
  getters,
  mutations,
  actions,
})
