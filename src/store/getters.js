export default {
  getbriefUser: (state) => {
    if (state.currentUser) {
      let nickname = state.currentUser.nickname;
      let avatarUrl = state.currentUser.avatarUrl;
      let userId = state.currentUser.userId;
      return { nickname, avatarUrl, userId }
    }
  },

  getLikelist: (state) => {
    return state.likelist;
  }

}