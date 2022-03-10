<template>
  <div class="playlist-detail-recommend">
    <h5>相关歌单推荐</h5>
    <div
      v-for="(item, index) in recommendPlaylist"
      :key="index"
      class="content"
    >
      <img :src="item.coverImgUrl" alt="" />
      <div class="name">
        <h6 @click="playlistClick(item.id)">{{ item.name }}</h6>
        <p @click="userClick(item.creator.userId)">
          by {{ item.creator.nickname }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getPlayListDetailRecommend } from "network/api.js";
export default {
  name: "PlayListDetailRecommend",
  data() {
    return {
      recommendPlaylist: [],
    };
  },
  created() {
    getPlayListDetailRecommend(this.$route.query.id).then((res) => {
      this.recommendPlaylist = res.playlists;
    });
  },
  methods: {
    playlistClick(id) {
      this.$router.push({ path: "/playlist/detail", query: { id: id } });
    },
    userClick(id) {
      this.$router.push({ path: "/user", query: { id } });
    },
  },
};
</script>

<style scoped>
.playlist-detail-recommend {
  width: 100%;
  border: 0.2rem solid #eee;
  border-radius: 0.3rem;
  box-shadow: 0.1rem 0.1rem rgb(24, 23, 23, 0.2);
}
h5 {
  font-size: 1.5rem;
  padding: 1rem;
  border-left: 0.5rem solid rgb(177, 12, 12);
}
.content {
  display: flex;
  padding: 0.5rem 0 0.5rem 0.5rem;
}
img {
  width: 4rem;
  height: 4rem;
  border-radius: 0.1rem;
}
.name {
  margin-left: 0.9rem;
  padding-top: 0.3rem;
}
h6 {
  max-width: 17rem;
  font-size: 1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
h6:hover {
  color: rgb(175, 19, 19);
  cursor: pointer;
}
p {
  font-size: 0.9rem;
  color: rgb(173, 169, 169);
  padding-top: 0.3rem;
}
p:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>