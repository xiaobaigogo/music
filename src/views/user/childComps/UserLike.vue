<template>
  <div class="user-like" v-if="likeDetail.length">
    <table>
      <thead>
        <th v-for="(title, index) in titles" :key="index">{{ title }}</th>
      </thead>
      <tbody>
        <tr v-for="(row, index) in likeDetail" :key="index">
          <td>{{ index + 1 }}</td>
          <td><play-button :id="row.id"></play-button></td>
          <td v-if="row.name" class="name" :title="row.name">
            {{ row.name }}
          </td>
          <td v-if="row.dt">{{ formatTime(row.dt, 1000) }}</td>
          <td v-if="row.ar" class="artist">
            <span
              v-for="(item, index) in row.ar"
              :key="index"
              :title="item.name"
            >
              <span v-if="row.ar.length > 1 && index < row.ar.length - 1">{{
                item.name + "，"
              }}</span>
              <span v-else>{{ item.name }}</span>
            </span>
          </td>
          <td v-if="row.al" class="album" :title="row.al.name">
            {{ row.al.name }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PlayButton from "components/content/playbutton/PlayButton.vue";

import { formatTime } from "common/utils.js";
import { likeMusicList, getCurrentSong } from "network/api.js";
export default {
  name: "UserLike",
  data() {
    return {
      titles: ["", "", "歌名", "时长", "歌手", "专辑"],
      likelist: [],
      likeDetail: [],
    };
  },
  computed: {
    getId() {
      return this.$store.getters.getbriefUser
        ? this.$store.getters.getbriefUser.userId
        : null;
    },
  },
  components: {
    PlayButton,
  },
  methods: {
    formatTime,
  },
  created() {
    likeMusicList(this.getId).then((res) => {
      this.likelist = res.ids;
      console.log(this.likelist.join(","));
      getCurrentSong(this.likelist.join(",")).then((res) => {
        // console.log(res);
        // this.likeDetail = res.songs;
        this.likeDetail = res.songs.map(({ al, ar, dt, id, name }) => {
          al = { name: al.name, id: al.id, picUrl: al.picUrl };
          ar = ar.map(({ id, name }) => {
            return { id, name };
          });
          let picUrl = al.picUrl;
          return { id, name, picUrl, al, ar, dt };
        });
      });
    });
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border: 2px solid rgb(218, 217, 217);
  border-top: 3px solid #a31313;
  margin-top: 0.5rem;
  border-collapse: collapse;
  background: #fff;
}
thead {
  height: 3rem;
}
td {
  padding: 1rem 0.5rem;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
/* .trbg {
  background-color: #f8f5f5;
} */
.name {
  max-width: 200px;
}
.artist {
  max-width: 150px;
}
.album {
  max-width: 150px;
}
</style>