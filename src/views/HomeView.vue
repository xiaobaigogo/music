<template>
  <div class="home-view">
    <home-swiper class="swiper"></home-swiper>
    <div class="good-playlist">
      <h5>推荐歌单</h5>
      <cover
        v-for="(item, index) in goodPlaylist"
        :key="index"
        :dta="item"
        @click="playlistClick(item.id)"
      ></cover>
    </div>
    <div class="new-songs">
      <h5>推荐歌曲</h5>
      <new-songs :newSongs="newSongs"></new-songs>
    </div>
    <back-top></back-top>
  </div>
</template>

<script>
// @ is an alias to /src

import { backTopMixin } from "common/mixins.js";
import Cover from "components/content/cover/Cover.vue";
import NewSongs from "views/homeviewchild/NewSongs.vue";
import HomeSwiper from "./homeviewchild/HomeSwiper.vue";
import { getNewSongs, getGoodPlaylist } from "network/api.js";
export default {
  name: "HomeView",
  data() {
    return {
      newSongs: [],
      goodPlaylist: [],
    };
  },
  mixins: [backTopMixin],
  components: {
    NewSongs,
    Cover,
    HomeSwiper,
    // BackTop,
  },
  created() {
    getNewSongs()
      .then((res) => {
        // console.log(res.data);
        let filter = res.data.splice(0, 10);
        this.newSongs = filter.map(({ name, id, duration, artists, album }) => {
          let artist = artists.map(({ id, name }) => {
            return { arid: id, arname: name };
          });
          return { name, id, dt: duration, picUrl: album.picUrl, artist };
        });
      })
      .catch((err) => err);
    getGoodPlaylist().then((res) => {
      this.goodPlaylist = res.result.map(({ id, name, picUrl, playCount }) => {
        return { id, name, picUrl, playCount };
      });
    });
  },
  methods: {
    playlistClick(id) {
      this.$router.push({
        path: "/playlist/detail",
        query: { id: id },
      });
    },
  },
};
</script>

<style scoped>
/* .home-view {
  width: 1200px;
  margin: 0 auto;
} */
.good-playlist,
.new-songs,
h5 {
  width: 1200px;
  margin: 0 auto;
}
.good-playlist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
h5 {
  padding-left: 0.5rem;
  border-left: 0.2rem solid rgb(190, 19, 19);
  font-size: 1.5rem;
  margin: 1.5rem 0;
}
</style>
