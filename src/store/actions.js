import { likeMusicList } from "network/api.js"
export default {
  // setUser({ commit }) {
  //   commit('changeUserInfo',)
  // }
  setUserLikelist(context) {
    context.state.currentUser && likeMusicList(context.state.currentUser.userId).then(res => {
      console.log(res);
      context.commit('setUserLikelist', res.ids)
    })
  }
}