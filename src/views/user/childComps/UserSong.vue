<template>
  <div class="user-song">
    <table v-if="playRecord.length > 0">
      <thead>
        <th v-for="(title, index) in titles" :key="index">{{ title }}</th>
      </thead>
      <tbody>
        <tr v-for="(row, index) in playRecord" :key="index">
          <td>{{ index + 1 }}</td>
          <td><play-button :id="row.song.id"></play-button></td>
          <td v-if="row.song.name" class="name" :title="row.song.name">
            {{ row.song.name }}
          </td>
          <td v-if="row.song.dt">{{ formatTime(row.song.dt, 1000) }}</td>
          <td v-if="row.song.artist" class="artist">
            <span
              v-for="(item, index) in row.song.ar"
              :key="index"
              :title="item.name"
              >{{ item.name }}</span
            >
          </td>
          <td v-if="row.song.al" class="album" :title="row.song.al.name">
            {{ row.song.al.name }}
          </td>
          <td>{{ row.playCount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PlayButton from "components/content/playbutton/PlayButton.vue";
import { formatTime } from "common/utils.js";

export default {
  name: "UserSong",
  props: {
    playRecord: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      titles: ["", "", "歌名", "时长", "专辑", "播放次数"],
    };
  },
  components: {
    PlayButton,
  },
  methods: {
    formatTime,
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