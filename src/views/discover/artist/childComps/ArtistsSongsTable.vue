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
        <td v-for="(val, key) in filterRow(row)" :key="key">{{ val }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PlayButton from "components/content/playbutton/PlayButton.vue";
export default {
  name: "ArtistsSongsTable",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
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
  computed: {
    filterHotSongs() {
      return this.contents.map(({ id, name, dtString, al }) => {
        // 将原本的数组过滤到剩名字，时长和专辑名字三项
        // console.log(al);
        let alname = al.alname;
        return { id, name, dtString, alname };
      });
    },
  },
  methods: {
    filterRow(row) {
      // console.log(row);
      let name = row.name;
      let dtString = row.dtString;
      let alname = row.al.alname;
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
}
.trbg {
  background-color: #f8f5f5;
}
</style>