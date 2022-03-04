<template>
  <div class="album-detail">
    <detail-header :detailHeader="albumDetailHeader"></detail-header>
    <play-all class="play-all" :tracksId="tracksId"></play-all>

    <list-content
      :trackLength="tracks.length"
      :playCount="albumDetailHeader.playCount"
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
</template>

<script>
import DetailHeader from "components/content/detail/DetailHeader.vue";
import DetailSubscriber from "components/content/detail/DetailSubscriber.vue";
import DetailRecommend from "components/content/detail/DetailRecommend.vue";
import ListContent from "components/content/listcontent/ListContent.vue";
import SongTable from "components/content/songtable/SongTable.vue";
import PlayAll from "components/content/playbutton/PlayAll.vue";

import { AlbumDetail } from "network/class.js";
import { getAlbumDetail } from "network/api.js";

export default {
  name: "PlayListDetail",
  data() {
    return {
      albumDetailHeader: {},
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

  created() {
    console.log("创建组件");
    getAlbumDetail(this.$route.query.id).then((res) => {
      console.log(res);
      let details = new AlbumDetail(res.album, res.songs);
      this.albumDetailHeader = details.detail;
      this.tracks = details.tracks;
      this.subscribers = details.subscriber;
    });
  },

  components: {
    DetailHeader,
    DetailSubscriber,
    DetailRecommend,
    ListContent,
    SongTable,
    PlayAll,
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
.album-detail {
  width: 1200px;
  margin: 2rem auto;
  /* display: flex; */
}

.play-all {
  margin-top: 2rem;
}
</style>