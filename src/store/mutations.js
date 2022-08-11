export default {
  changeUserInfo(state, payload) {
    if (payload) {
      state.currentUser = payload;
      state.isLogin = true;
    } else {
      sessionStorage.setItem("username", null);
      sessionStorage.setItem("usertoken", "");
      state.currentUser = null;
      state.isLogin = false;
    }
  },

  setUserLikelist(state, payload) {
    state.likelist = payload;
  },

  createSongDB(state, payload) {
    state.songDB = payload;
  }
}