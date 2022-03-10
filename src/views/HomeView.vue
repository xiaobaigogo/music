<template>
  <div class="home-view">
    <h5>推荐歌单</h5>
    <div class="good-playlist">
      <cover
        v-for="(item, index) in goodPlaylist"
        :key="index"
        :dta="item"
        @click="playlistClick(item.id)"
      ></cover>
    </div>
    <div>
      <h5>推荐歌曲</h5>
      <new-songs :newSongs="newSongs"></new-songs>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Scroll from "components/common/scroll/Scroll.vue";
import Cover from "components/content/cover/Cover.vue";
import NewSongs from "views/homeviewchild/NewSongs.vue";
import { getNewSongs, getGoodPlaylist } from "network/api.js";
export default {
  name: "HomeView",
  data() {
    return {
      newSongs: [],
      goodPlaylist: [],
    };
  },
  components: {
    NewSongs,
    Cover,
  },
  created() {
    getNewSongs()
      .then((res) => {
        console.log(res.data);
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
.home-view {
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
