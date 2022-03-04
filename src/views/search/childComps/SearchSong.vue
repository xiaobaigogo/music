<template>
  <div class="search-song">
    <play-all :tracksId="filterInfo"></play-all>
    <song-table :contents="info"></song-table>
  </div>
</template>

<script>
import PlayAll from "components/content/playbutton/PlayAll.vue";
import SongTable from "components/content/songtable/SongTable.vue";
export default {
  name: "SearchSong",
  props: {
    info: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    filterInfo() {
      return this.info.map(({ id }) => {
        return id;
      });
    },
  },

  components: {
    SongTable,
    PlayAll,
  },
};
</script>

<style>
</style>