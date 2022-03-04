<template>
  <table>
    <thead>
      <th v-for="(title, index) in titles" :key="index">{{ title }}</th>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in contents"
        :key="index"
        :class="{ trbg: index % 2 == 0 }"
      >
        <td>{{ index + 1 }}</td>
        <td><play-button :id="row.id"></play-button></td>
        <td v-if="row.name" class="name" :title="row.name">{{ row.name }}</td>
        <td v-if="row.dt">{{ formatTime(row.dt, 1000) }}</td>
        <td v-if="row.artist" class="artist">
          <span
            v-for="(item, index) in row.artist"
            :key="index"
            :title="item.arname"
            >{{ item.arname }}</span
          >
        </td>
        <td v-if="row.album" class="album" :title="row.album.alname">
          {{ row.album.alname }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PlayButton from "components/content/playbutton/PlayButton.vue";
import { formatTime } from "common/utils.js";
export default {
  name: "ArtistsSongsTable",
  props: {
    titles: {
      type: Array,
      default() {
        return ["", "", "歌名", "时长", "歌手", "专辑"];
      },
    },
    contents: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    PlayButton,
  },
  methods: {
    formatTime,
    filterRow(row) {
      // console.log(row);
      let name = row.name;
      let dtString = this.formatTime(row.dt, 1000);
      let alname = row.album ? row.album.alname : "";

      return { name, dtString, alname };
    },
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
  background-color: #ebe1e1;
  height: 2rem;
}
td {
  padding: 1rem 0.5rem;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.trbg {
  background-color: #f8f5f5;
}
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