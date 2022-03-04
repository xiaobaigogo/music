<template>
  <div class="search">
    <search-header
      :value="value"
      :title="title[curIndex]"
      :count="counts[curIndex]"
    ></search-header>
    <nav class="nav">
      <span
        v-for="(item, index) in title"
        :key="index"
        :class="{ ing: index == curIndex }"
        @click="select(index)"
        >{{ item }}</span
      >
    </nav>
    <search-song :info="infos.songs" v-show="curIndex == 0"></search-song>
    <search-artist :info="infos.artists" v-show="curIndex == 1"></search-artist>
    <search-album :info="infos.albums" v-show="curIndex == 2"></search-album>
  </div>
</template>

<script>
import SearchHeader from "./childComps/SearchHeader.vue";
import SearchSong from "./childComps/SearchSong.vue";
import SearchArtist from "./childComps/SearchArtist.vue";
import SearchAlbum from "./childComps/SearchAlbum.vue";

import { formatTime } from "common/utils.js";

import { getSearchResult } from "network/api.js";
import { SearchDetail } from "network/class.js";
export default {
  name: "Search",
  data() {
    return {
      infos: [],
      value: "",
      curIndex: 0,
      title: ["歌曲", "歌手", "专辑"],
      counts: [],
    };
  },
  components: {
    SearchHeader,
    SearchSong,
    SearchArtist,
    SearchAlbum,
  },
  created() {
    // console.log(this.$route.query.keywords);
    this.value = this.$route.query.keywords;
    getSearchResult(this.$route.query.keywords).then((res) => {
      this.infos = new SearchDetail(res.result.songs);
      this.counts[0] = this.infos.songs.length;
      this.counts[1] = this.infos.artists.length;
      this.counts[2] = this.infos.albums.length;
    });
  },

  methods: {
    formatTime,
    select(index) {
      this.curIndex = index;
    },
  },
  watch: {
    $route(to, from) {
      // console.log(to.query.keywords);
      this.value = to.query.keywords;
      getSearchResult(to.query.keywords).then((res) => {
        this.infos = new SearchDetail(res.result.songs);
      });
    },
  },
};
</script>

<style scoped>
.search {
  width: 1200px;
  margin: 0 auto;
}
.nav {
  width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav span {
  width: 298px;
  height: 40px;
  line-height: 40px;
  border: 0.1rem solid rgb(207, 199, 199);
  /* border-top: none; */
  background-color: #f8f5f8;
  text-align: center;
  font-size: 1.1rem;
  /* box-shadow: 0.1rem 0.1rem rgba(0, 0, 0, 0.8); */
}
.nav span:hover {
  color: rgb(190, 34, 34);
  cursor: pointer;
}
.nav > .ing {
  color: rgb(190, 34, 34);
  background-color: #fff;
  border-bottom: none;
  border-top: 0.1rem solid rgb(207, 199, 199);
  cursor: pointer;
}
</style>