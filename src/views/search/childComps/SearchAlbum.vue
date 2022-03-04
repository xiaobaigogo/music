<template>
  <div class="search-album">
    <cover
      v-for="(item, index) in info"
      :key="index"
      :dta="item"
      @click="enterAlbum(item.id)"
    ></cover>
  </div>
</template>

<script>
import Cover from "components/content/cover/Cover.vue";
export default {
  name: "SearchAlbum",
  props: {
    info: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Cover,
  },
  methods: {
    enterAlbum(id) {
      // console.log(id);
      this.$router.push({ path: "/album/detail", query: { id } });
    },
  },
};
</script>

<style scoped>
.search-album {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>