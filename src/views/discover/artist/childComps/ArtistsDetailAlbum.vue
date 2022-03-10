<template>
  <div class="album">
    <cover
      v-for="(item, index) in albums"
      :key="index"
      :dta="item"
      @click.stop="enterAlbum(item.id)"
    ></cover>
  </div>
</template>

<script>
import Cover from "components/content/cover/Cover.vue";
import { getArtistsAlbum } from "network/api.js";
export default {
  name: "ArtistsDetailAlbum",
  props: {
    id: 0,
  },
  data() {
    return {
      albums: [],
    };
  },
  components: {
    Cover,
  },
  methods: {
    enterAlbum(id) {
      this.$router.push({ path: "/album/detail", query: { id } });
    },
  },
  watch: {
    id: {
      immediate: true,
      handler(newVal) {
        if (newVal == undefined) {
          return;
        }
        getArtistsAlbum(newVal).then((res) => {
          // console.log(res.hotAlbums);
          // console.log(
          this.albums = res.hotAlbums.map(
            ({ blurPicUrl, name, id, publishTime, size }) => {
              let picUrl = blurPicUrl;
              return { picUrl, name, id, publishTime, size };
            }
          );
        });
      },
    },
  },
};
</script>

<style scoped>
.album {
  display: flex;
  flex-wrap: wrap;
}
</style>