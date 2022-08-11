import { likeMusicList } from "network/api.js"
import { songIndexDB } from "@/mode/indexDB";
export default {
  // setUser({ commit }) {
  //   commit('changeUserInfo',)
  // }
  setUserLikelist(context) {
    context.state.currentUser && likeMusicList(context.state.currentUser.userId).then(res => {
      console.log(res);
      context.commit('setUserLikelist', res.ids)
    })
  },

  // 创建数据库存储mp3格式的歌曲
  createSongDB({ commit }, {name, objectStoreName, dbVersion = 1}) {
    songIndexDB.createDB(name, objectStoreName, dbVersion).then((res) => {
      commit('createSongDB', res);
    });
  }
}