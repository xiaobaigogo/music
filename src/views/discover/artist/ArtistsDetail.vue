<template>
  <div class="artists-detail">
    <div class="header-bg">
      <div class="header">
        <div class="profile">
          <img :src="desc.cover" alt="" />
          <div class="name">
            <h5>{{ desc.singername }}</h5>
            <span v-if="desc.transnames">{{
              arrjoin(desc.transnames, ";")
            }}</span>
          </div>
        </div>
        <p>{{ desc.briefDesc }}</p>
        <table>
          <thead>
            <th>单曲数</th>
            <th>专辑数</th>
            <th>MV数</th>
          </thead>
          <tbody>
            <tr>
              <td>{{ desc.musicSize }}</td>
              <td>{{ desc.albumSize }}</td>
              <td>{{ desc.mvSize }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <nav class="nav">
      <span
        v-for="(item, index) in title"
        :key="index"
        :class="{ ing: index == curIndex }"
        @click="select(index)"
        >{{ item }}</span
      >
    </nav>
    <div>
      <artists-songs-table
        :titles="['', '', '歌名', '时长', '专辑']"
        :contents="desc.hotSongs"
        v-show="curIndex == 0"
      ></artists-songs-table>
      <artists-detail-album
        :id="desc.id"
        v-show="curIndex == 1"
      ></artists-detail-album>
      <artists-detail-mv
        :id="desc.id"
        v-show="curIndex == 2"
        :mvSize="desc.mvSize"
      ></artists-detail-mv>
      <artists-detail-info
        :id="desc.id"
        v-show="curIndex == 3"
      ></artists-detail-info>
    </div>
  </div>
</template>

<script>
import ArtistsSongsTable from "./childComps/ArtistsSongsTable.vue";
import ArtistsDetailAlbum from "./childComps/ArtistsDetailAlbum.vue";
import ArtistsDetailMv from "./childComps/ArtistsDetailMV.vue";
import ArtistsDetailInfo from "./childComps/ArtistsDetailInfo.vue";

import Pages from "components/content/pages/Pages.vue";

import { SingerDesc } from "network/class.js";
import { getArtistsDetail } from "network/api.js";
import { formatTime } from "common/utils.js";
export default {
  name: "ArtistsDetail",
  data() {
    return {
      desc: {},
      title: ["热门作品", "所有专辑", "相关mv", "艺人介绍"],
      curIndex: 0,
      limit: 48,
      offset: 1,
    };
  },

  components: {
    ArtistsSongsTable,
    ArtistsDetailAlbum,
    ArtistsDetailMv,
    ArtistsDetailInfo,
    Pages,
  },
  created() {
    // 歌手header描述部分和单曲部分
    // console.log(this.$route.query.id);
    getArtistsDetail(this.$route.query.id).then((res) => {
      // console.log(res.hotSongs);
      this.desc = new SingerDesc(res.artist, res.hotSongs);
    });
  },

  methods: {
    formatTime,
    arrjoin(arr, str) {
      let res = arr.join(str);
      return res;
    },
    select(index) {
      this.curIndex = index;
    },
  },
};
</script>

<style scoped>
.artists-detail {
  width: 1200px;
  margin: 0 auto;
}
.header {
  width: 500px;
  /* padding: 0 auto; */
  margin: 0 auto;
  padding-top: 3rem;
}
.header-bg {
  background-color: #f8f5f8;
}
.header img {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
}
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.name {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.name span {
  font-size: 0.9rem;
  font-weight: 400;
}
.header h5 {
  font-size: 1.1rem;
  font-weight: 700;
}
.header p {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* text-align: center; */
}
.header p:hover {
  cursor: pointer;
}
.header table {
  width: 500px;
  margin: 0 auto;
  padding: 1rem 0;
  text-align: center;
}
.nav {
  width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav span {
  width: 298px;
  height: 40px;
  line-height: 40px;
  border: 1px solid rgb(207, 199, 199);
  border-top: none;
  background-color: #f8f5f8;
  text-align: center;
  font-size: 1.1rem;
}
.nav span:hover {
  color: rgb(190, 34, 34);
  cursor: pointer;
}
.nav > .ing {
  color: rgb(190, 34, 34);
  background-color: #fff;
  border-bottom: none;
  border-top: 1px solid rgb(207, 199, 199);
  cursor: pointer;
}
.bottom {
  text-align: center;
}
</style>