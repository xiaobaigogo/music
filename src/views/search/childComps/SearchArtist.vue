<template>
  <div class="search-artist">
    <cover
      v-for="(item, index) in artists"
      :key="index"
      :dta="item"
      @click="enterSinger(item.id)"
    ></cover>
  </div>
</template>

<script>
import Cover from "components/content/cover/Cover.vue";

import { getArtistsDetail } from "network/api.js";

export default {
  name: "SearchArtist",
  props: {
    info: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      idDistinct: [],
      artists: [],
    };
  },
  components: {
    Cover,
  },
  methods: {
    arrDistinct() {
      const set = new Set(this.info);
      set.delete(0);
      this.idDistinct = [...set];
    },
    async getArtists(arr) {
      // newArr = this.arrDistinct();
      for (let arid of arr) {
        await getArtistsDetail(arid)
          .then((res) => {
            // console.log(res.artist);
            this.artists.push({
              id: res.artist.id,
              name: res.artist.name,
              picUrl: res.artist.picUrl,
            });
          })
          .catch((error) => console.log(error));
      }
    },
    enterSinger(id) {
      this.$router.push({ path: "/artist", query: { id } });
    },
  },
  watch: {
    info: {
      immediate: true,
      handler(newVal) {
        if (newVal.length == 0) {
          return;
        }
        console.log(this.info);
        this.arrDistinct();

        this.getArtists(this.idDistinct);
      },
    },
  },
};
</script>

<style scoped>
.search-artist {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>