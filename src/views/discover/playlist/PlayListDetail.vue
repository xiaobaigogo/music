<template>
  <div class="play-list-detail">
    <div class="left">
      <playlist-detail-header
        :playListDetailHeader="playListDetailHeader"
      ></playlist-detail-header>
      <button @click="playAll(tracksId)">播放全部</button>

      <list-content
        :trackLength="tracks.length"
        :playCount="playListDetailHeader.playCount"
        class="list-content"
      >
        <template v-slot:table>
          <song-table
            :titles="['', '', '歌曲', '时长', '歌手', '专辑']"
            :contents="tracks"
          ></song-table>
        </template>
      </list-content>
    </div>
    <div class="right">
      <playlist-detail-subscriber
        class="subscriber"
        :subscribers="subscribers"
      ></playlist-detail-subscriber>
      <playlist-detail-recommend class="recommend"></playlist-detail-recommend>
    </div>
  </div>
</template>

<script>
import PlaylistDetailHeader from "./childComps/PlayListDetailHeader.vue";
import PlaylistDetailSubscriber from "./childComps/PlayListDetailSubscriber.vue";
import PlaylistDetailRecommend from "./childComps/PlayListDetailRecommend.vue";

import ListContent from "components/content/listcontent/ListContent.vue";
import SongTable from "components/content/songtable/SongTable.vue";

import { PlayListDetail } from "network/class.js";
import { getPlayListDetail } from "network/api.js";

export default {
  name: "PlayListDetail",
  data() {
    return {
      playListDetailHeader: {},
      tracks: [],
      subscribers: [],
    };
  },
  computed: {
    tracksId() {
      return this.tracks.map(({ id }) => {
        return id;
      });
    },
  },

  watch: {
    $route(to, from) {
      console.log(to.query.id);
      getPlayListDetail(to.query.id).then((res) => {
        let details = new PlayListDetail(res.playlist);
        this.playListDetailHeader = details.detail;
        this.tracks = details.tracks;
        this.subscribers = details.subscriber;
      });
    },
  },
  created() {
    console.log("创建组件");
    getPlayListDetail(this.$route.query.id).then((res) => {
      let details = new PlayListDetail(res.playlist);
      this.playListDetailHeader = details.detail;
      this.tracks = details.tracks;
      this.subscribers = details.subscriber;
    });
  },

  components: {
    PlaylistDetailHeader,
    PlaylistDetailSubscriber,
    PlaylistDetailRecommend,
    ListContent,
    SongTable,
  },

  methods: {
    playAll(tracksId) {
      console.log(tracksId);
      this.$bus.emit("playAll", tracksId);
    },
  },
};
</script>

<style scoped>
.play-list-detail {
  width: 1200px;
  margin: 2rem auto;
  display: flex;
}
.left {
  width: 800px;
  margin-right: 1rem;
}
.right {
  width: calc(1200px - 800px - 1rem);
}
.list-content {
  margin-top: 2rem;
}
.subscriber {
  margin-bottom: 2rem;
}
button {
  position: relative;
  left: 88%;
  top: 4%;
  width: 6rem;
  font-size: 1rem;
  height: 2.5rem;
  background-color: rgb(228, 34, 34);
  color: #fff;
  border-radius: 1.2rem;
}
</style>